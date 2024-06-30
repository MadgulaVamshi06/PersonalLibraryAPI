const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: {
      type: String,
      enum: ["Currently Reading", "Read", "Want to Read"],
      default: "Want to Read",
    },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true }
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
