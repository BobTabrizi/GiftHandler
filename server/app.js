require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//routes
const authRoutes = require("./routes/api/auth");
const groupRoutes = require("./routes/api/groups");

//middleware
app.use(cors());
app.use(express.json());

//use routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);

module.exports = app;
