import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    blogPost: {
        type: Schema.Types.ObjectId,
        ref: "blogPost",
    }
  },
)

export const Comment = mongoose.model ("Comments", commentsSchema)