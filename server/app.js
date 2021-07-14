require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//routes
const authRoutes = require("./routes/api/auth");
const groupRoutes = require("./routes/api/groups");
const itemRoutes = require("./routes/api/items");
const imageRoutes = require("./routes/api/images");
//middleware
app.use(cors());
app.use(express.json());

//use routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/images", imageRoutes);

module.exports = app;
