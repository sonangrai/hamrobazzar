const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  ads: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ads",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentext: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
});
module.exports = Comment = mongoose.model("Comment", CommentSchema);
