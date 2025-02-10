const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Connect to MongoDB
const conn = mongoose.createConnection("mongodb://localhost:27017/hotelapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init GridFS
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Storage Engine for Multer
const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => ({ filename: file.originalname, bucketName: "uploads" }),
});
const upload = multer({ storage });


// **Upload File**
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});
// **Get List of Files**
app.get("/files", async (req, res) => {
  const files = await gfs.files.find().toArray();
  res.json(files);
});
// **Get Single File**
app.get("/files/:filename", async (req, res) => {
  const file = await gfs.files.findOne({ filename: req.params.filename });
  if (!file) return res.status(404).send("File not found");
  const readStream = gfs.createReadStream(file.filename);
  readStream.pipe(res);
});
// **Delete File**
app.delete("/files/:id", async (req, res) => {
  try {
    await gfs.files.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting file" });
  }
});
// **Update File (Re-upload with same filename)**
app.put("/files/:filename", upload.single("file"), async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.json({ message: "File updated successfully", file: req.file });
  } catch (error) {
    res.status(500).json({ error: "Error updating file" });
  }
});

// **Start Server**
app.listen(3000, () => console.log("Server running on port 3000"));
