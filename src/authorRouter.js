import express from "express";
import { Author } from "./models/authors.js";

const authorRouter = express.Router();

authorRouter.get("/test", async (req, res, next) => {
  res.json({ message: "Users router working!" });
});

authorRouter.get("/", async (req, res) => {
  const authors = await Author.find({});
  res.json(authors);
});

authorRouter.get("/:id", async (req, res, next) => {
  try {
  const author = await Author.findById(req.params.id);

  if (!author) {
    return res.status(404).send();
  }

  res.json(author);
} catch (err) {
  next(err);
  }
})

authorRouter.get("/:id/blogPost", async (req, res, next) => {
  try {
    let author = await blogPost.find({ author: mongoose.Types.ObjectId(req.params.id) })
      .populate({ path: "author", select: ["firstName", "lastName", "avatar"] });

    res.send(author);
  } catch (error) {
    next(error);
  }
});


authorRouter.post("/", async (req, res) => {
  const newAuthor = new Author(req.body); //we can also use create to create and save the new author

  await newAuthor.save();

  res.status(201).send(newAuthor);
});

authorRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedAuthor) {
      return res.status(404).send(); 
    }

    res.json(updatedAuthor); 
  } catch (error) {
    res.status(500).send();
  }
});

authorRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedDocument = await Author.findByIdAndDelete(req.params.id);

    if (!deletedDocument) {
      return res.status(404).send(); 
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).send();
  }
});

export default authorRouter;
