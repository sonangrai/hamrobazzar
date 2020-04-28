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
// @access Private
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
    check("email", "Enter Valid Email Address").isEmail(),
    check("password", "More than 6 character").isLength({ min: 6 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const userFields = {};
    if (email) userFields.email = email;
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
// @desc Getting current user7s profile
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

// @route DELETE api/Profile/user/user_id
// @desc Deleting user by Id
// @access Private
router.delete("/:id", auth, async (req, res) => {
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
