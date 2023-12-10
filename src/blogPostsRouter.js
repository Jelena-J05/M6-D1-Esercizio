import express from "express";
import { blogPost } from "./models/blogPosts.js";
import {Comment} from "./models/comments.js";


const blogPostsRouter = express.Router();

blogPostsRouter.get("/test", async (req, res, next) => {
  res.json({ message: "Users router working!" });
});

blogPostsRouter.get("/", async (req, res, next) => {
  const blogPosts = await blogPost.find({}).populate({
    path: "comments",
    populate: {
      model: "Author",
      select: ["firstName", "lastName", "avatar"],
    },
  })
  res.json(blogPosts);
});

blogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const foundBlogPost = await blogPost.findById(req.params.id);
    if (!foundBlogPost) {
      return res.status(404).send();
    }
  
    res.json(foundBlogPost);
  } catch (err) {
    next(err);
  }
});

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newBlogPost = new blogPost(req.body);
    await newBlogPost.save();
    res.status(201).send(newBlogPost);
  } catch (error) {
    next(error); 
  }
});


blogPostsRouter.put("/:id", async (req, res, next) => {
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
    next(error); 
  }
});

blogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedPost = await blogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).send(); 
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).send();
    next(error); 
  }
});

//COMMENTI


blogPostsRouter.get("/:id/comments", async (req, res, next) => {
  try {
    let comments = await Comment.find({
      blog: req.params.id,
    }).populate({
      model: "Author",
      select: ["firstName", "lastName", "avatar"],
    })
    res.send(comments)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.get("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comments = await Comment.find({
      blog: req.params.id,
      _id: req.params.commentId
    }).populate({
      model: "Author",
      select: ["firstName", "lastName", "avatar"],
    })
    res.send(comments)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.put("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findOneAndUpdate({
      blog: req.params.id,
      _id: req.params.commentId
    }, req.body, {new: true}).populate({
      model: "Author",
      select: ["firstName", "lastName", "avatar"],
    })
    res.send(comment)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.delete("/:id/comments/:commentId", async (req, res, next) => {
  try {
    await Comment.findOneAndDelete({
      blog: req.params.id,
      _id: req.params.commentId
    })
    res.send(204)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.post("/:id", async (req, res, next) => {
  try {
    let newComment = await Comment.create({ ...req.body, blog: req.params.id })
    console.log(newComment)
    let post = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: newComment,
        },
      },
      { new: true }
    ).populate({
      populate: {
        model: "Author",
        select: ["firstName", "lastName", "avatar"],
      },
    })
    res.send(post)
  } catch (error) {
    next(error)
  }
})


export default blogPostsRouter;
