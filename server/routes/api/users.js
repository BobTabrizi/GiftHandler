const express = require("express");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");
initializePassport(passport);

const router = express.Router();

router.use(passport.initialize());

/**
 * @route   GET api/users/
 * @description  Get information about a user
 **/
router.get("/", async (req, res) => {
  let { userid } = req.query;
  pool
    .query(`SELECT name, profileimage FROM USERS WHERE id = $1`, [userid])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   POST api/users/update
 * @description  Update a user
 **/
router.post("/update", async (req, res) => {
  try {
    //TODO
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
