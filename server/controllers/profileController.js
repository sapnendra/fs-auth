const User = require("../models/User");

// GET /api/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getProfile };
