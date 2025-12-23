import express from "express";
import Blog from "../models/Blog.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";

const router = express.Router();

/* ADMIN FIRST */
router.get("/admin/all", isAuthenticated, isAdmin, async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.put("/admin/:id/publish", isAuthenticated, isAdmin, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { status: "published" },
    { new: true }
  );
  res.json(blog);
});


// ADMIN CREATE BLOG (DIRECT PUBLISH)
router.post(
  "/admin",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    const blog = await Blog.create({
      ...req.body,
      status: "published",
      author: req.user._id,
    });

    res.status(201).json(blog);
  }
);
/* USER CREATE BLOG */
router.post("/", isAuthenticated, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user._id,
    status: "pending",
  });

  // 🔔 NOTIFY ADMIN
  req.app.get("io").emit("new_blog_request", {
    title: blog.title,
  });

  res.status(201).json(blog);


});




router.get("/admin/pending", isAuthenticated, isAdmin, async (req, res) => {
  const blogs = await Blog.find({ status: "pending" })
    .select("title createdAt")
    .sort({ createdAt: -1 });

  res.json(blogs);
});


/* PUBLIC */
router.get("/", async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({
    createdAt: -1,
  });
  res.json(blogs);
});

router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: "published",
  });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
});

export default router;
