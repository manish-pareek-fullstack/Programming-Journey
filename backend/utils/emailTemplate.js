// Shared branded HTML wrapper for all outgoing emails.
// Keeps a single consistent look (logo mark, colors, footer) across
// login-success, OTP, and any future email.

const emailWrapper = ({ heading, headingColor = "#4f46e5", bodyHtml }) => `
  <div style="
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    color: #1e293b;
  ">
    <div style="text-align:center; margin-bottom: 18px;">
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;
        font-size: 20px;
        color: #4f46e5;
      ">
        <span style="
          display:inline-block;
          width: 34px;
          height: 34px;
          line-height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff;
          font-size: 16px;
          text-align:center;
        ">EM</span>
        Employee Management System
      </div>
    </div>

    <div style="
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    ">
      <h2 style="color: ${headingColor}; margin-bottom: 10px;">${heading}</h2>

      ${bodyHtml}

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

      <p style="text-align: center; color: #94a3b8; font-size: 13px; line-height: 1.6;">
        Employee Management System<br/>
        Developed by <strong>Manish Pareek</strong> &middot; Jaipur, Rajasthan<br/>
        &copy; ${new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  </div>
`;

module.exports = emailWrapper;
