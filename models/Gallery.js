const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  ads: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ads",
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = Gallery = mongoose.model("Gallery", GallerySchema);
