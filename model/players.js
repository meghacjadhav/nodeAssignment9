const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_id: { type: String, required: true },
  password: { type: String, required: true },
  age: Number,
  country: String,
  installed_days: Number,
  coins: Number,
  gems: Number,
  game_level: Number,
  purchaser: Boolean,
});

const players = mongoose.model("players", playerSchema);

module.exports = players;
