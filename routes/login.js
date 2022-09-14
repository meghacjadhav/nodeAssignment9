const express = require("express");
const router = express.Router();
const Players = require("../model/players");
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const secret = "SECRET";
var jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("player_id").isEmail(),
  body("password").isLength({ min: 5, max: 16 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (err) {
          return res
            .status(400)
            .json({ status: "failed", message: err.message });
        } else {
          const player = await Players.create({
            player_id: req.body.player_id,
            password: hash,
            age: req.body.age,
            country: req.body.country,
            installed_days: req.body.installed_days,
            coins: req.body.coins,
            gems: req.body.gems,
            game_level: req.body.game_level,
            purchaser: req.body.purchaser,
          });
          res.status(201).json({
            status: "Success",
            message: "Registration successful",
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const checkPlayer = await Players.findOne({
      player_id: req.body.player_id,
    });
    if (!checkPlayer) {
      return res.status(400).json({
        status: "Login Failed",
        message: "Invalid User",
      });
    }
    bcrypt.compare(req.body.password, checkPlayer.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: checkPlayer.player_id,
          },
          secret
        );
        res.json({
          status: "Success",
          message: "Login successful",
          token,
        });
      } else {
        return res.json({
          status: "failed",
          message: "Invalid Credentials",
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});
module.exports = router;
