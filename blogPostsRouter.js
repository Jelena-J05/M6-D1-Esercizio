import express from "express";
import { blogPost } from "./models/blogPosts.js";

const blogPostsRouter = express.Router();

blogPostsRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working!" });
});

blogPostsRouter.get("/", async (req, res) => {
  const blogPosts = await blogPost.find({});
  res.json(blogPosts);
});

blogPostsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogPost.findById(id);

  if (!blogPost) {
    return res.status(404).send();
  }

  res.json(blogPost);
});

blogPostsRouter.post("/", async (req, res) => {
  const newBlogPost = new blogPost(req.body);

  await newBlogPost.save();

  res.status(201).send(newBlogPost);
});

blogPostsRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlogPost = await blogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBlogPost) {
      return res.status(404).send(); 
    }

    res.json(updatedBlogPost); 
  } catch (error) {
    res.status(500).send();
  }
});

blogPostsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await blogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).send(); 
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).send();
  }
});

export default blogPostsRouter;
