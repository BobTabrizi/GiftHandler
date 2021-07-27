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
  let { groupName, passcode, userid, groupMode, Bio } = req.body.GroupDetails;
  //First check to see if the group already exists
  const response = await pool
    .query(`SELECT * FROM GROUPAUTH where groupname = $1`, [groupName])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      res.status(400).json(err);
      return;
    });

  //If we find a group, return an error
  if (response) {
    res.status(400).json("Group Already Exists");
    return;
  }

  //If the group doesnt exist already, make a new group
  const groupid = await pool
    .query(
      `INSERT INTO GROUPAUTH(groupname,passcode,ownerid, mode) VALUES($1,$2,$3,$4) RETURNING id`,
      [groupName, passcode, userid, groupMode]
    )
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => {
      res.status(400).json(err);
      return;
    });

  pool
    .query(`INSERT INTO eventinfo (groupid,description) VALUES ($1,$2)`, [
      groupid,
      Bio,
    ])
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      res.status(400).json(err);
      return;
    });

  //Then insert the admin with the group id in the group table
  pool
    .query(
      `INSERT INTO GROUPS (id,userid,role) VALUES($1,$2,$3) RETURNING id, role`,
      [groupid, userid, "Admin"]
    )
    .then((results) => {
      if (results.rows[0].role === "Admin") {
        results.rows[0].groupname = groupName;
        results.rows[0].passcode = passcode;
        results.rows[0].mode = groupMode;
        res.status(201).json(results.rows[0]);
      } else {
        res.status(400).json("Error Creating Group");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

/**
 * @route   POST api/groups/users
 * @description    Add a user to a group
 **/
router.post("/users", async (req, res) => {
  let { groupname, passcode, userid } = req.body;

  let response;

  //Check if the user is already in the group.
  response = await pool
    .query(
      `SELECT groups.userid FROM GROUPS JOIN GROUPAUTH ON 
      groups.id = groupauth.id WHERE groupauth.groupname = $1 AND
      groups.userid = $2`,
      [groupname, userid]
    )
    .then((results) => {
      return results;
    })
    .catch((err) => console.log(err));
  if (response.rows[0]) {
    res.status(400).json("User Already in Group");
    return;
  }

  //Check if the Group exists
  response = await pool
    .query(`SELECT passcode, id,mode FROM GROUPAUTH WHERE groupname = $1`, [
      groupname,
    ])
    .then((results) => {
      return results;
    })
    .catch((err) => console.log(err));

  if (!response.rows.length) {
    res.status(400).json("Group Does Not Exist");
    return;
  }

  let groupmode = response.rows[0].mode;
  if (groupmode === 1) {
    //If the group is set to a wedding registry. Only one member is allowed in the group.
    res.status(400).json("This group is full");
    return;
  }

  //Check if the passcode matches
  if (passcode === response.rows[0].passcode) {
    let groupid = response.rows[0].id;
    pool
      .query(
        `INSERT INTO GROUPS(id, userid,role) VALUES($1,$2,$3) RETURNING *`,
        [groupid, userid, "Member"]
      )
      .then((results) => {
        results.rows[0].groupname = groupname;
        results.rows[0].mode = groupmode;
        res.status(201).json(results.rows[0]);
        return;
      })
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json("Incorrect Passcode");
  }
});

/**
 * @route   POST api/groups/removeUser
 * @description  Removes a user from a specified group
 **/
router.post("/removeUser", async (req, res) => {
  let { groupID, userID } = req.body;

  //First delete the user from the group.
  pool
    .query(`DELETE from GROUPS WHERE id=$1 AND userid = $2`, [groupID, userID])
    .catch((error) => {
      res.status(400).json(error);
      return;
    });

  //Then delete the user's items for that group.
  //This cascade deletes the user details table entries as well.
  pool
    .query(`DELETE from ITEMS WHERE groupid=$1 AND userid = $2`, [
      groupID,
      userID,
    ])
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   GET api/groups/user
 * @description  Get all of the groups a user is in
 **/
router.get("/user", async (req, res) => {
  let { userid } = req.query;

  //First get the groups the user does not own
  let memberGroups = await pool
    .query(
      `SELECT groups.id,groupauth.groupname, groups.partnerid,groups.role, groupauth.passcode,groupauth.mode,partners.name AS partner 
      FROM GROUPS INNER JOIN GROUPAUTH ON groupauth.id = groups.id LEFT OUTER JOIN users partners ON 
      groups.partnerid = partners.id WHERE role = 'Member' AND groups.userid = $1 ORDER BY groups.id DESC;`,
      [userid]
    )
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      res.status(400).json(error);
      return;
    });

  //Then get the user's owned groups with passcodes
  pool
    .query(
      `SELECT groups.id,groupauth.groupname, groups.partnerid,groups.role, groupauth.passcode,groupauth.mode,partners.name AS partner 
      FROM GROUPS INNER JOIN GROUPAUTH ON groupauth.id = groups.id LEFT OUTER JOIN users partners ON 
      groups.partnerid = partners.id WHERE role = 'Admin' AND groups.userid = $1 ORDER BY groups.id DESC;`,
      [userid]
    )
    .then((results) => {
      //Add all the groups together
      let groups = results.rows.concat(memberGroups);
      res.status(200).json(groups);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

/**
 * @route   GET api/groups/members
 * @description  Get all members of a group
 **/
router.get("/members", async (req, res) => {
  let { groupid } = req.query;
  pool
    .query(
      `SELECT users.name,partners.name AS partner,users.id,groups.role,groups.partnerid FROM USERS INNER JOIN GROUPS ON groups.userid = users.id LEFT OUTER JOIN users partners ON groups.partnerid = partners.id WHERE groups.id = $1;`,
      [groupid]
    )
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   GET api/groups/delete/
 * @description  Delete a group by group id
 **/
router.delete("/delete", async (req, res) => {
  let { groupid } = req.query;

  //Deletes both group auth and group table entries using cascade deletion
  pool
    .query(`DELETE from GROUPAUTH WHERE id = $1`, [groupid])
    .then(res.status(200).json("Group Deleted"))
    .catch((error) => {
      res.status(400).json(error);
    });
});

/**
 * @route   GET api/groups/
 * @description  Get a group
 **/
router.get("/", async (req, res) => {
  let { groupid } = req.query;
  let resultObject = {};
  //First get the group name and type
  let Group = await pool
    .query(`SELECT groupname, mode FROM GROUPAUTH WHERE id= $1`, [groupid])
    .then((results) => {
      return results.rows[0];
    })
    .catch((error) => res.status(400).json(error));

  //If we dont find the group return and notify.
  if (!Group) {
    res.status(400).json({ message: "Group Not Found" });
    return;
  }
  //Otherwise, find the id and names of all the members in the group

  let Bio = await pool
    .query(`SELECT description FROM eventinfo WHERE groupid= $1`, [groupid])
    .then((results) => {
      return results.rows[0];
    })
    .catch((error) => res.status(400).json(error));

  resultObject.Bio = Bio;
  resultObject.name = Group.groupname;
  resultObject.mode = Group.mode;
  resultObject.id = groupid;

  pool
    .query(
      `SELECT name,id,profileimage FROM USERS WHERE id IN (SELECT userid FROM GROUPS WHERE id= $1)`,
      [groupid]
    )
    .then((results) => {
      resultObject.members = results.rows;
      res.status(200).json(resultObject);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   POST api/groups/assignPartners
 * @description  Assign gifting partners in a group
 **/
router.post("/assignPartners", async (req, res) => {
  let groupParams = req.body.GroupParameters;
  let Partner1 = groupParams.PartnerList[0];
  let Partner2 = groupParams.PartnerList[1];

  pool
    .query(`UPDATE GROUPS SET partnerid = $1 WHERE userid = $2 AND id = $3 `, [
      Partner2,
      Partner1,
      groupParams.GroupID,
    ])
    .catch((error) => {
      res.status(400).json(error);
    });

  pool
    .query(`UPDATE GROUPS SET partnerid = $1 WHERE userid = $2 AND id = $3 `, [
      Partner1,
      Partner2,
      groupParams.GroupID,
    ])
    .then(res.status(201).json("Added Partners"))
    .catch((error) => {
      res.status(400).json(error);
    });
});

/**
 * @route   POST api/groups/edit
 * @description  Edit a group
 **/
router.post("/edit", async (req, res) => {
  let editParams = req.body;

  if (editParams.PassObject) {
    pool
      .query(`UPDATE groupauth SET passcode = $1 WHERE id = $2 `, [
        editParams.PassObject.newPass,
        editParams.PassObject.GroupID,
      ])
      .then(res.status(201).json("Passcode Successfully Changed"))
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

module.exports = router;
