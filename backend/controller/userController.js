const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const emailWrapper = require("../utils/emailTemplate");
const Signup = require("../model/Signup");
const sendOTPEmail = require("../utils/sendEmail");

// ======================================================
// SIGNUP
// ======================================================

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await Signup.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // IMPORTANT: role is NEVER taken from req.body.
    // Every normal signup is forced to "employee".
    // Admin accounts can only be created by promoting a user directly
    // in the database (see backend/seedAdmin.js).
    const data = await Signup.create({
      name,
      email: normalizedEmail,
      password: hashPassword,
      role: "employee",
    });

    res.status(201).json({
      message: "Signup successfully",

      data: {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// LOGIN
// ======================================================

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check email
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please signup first",
      });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Create JWT (role included so authMiddleware/adminMiddleware can
    // authorize requests without an extra DB lookup on every request)
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // 4. Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 5. Send login-success email
    const loginEmail = emailWrapper({
      heading: "Login Successful 🎉",
      headingColor: "#10b981",
      bodyHtml: `
        <p style="font-size: 16px;">
          Hello <strong>${user.name}</strong>,
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          You have successfully logged in to your
          <strong>Employee Management System</strong> account.
        </p>

        <div style="
          background: #ecfdf5;
          padding: 15px;
          border-radius: 10px;
          margin: 20px 0;
        ">
          <p style="margin: 5px 0;">
            <strong>Email:</strong> ${user.email}
          </p>

          <p style="margin: 5px 0;">
            <strong>Role:</strong>
            <span style="color: #059669; text-transform: capitalize;">${user.role}</span>
          </p>

          <p style="margin: 5px 0;">
            <strong>Login Time:</strong>
            ${new Date().toLocaleString("en-IN")}
          </p>
        </div>

        <p style="font-size: 14px; color: #64748b;">
          If this login was made by you, you can safely ignore this email.
        </p>

        <p style="font-size: 14px; color: #64748b; margin-top: 10px;">
          If you did not perform this login, please change your password
          immediately.
        </p>
      `,
    });

    // Email fail hone par login fail nahi karna
    try {
      await sendEmail(
        user.email,
        "Login Successful - Employee Management System",
        loginEmail,
      );
    } catch (emailError) {
      console.log(
        "Login successful, but email could not be sent:",
        emailError.message,
      );
    }

    // 6. Send response
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// PROFILE
// ======================================================

const profile = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Profile successfully accessed",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// LOGOUT
// ======================================================

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("resetToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// FORGOT PASSWORD - SEND OTP
// ======================================================

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await Signup.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // ============================================
    // RESEND COOLDOWN
    // ============================================

    if (user.resetOtpLastSentAt) {
      const timePassed = Date.now() - user.resetOtpLastSentAt.getTime();

      const cooldown = 60 * 1000;

      if (timePassed < cooldown) {
        const remaining = Math.ceil((cooldown - timePassed) / 1000);

        return res.status(429).json({
          message: `Please wait ${remaining} seconds before requesting another OTP`,
        });
      }
    }

    // ============================================
    // GENERATE SECURE OTP
    // ============================================

    const otp = crypto.randomInt(100000, 1000000).toString();

    // ============================================
    // HASH OTP
    // ============================================

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // ============================================
    // SAVE OTP DATA
    // ============================================

    user.resetOtpHash = otpHash;

    user.resetOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.resetOtpAttempts = 0;

    user.resetOtpLastSentAt = new Date();

    user.resetTokenHash = null;

    user.resetTokenExpiresAt = null;

    await user.save();

    // ============================================
    // SEND EMAIL
    // ============================================

    const otpEmailHtml = emailWrapper({
      heading: "Password Reset OTP 🔐",
      headingColor: "#4f46e5",
      bodyHtml: `
        <p style="font-size: 16px;">Hello,</p>

        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset the password for your
          <strong>Employee Management System</strong> account.
          Use the OTP below to continue. This OTP is valid for
          <strong>5 minutes</strong>.
        </p>

        <div style="
          background: #eef2ff;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          text-align: center;
        ">
          <span style="
            font-size: 32px;
            letter-spacing: 8px;
            font-weight: bold;
            color: #4f46e5;
          ">${otp}</span>
        </div>

        <p style="font-size: 14px; color: #64748b;">
          If you did not request a password reset, please ignore this email
          and your password will remain unchanged.
        </p>
      `,
    });

    await sendOTPEmail(
      normalizedEmail,
      "Password Reset OTP - Employee Management System",
      otpEmailHtml,
    );

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// VERIFY OTP
// ======================================================

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await Signup.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ============================================
    // OTP EXISTS?
    // ============================================

    if (!user.resetOtpHash || !user.resetOtpExpiresAt) {
      return res.status(400).json({
        message: "OTP not found. Please request a new OTP",
      });
    }

    // ============================================
    // OTP EXPIRED?
    // ============================================

    if (Date.now() > user.resetOtpExpiresAt.getTime()) {
      user.resetOtpHash = null;
      user.resetOtpExpiresAt = null;
      user.resetOtpAttempts = 0;

      await user.save();

      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP",
      });
    }

    // ============================================
    // MAX ATTEMPTS
    // ============================================

    if (user.resetOtpAttempts >= 5) {
      user.resetOtpHash = null;
      user.resetOtpExpiresAt = null;
      user.resetOtpAttempts = 0;

      await user.save();

      return res.status(429).json({
        message: "Too many incorrect attempts. Please request a new OTP",
      });
    }

    // ============================================
    // HASH USER OTP
    // ============================================

    const otpHash = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    // ============================================
    // CHECK OTP
    // ============================================

    if (otpHash !== user.resetOtpHash) {
      user.resetOtpAttempts += 1;

      await user.save();

      return res.status(401).json({
        message: "Invalid OTP",
        attemptsLeft: 5 - user.resetOtpAttempts,
      });
    }

    // ============================================
    // OTP VERIFIED
    // ============================================

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetTokenHash = resetTokenHash;

    user.resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // OTP ko invalidate kar do
    user.resetOtpHash = null;
    user.resetOtpExpiresAt = null;
    user.resetOtpAttempts = 0;

    await user.save();

    // ============================================
    // HTTP ONLY RESET COOKIE
    // ============================================

    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
    });

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // ============================================
    // GET RESET TOKEN FROM COOKIE
    // ============================================

    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res.status(401).json({
        message: "Password reset session expired",
      });
    }

    // ============================================
    // HASH RESET TOKEN
    // ============================================

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ============================================
    // FIND USER
    // ============================================

    const user = await Signup.findOne({
      resetTokenHash,
      resetTokenExpiresAt: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired reset session",
      });
    }

    // ============================================
    // HASH NEW PASSWORD
    // ============================================

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;

    // ============================================
    // CLEAR RESET DATA
    // ============================================

    user.resetTokenHash = null;
    user.resetTokenExpiresAt = null;

    user.resetOtpHash = null;
    user.resetOtpExpiresAt = null;
    user.resetOtpAttempts = 0;
    user.resetOtpLastSentAt = null;

    await user.save();

    // ============================================
    // CLEAR RESET COOKIE
    // ============================================

    res.clearCookie("resetToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  profile,
  logout,

  forgotPassword,
  verifyOTP,
  resetPassword,
};
