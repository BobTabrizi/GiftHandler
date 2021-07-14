const jwt = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");
initializePassport(passport);

const router = express.Router();

router.use(passport.initialize());

/**
 * @route   POST api/groups/create
 * @description    Create a group
 **/
router.post("/create", async (req, res) => {
  let { groupname, passcode, userid } = req.body;
  //First create group detail table
  try {
    pool.query(
      `INSERT INTO GROUPAUTH(groupname,passcode,ownerid) VALUES($1,$2,$3) RETURNING id`,
      [groupname, passcode, userid],
      (err, results) => {
        if (err) {
          throw err;
        }
        //Then insert the admin with the group id in the group table
        let groupid = results.rows[0].id;
        pool.query(
          `INSERT INTO GROUPS (id,groupname,userid,role) VALUES($1,$2,$3,$4) RETURNING userid`,
          [groupid, groupname, userid, "Admin"],
          (err, results) => {
            if (err) {
              throw err;
            }
            if (results.rows[0].userid === userid) {
              res.status(201).json({ msg: "Group Created" });
            } else {
              res.status(400).json({ msg: "Error Creating Group" });
            }
          }
        );
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/groups/users
 * @description    Add a user to a group
 **/
router.post("/users", async (req, res) => {
  let { groupname, passcode, userid } = req.body;
  try {
    //Check if the user is already in the group.
    pool.query(
      `SELECT userid from GROUPS WHERE userid = $1`,
      [userid],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows[0]) {
          res.status(400).json({ message: "User Already in Group" });
        } else {
          pool.query(
            `SELECT passcode, id FROM GROUPAUTH WHERE groupname = $1`,
            [groupname],
            (err, results) => {
              if (err) {
                throw err;
              }

              // console.log(results.rows[0]);
              if (!results.rows.length) {
                res.status(400).json({ message: "Group Does Not Exist" });
              } else {
                //Check if the passcode matches
                if (passcode === results.rows[0].passcode) {
                  let groupid = results.rows[0].id;
                  pool.query(
                    `INSERT INTO GROUPS(id,groupname,userid,role) VALUES($1,$2,$3,$4)`,
                    [groupid, groupname, userid, "Member"]
                  );
                }
              }
            }
          );
        }
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/groups/user
 * @description  Get all of the groups a user is in
 **/
router.get("/user", async (req, res) => {
  try {
    let { userid } = req.query;
    // console.log(userid);
    pool.query(
      `SELECT id,groupname FROM GROUPS WHERE userid = $1`,
      [userid],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);
        res.status(200).json(results.rows);
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/groups/members
 * @description  Get all members of a group
 **/
router.get("/members", async (req, res) => {
  try {
    let { groupid } = req.query;
    pool.query(
      `SELECT name FROM USERS WHERE id IN (SELECT userid FROM GROUPS WHERE id= $1)`,
      [groupid],
      (err, results) => {
        if (err) {
          throw err;
        }
        //console.log(results.rows);
        res.status(200).json(results.rows);
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/groups/delete/:id
 * @description  Delete a group by group id
 **/
router.delete("/delete/:id", async (req, res) => {
  try {
    //TODO
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   GET api/groups/
 * @description  Get a group
 **/
router.get("/", async (req, res) => {
  try {
    let { groupid } = req.query;
    let resultObject = {};
    //First get the group name.
    pool.query(
      `SELECT groupname FROM GROUPAUTH WHERE id= $1`,
      [groupid],
      (err, results) => {
        if (err) {
          throw err;
        }
        //console.log(results.rows);

        //If we dont find the group return and notify.
        if (!results.rows) {
          res.status(400).json({ message: "Group Not Found" });
          return;
        }
        //Otherwise, find the id and names of all the members in the group
        else {
          resultObject.name = results.rows[0].groupname;
          pool.query(
            `SELECT name,id FROM USERS WHERE id IN (SELECT userid FROM GROUPS WHERE id= $1)`,
            [groupid],
            (err, results) => {
              if (err) {
                throw err;
              }
              // console.log(results.rows);
              resultObject.members = results.rows;
              res.status(200).json(resultObject);
            }
          );
        }
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
