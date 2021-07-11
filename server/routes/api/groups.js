const jwt = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");

initializePassport(passport);

const router = express.Router();

router.use(passport.initialize());

//Create Group
router.post("/", async (req, res) => {
  let groupid = "tmp";
  let userid = "tmp";
  try {
    pool.query(`INSERT INTO GROUPS(groupid,userid,role) VALUES($1,$2,$3)`, [
      groupid,
      userid,
      "Admin",
    ]);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

//Add group members
router.post("/users", async (req, res) => {
  let groupid = "tmp";
  let userid = "tmp";
  try {
    pool.query(`INSERT INTO GROUPS(groupid,userid,role) VALUES($1,$2,$3)`, [
      groupid,
      userid,
      "Member",
    ]);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    //insert pool select statement here
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //insert pool DELETE statement here
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
