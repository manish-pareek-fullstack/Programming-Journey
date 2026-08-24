const AuditLog = require("../model/AuditLog");

// ================= GET AUDIT LOGS (admin only) =================

const getAuditLogs = async (req, res, next) => {
  try {
    const { module, action, page = 1, limit = 20 } = req.query;

    const query = {};
    if (module) query.module = module;
    if (action) query.action = action;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 20, 1);
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      AuditLog.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Audit logs fetched successfully",
      data: logs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAuditLogs };
