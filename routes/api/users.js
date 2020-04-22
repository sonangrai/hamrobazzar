const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route POST api/user
// @desc Register User
// @access Public
router.post(
  "/",
  [
    check("email", "Enter Valid Email").isEmail(),
    check("password", "More than 6 character").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exist" }] });
      }

      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

// @route PUT api/user
// @desc Edit User
// @access Public
router.put(
  "/:id",
  [
    check("name", "Please Enter Name").not().isEmpty(),
    check("counter", "Please Counter Number").not().isEmpty(),
    check("email", "Enter Valid Emai").isEmail(),
    check("password", "More than 6 character").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password,
      usertype,
      contact,
      address,
      counter,
    } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (usertype) userFields.usertype = usertype;
    if (contact) userFields.contact = contact;
    if (address) userFields.address = address;
    if (counter) userFields.counter = counter;
    const salt = await bcrypt.genSalt(10);
    if (password) userFields.password = await bcrypt.hash(password, salt);

    try {
      let user = await User.findById(req.params.id);

      if (user) {
        user = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: userFields },
          { new: true }
        );
        return res.json(user);
      }

      user = new user(userFields);
      await user.save();
      res.json(user);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

// @route GET api/user
// @desc GEting current user
//@access Public
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

// @route GET api/Profile/user/user_id
// @desc GEting current user profile
//@access Public
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

// @route DELETE api/Profile/user/user_id
// @desc Deleting user by Id
// @access Private
router.delete("/:id", async (req, res) => {
  try {
    const remo = await User.findById(req.params.id);
    await remo.remove();
    res.send("User Deleted Succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

module.exports = router;