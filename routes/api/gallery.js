const express = require("express");
const router = express.Router();
const Ads = require("../../models/Ads");
const Gallery = require("../../models/Gallery");
const auth = require("../../middleware/auth");
const fs = require("fs");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/:id", upload.single("image"), auth, async (req, res, file) => {
  const checkAds = await Ads.findOne({ user: req.user.id });
  if (checkAds.id !== req.params.id) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  const image = req.file.originalname;
  try {
    gallery = new Gallery({
      ads: req.params.id,
      photo: image,
    });
    await gallery.save();
    res.json(gallery);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.find({ ads: req.params.id });
    if (!gallery) return res.status(400).json({ msg: "gallery not found" });
    res.json(gallery);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "gallery not found" });
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const checkAds = await Ads.findOne({ user: req.user.id });
  const checkUser = await Gallery.findById(req.params.id);
  if (checkAds.id != checkUser.ads) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  try {
    const remo = await Gallery.findById(req.params.id);
    if (!remo) return res.status(400).json({ msg: "Image not found" });
    fs.unlink("./uploads/" + remo.photo, (err) => {
      if (err) throw err;
      console.log("successfully deleted");
    });
    await remo.remove();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

module.exports = router;
