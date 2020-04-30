const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");
const Ads = require("../../models/Ads");
const Comment = require("../../models/Comment");
const auth = require("../../middleware/auth");

router.post(
  "/:id",
  auth,
  [check("commentext", "Enter Comment").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { commentext } = req.body;
    try {
      comment = new Comment({
        ads: req.params.id,
        user: req.user.id,
        commentext,
      });
      await comment.save();
      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const checkAds = await Comment.findOne({ user: req.user.id });
  if (checkAds.id !== req.params.id) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  const { commentext } = req.body;

  const commentFields = {};
  if (commentext) commentFields.commentext = commentext;

  try {
    let comment = await Comment.findById(req.params.id);

    if (comment) {
      comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        { $set: commentFields },
        { new: true }
      );
      return res.json(comment);
    }

    comment = new Comment(commentFields);
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).json({ msg: "comment not found" });
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "comment not found" });
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const remo = await Comment.findById(req.params.id);
    if (!remo) return res.status(400).json({ msg: "comment not found" });
    await remo.remove();
    res.send("Comment Deleted Succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

router.put("/reply/:id", auth, async (req, res) => {
  const checkAds = await Ads.findOne({ user: req.user.id });
  if (checkAds.id !== req.params.id) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  const { commentext, reply } = req.body;

  const commentFields = {};
  if (reply) commentFields.reply = reply;
  if (commentext) commentFields.commentext = commentext;

  try {
    let comment = await Comment.findOne({ ads: req.params.id });

    if (comment) {
      comment = await Comment.findOneAndUpdate(
        { ads: req.params.id },
        { $set: commentFields },
        { new: true }
      );
      return res.json(comment);
    }

    comment = new Comment(commentFields);
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/reply/:id", auth, async (req, res) => {
  try {
    const remo = await Comment.findOne({ ads: req.params.id });
    if (!remo) return res.status(400).json({ msg: "Reply not found" });
    remo.reply = null;
    await remo.save();
    res.send("Reply Removed Succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

module.exports = router;
