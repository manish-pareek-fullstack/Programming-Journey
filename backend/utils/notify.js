const Notification = require("../model/Notification");

// Fire-and-forget notification writer.
const notify = async ({ user, type, title, message, relatedId, relatedModel }) => {
  try {
    if (!user) return;

    await Notification.create({
      user,
      type: type || "general",
      title,
      message,
      relatedId: relatedId || null,
      relatedModel: relatedModel || null,
    });
  } catch (error) {
    console.log("Notification create failed:", error.message);
  }
};

module.exports = notify;
