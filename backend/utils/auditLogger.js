const AuditLog = require("../model/AuditLog");

// Fire-and-forget audit log writer.
// Never throws - a logging failure must not break the actual request.
const logAudit = async ({ user, action, module, description, targetId }) => {
  try {
    await AuditLog.create({
      user: user?.userId || null,
      userName: user?.email || "System",
      action,
      module,
      description,
      targetId: targetId || null,
    });
  } catch (error) {
    console.log("Audit log failed:", error.message);
  }
};

module.exports = logAudit;
