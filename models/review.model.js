const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    text : { type: Number, required: true },
    userBook: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;
