import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,

  },
  avatar: {
    type: String,
    required: true,
  },
});

export const Author = mongoose.model("authors", AuthorSchema);
