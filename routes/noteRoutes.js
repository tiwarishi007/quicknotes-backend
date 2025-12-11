const express = require("express");
const { protect } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { createNoteSchema } = require("../validations/noteValidation");
const {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// CREATE NOTE
router.post("/", protect, validate(createNoteSchema), createNote);

// GET NOTES
router.get("/", protect, getMyNotes);

// UPDATE NOTE
router.put("/:id", protect, updateNote);

// DELETE NOTE
router.delete("/:id", protect, deleteNote);

module.exports = router;
