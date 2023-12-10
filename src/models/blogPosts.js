import mongoose from "mongoose";

const { Schema } = mongoose;

const blogPostsSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  readTime: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", 
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
      },
    },
  ],
});
export const blogPost = mongoose.model("blogPosts", blogPostsSchema);

