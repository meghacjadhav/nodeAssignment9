const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/liveopsengine");
const express = require("express");
const app = express();
const offer = require("./routes/offer");
const login = require("./routes/login");

app.use("/offers", offer);

app.use("/", login);

app.listen(3000, () => {
  console.log("Established connection");
});
