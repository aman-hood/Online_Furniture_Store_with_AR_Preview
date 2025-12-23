import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/images/blogs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({
    url: `/images/blogs/${req.file.filename}`,
  });
});

export default router;
