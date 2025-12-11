const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "QuickNotes API Running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
