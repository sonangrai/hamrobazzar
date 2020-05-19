const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Ads = require("../../models/Ads");
const auth = require("../../middleware/auth");

router.post(
  "/",
  auth,
  [
    check("title", "Enter the Title").not().isEmpty(),
    check("description", "Description Needed").not().isEmpty(),
    check("price", "Price not given").not().isEmpty(),
    check("condition", "Condition Needed").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      description,
      price,
      pricenegotiable,
      condition,
      useduration,
      specification,
      adstatus,
    } = req.body;
    try {
      ads = new Ads({
        user: req.user.id,
        title,
        description,
        price,
        pricenegotiable,
        condition,
        useduration,
        specification,
        adstatus,
      });
      await ads.save();
      res.json(ads);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const {
    title,
    description,
    price,
    pricenegotiable,
    condition,
    useduration,
    specification,
    adstatus,
  } = req.body;

  const adsFields = {};
  if (title) adsFields.title = title;
  if (description) adsFields.description = description;
  if (price) adsFields.price = price;
  if (pricenegotiable) adsFields.pricenegotiable = pricenegotiable;
  if (condition) adsFields.condition = condition;
  if (useduration) adsFields.useduration = useduration;
  if (specification) adsFields.specification = specification;
  if (adstatus) adsFields.adstatus = adstatus;

  try {
    let ads = await Ads.findById(req.params.id);

    if (ads) {
      ads = await Ads.findOneAndUpdate(
        { _id: req.params.id },
        { $set: adsFields },
        { new: true }
      );
      return res.json(ads);
    }

    ads = new Ads(adsFields);
    await ads.save();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id);
    if (!ads) return res.status(400).json({ msg: "Ads not found" });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "ads not found" });
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const ads = await Ads.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `ads 0-5/${ads.length}`);
    res.send(ads);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "ads not found" });
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const remo = await Ads.findById(req.params.id);
    await remo.remove();
    res.send(remo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

module.exports = router;
