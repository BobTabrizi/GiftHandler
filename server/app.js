require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//routes
const authRoutes = require("./routes/api/auth");
const groupRoutes = require("./routes/api/groups");
const itemRoutes = require("./routes/api/items");
const imageRoutes = require("./routes/api/images");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//use routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/images", imageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get(`/*`, (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

module.exports = app;
