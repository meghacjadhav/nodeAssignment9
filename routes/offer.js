const express = require("express");
const router = express.Router();
const Offers = require("../model/offers");
// var jwt = require("jsonwebtoken");

const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.get("/", async (req, res) => {
  try {
    // const token = req.headers.authorization?.split("Test")[1];
    // if (token) {
    //   jwt.verify(token, "wrong-secret", async function (err, decoded) {
    //     if (err) {
    //       return res.json({ status: "failed", message: err.message });
    //     }
    //     const player = decoded.data;
    //     const {
    //       page = 1,
    //       records = 10,
    //       attributes = "",
    //       query = "Diwali",
    //     } = req.query;
    //     const offerdata = await Offers.findOne()
    //       .skip((Number(page) - 1) * records)
    //       .limit(records);

    //     const target = offerdata.target.split(" ");
    //     const ageValue = target[2];
    //     // const ageOper = target[1];

    //     const installed_days_val = target[6];
    //     // const installed_days_oper = target[5];

    //     const offerPlayer = await Players.find({
    //       age: { $gt: ageValue },
    //       installed_days: { $lt: installed_days_val },
    //     });
    //     if (offerPlayer.player_id == player) {
    //     }
    // });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ status: "failed", message: "Invalid user" });
    // }

    const offerdata = await Offers.find();
    res.json({
      status: "success",
      result: offerdata,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.put("/", async (req, res) => {
  try {
    const offerdata = await Offers.create(req.body);
    res.json({
      status: "success",
      offerdata,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const offerdata = await Offers.updateOne({ _id: req.params.id }, req.body);
    res.json({
      status: "success",
      offerdata,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const offerdata = await Offers.deleteOne({ _id: req.params.id });
    res.json({
      status: "deleted",
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = router;
