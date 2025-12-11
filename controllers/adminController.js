const User = require("../models/User");
const Note = require("../models/Note");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL NOTES
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ANY NOTE
exports.deleteAnyNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PROMOTE USER TO ADMIN
exports.makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
