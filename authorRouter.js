import express from "express";
import { Author } from "./models/authors.js";

const authorRouter = express.Router();

authorRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working!" });
});

authorRouter.get("/", async (req, res) => {
  const authors = await Author.find({});
  res.json(authors);
});

authorRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);

  if (!author) {
    return res.status(404).send();
  }

  res.json(author);
});

authorRouter.post("/", async (req, res) => {
  const newAuthor = new Author(req.body);

  await newAuthor.save();

  res.status(201).send(newAuthor);
});

authorRouter.put("/:id", async (req, res) => {
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

authorRouter.delete("/:id", async (req, res) => {
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
