const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MY NOTES + SEARCH + TAG FILTER
exports.getMyNotes = async (req, res) => {
  try {
    const { search, tag } = req.query;

    let filter = { user: req.user._id };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      filter.tags = tag;
    }

    const notes = await Note.find(filter).sort({ updatedAt: -1 });

    res.json({ notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.tags = req.body.tags || note.tags;

    await note.save();

    res.json({ message: "Note updated", note });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
