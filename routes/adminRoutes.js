const express = require("express");
const { protect } = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
  getAllUsers,
  getAllNotes,
  deleteAnyNote,
  makeAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// Only admins can access these
router.get("/users", protect, admin, getAllUsers);
router.get("/notes", protect, admin, getAllNotes);
router.delete("/notes/:id", protect, admin, deleteAnyNote);
router.put("/promote/:id", protect, admin, makeAdmin);

module.exports = router;
