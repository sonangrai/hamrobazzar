const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

router.post(
  "/:id",
  [
    check("fullname", "Enter Full Name").not().isEmpty(),
    check("phone", "Phone Number Needed").not().isEmpty(),
    check("area", "Area Needed").not().isEmpty(),
    check("city", "City Needed").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      avatar,
      fullname,
      phone,
      street,
      area,
      city,
      hidenumber,
    } = req.body;
    try {
      profile = new Profile({
        user: req.params.id,
        avatar,
        fullname,
        phone,
        street,
        area,
        city,
        hidenumber,
      });
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "profile not found" });
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const checkUser = await User.findById(req.user.id);
  if (checkUser.id !== req.params.id) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  const { avatar, fullname, phone, street, area, city, hidenumber } = req.body;

  const profileFields = {};
  if (fullname) profileFields.fullname = fullname;
  if (avatar) profileFields.avatar = avatar;
  if (phone) profileFields.phone = phone;
  if (street) profileFields.street = street;
  if (city) profileFields.city = city;
  if (area) profileFields.area = area;
  if (hidenumber) profileFields.hidenumber = hidenumber;

  try {
    let profile = await Profile.findOne({ user: req.params.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.params.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `gallery 0-5/${gallery.length}`);
    res.send(gallery);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "profile not found" });
    res.status(500).send("Server Error");
  }
});
module.exports = router;
