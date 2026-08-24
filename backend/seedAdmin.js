// One-time utility script to promote an existing signed-up user to "admin".
//
// WHY THIS FILE EXISTS:
// Normal signup can NEVER create an admin (by design, for security).
// So to get your FIRST admin account, you must:
//   1. Signup normally through the app (creates an "employee" account)
//   2. Run this script once from the backend folder:
//        node seedAdmin.js youremail@example.com
//
// This directly edits the database - it is NOT an API route, so it
// cannot be hit by a normal user over HTTP.

require("dotenv").config();
const connectDB = require("./config/db");
const Signup = require("./model/Signup");

const email = process.argv[2];

if (!email) {
  console.log("Usage: node seedAdmin.js <user-email>");
  process.exit(1);
}

const run = async () => {
  await connectDB();

  const user = await Signup.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    console.log(
      "No user found with this email. Please signup through the app first, then run this script again.",
    );
    process.exit(1);
  }

  user.role = "admin";
  await user.save();

  console.log(`Done. "${user.email}" is now an admin.`);
  process.exit(0);
};

run();
