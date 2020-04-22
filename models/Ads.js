const mongoose = require("mongoose");

const AdsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  pricenegotiable: {
    type: String,
    default: "yes",
  },
  condition: {
    type: String,
    required: true,
  },
  useduration: {
    type: String,
    required: true,
  },
  specifications: {
    type: String,
  },
  adstatus: {
    type: String,
    default: "unapproved",
  },
});

module.exports = Ads = mongoose.model("Ads", AdsSchema);