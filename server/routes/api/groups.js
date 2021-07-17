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
          `INSERT INTO GROUPS (id,groupname,userid,role) VALUES($1,$2,$3,$4) RETURNING id,groupname,role`,
          [groupid, groupname, userid, "Admin"],
          (err, results) => {
            if (err) {
              throw err;
            }
            if (results.rows[0].groupname === groupname) {
              res.status(201).json(results.rows[0]);
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
      `SELECT userid from GROUPS WHERE groupname = $1 AND userid = $2`,
      [groupname, userid],
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
                    `INSERT INTO GROUPS(id,groupname,userid,role) VALUES($1,$2,$3,$4) RETURNING *`,
                    [groupid, groupname, userid, "Member"],
                    (err, results) => {
                      if (err) {
                        throw err;
                      }
                      //console.log(results.rows);
                      res.status(201).json(results.rows[0]);
                    }
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
 * @route   POST api/groups/removeUser
 * @description  Removes a user from a specified group
 **/
router.post("/removeUser", async (req, res) => {
  let { groupID, userID } = req.body;

  try {
    //First delete the user from the group.
    pool.query(
      `DELETE from GROUPS WHERE id=$1 AND userid = $2`,
      [groupID, userID],
      (err, results) => {
        if (err) {
          throw err;
        }
        //Then delete the user's items for that group.
        //This cascade deletes the user details table entries as well.
        pool.query(
          `DELETE from ITEMS WHERE groupid=$1 AND userid = $2`,
          [groupID, userID],
          (err, results) => {
            if (err) {
              throw err;
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
 * @route   GET api/groups/user
 * @description  Get all of the groups a user is in
 **/
router.get("/user", async (req, res) => {
  try {
    let { userid } = req.query;

    //First get the groups the user does not own
    pool.query(
      `SELECT id,groupname,role FROM GROUPS WHERE userid = $1 AND role = 'Member'`,
      [userid],
      (err, results) => {
        if (err) {
          throw err;
        }

        let memberGroups = results.rows;

        //Then get the user's owned groups with passcodes
        pool.query(
          `SELECT groups.id,groups.groupname,groups.role, groupauth.passcode 
          FROM GROUPS INNER JOIN GROUPAUTH 
          ON groupauth.id = groups.id WHERE role = 'Admin'AND groups.userid = $1;`,
          [userid],
          (err, results) => {
            if (err) {
              throw err;
            }

            //Add all the groups together
            let groups = results.rows.concat(memberGroups);
            res.status(200).json(groups);
          }
        );
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
      `SELECT users.name,users.id,groups.role FROM USERS INNER JOIN GROUPS ON groups.userid = users.id WHERE groups.id = $1;`,
      [groupid],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results.rows);
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/groups/delete/
 * @description  Delete a group by group id
 **/
router.delete("/delete", async (req, res) => {
  let { groupid } = req.query;
  try {
    //Deletes both group auth and group table entries using cascade deletion
    pool.query(
      `DELETE from GROUPAUTH WHERE id = $1`,
      [groupid],
      (err, results) => {
        if (err) {
          throw err;
        }

        console.log(results.rows);
      }
    );
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
          resultObject.id = groupid;
          pool.query(
            `SELECT name,id,profileimage FROM USERS WHERE id IN (SELECT userid FROM GROUPS WHERE id= $1)`,
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

/**
 * @route   POST api/groups/edit
 * @description  Edit a group
 **/
router.post("/edit", async (req, res) => {
  let editParams = req.body;

  if (editParams.PassObject) {
    try {
      pool.query(
        `UPDATE groupauth SET passcode = $1 WHERE id = $2 `,
        [editParams.PassObject.newPass, editParams.PassObject.GroupID],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.status(201).json("Passcode Successfully Changed");
        }
      );
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
});

module.exports = router;
