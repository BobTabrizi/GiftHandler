const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Testing");
});

app.listen(3005, () => {
  console.log("running on port 3005");
});
