const express = require("express");
const passport = require("passport");
const pool = require("../../utils/db");
const redisClient = require("../../utils/redis");
const { checkGroups } = require("../../utils/functions/RedisFunctions");
const initializePassport = require("../../utils/passport");
initializePassport(passport);

const router = express.Router();

router.use(passport.initialize());

/**
 * @route   POST api/groups/create
 * @description    Create a group
 **/
router.post("/create", async (req, res) => {
  let { groupName, passcode, userid, groupType, Description, groupImage } =
    req.body.GroupDetails;
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
      `INSERT INTO GROUPAUTH(groupname,passcode,ownerid, grouptype,groupimage) VALUES($1,$2,$3,$4,$5) RETURNING groupid`,
      [groupName, passcode, userid, groupType, groupImage]
    )
    .then((res) => {
      return res.rows[0].groupid;
    })
    .catch((err) => {
      res.status(400).json(err);
      return;
    });

  pool
    .query(`INSERT INTO eventinfo (groupid,description) VALUES ($1,$2)`, [
      groupid,
      Description,
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
      `INSERT INTO GROUPS (groupid,userid,role) VALUES($1,$2,$3) RETURNING groupid, role`,
      [groupid, userid, "Admin"]
    )
    .then((results) => {
      if (results.rows[0].role === "Admin") {
        results.rows[0].groupname = groupName;
        results.rows[0].passcode = passcode;
        results.rows[0].grouptype = groupType;
        results.rows[0].groupimage = groupImage;

        //Since a group has been created, delete cache entry
        redisClient.del(userid);
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
 * @route   POST api/groups/addMember
 * @description    Add a user to a group
 **/
router.post("/addMember", async (req, res) => {
  let { groupname, passcode, userid } = req.body;

  let response;

  //Check if the user is already in the group.
  response = await pool
    .query(
      `SELECT groups.userid FROM GROUPS JOIN GROUPAUTH ON 
      groups.groupid = groupauth.groupid WHERE groupauth.groupname = $1 AND
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
    .query(
      `SELECT passcode, groupid,grouptype FROM GROUPAUTH WHERE groupname = $1`,
      [groupname]
    )
    .then((results) => {
      return results;
    })
    .catch((err) => console.log(err));

  if (!response.rows.length) {
    res.status(400).json("Group Does Not Exist");
    return;
  }

  let grouptype = response.rows[0].grouptype;
  if (grouptype === 1) {
    //If the group is set to an event registry. Only one member is allowed in the group.
    res.status(400).json("This group is full");
    return;
  }

  //Check if the passcode matches
  if (passcode === response.rows[0].passcode) {
    let groupid = response.rows[0].groupid;
    let GroupInfo = await pool
      .query(
        `INSERT INTO GROUPS(groupid, userid,role) VALUES($1,$2,$3) RETURNING *`,
        [groupid, userid, "Member"]
      )
      .then((results) => {
        results.rows[0].groupname = groupname;
        results.rows[0].grouptype = grouptype;
        return results.rows[0];
      })
      .catch((error) => res.status(400).json(error));

    //Use the group data and package the group description and image to send back
    pool
      .query(`SELECT * from groupauth where groupid = $1`, [groupid])
      .then((results) => {
        GroupInfo.name = results.rows[0].name;
        GroupInfo.email = results.rows[0].email;
        GroupInfo.password = results.rows[0].password;
        GroupInfo.groupimage = results.rows[0].groupimage;

        //Remove old cache object
        redisClient.del(userid);
        res.status(201).json(GroupInfo);
      })
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json("Incorrect Passcode");
  }
});

/**
 * @route   DELETE api/groups/removeMember
 * @description  Removes a member from a specified group
 **/
router.delete("/removeMember", async (req, res) => {
  let { groupID, userID } = req.query;
  //First delete the user from the group.
  pool
    .query(`DELETE from GROUPS WHERE groupid=$1 AND userid = $2`, [
      groupID,
      userID,
    ])
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
    .then(
      //Remove old cache object
      redisClient.del(userID)
    )
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   GET api/groups/user/:id
 * @description  Get all of the groups a user is in
 **/
router.get("/user/:id", async (req, res) => {
  const userid = req.params.id;

  //First check redis cache for the data
  let GroupCacheResult = await checkGroups(userid).then(function (results) {
    return results[0];
  });
  //If data is found, pull the data from the cache and skip the DB call
  if (GroupCacheResult !== null) {
    console.log("In cache");
    return res.status(200).json(JSON.parse(GroupCacheResult));
  }

  //First get the groups the user does not own
  let memberGroups = await pool
    .query(
      `SELECT groups.groupid,groupauth.groupname, groups.partnerid,groups.role, groupauth.passcode,groupauth.grouptype,groupauth.groupimage,partners.name AS partner 
      FROM GROUPS INNER JOIN GROUPAUTH ON groupauth.groupid = groups.groupid LEFT OUTER JOIN users partners ON 
      groups.partnerid = partners.id WHERE role = 'Member' AND groups.userid = $1 ORDER BY groups.groupid DESC`,
      [userid]
    )
    .then((results) => {
      return results.rows;
    })
    .catch((error) => {
      res.status(400).json(error);
      return;
    });

  //Then get the user's owned groups with passcodes and descriptions of their groups/events
  pool
    .query(
      `SELECT groups.groupid,groupauth.groupname,groups.partnerid,groups.role,groupauth.passcode,groupauth.grouptype, groupauth.groupimage, partners.name AS partner, eventinfo.description 
      FROM groups INNER JOIN groupauth ON groupauth.groupid = groups.groupid LEFT OUTER JOIN users partners ON groups.partnerid = partners.id LEFT OUTER JOIN eventinfo 
      ON eventinfo.groupid = groups.groupid WHERE role = 'Admin' AND groups.userid = $1 ORDER BY groups.groupid DESC`,
      [userid]
    )
    .then((results) => {
      //Add all the groups together
      let groups = results.rows.concat(memberGroups);

      //Store data temporarily in cache, stringifying the object since redis only takes in strings
      //Key will be simply be the UserID
      redisClient.setex(userid, 3600, JSON.stringify(groups));
      res.status(200).json(groups);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

/**
 * @route   GET api/groups/members/:groupid
 * @description  Get all members of a group
 **/
router.get("/members/:groupid", async (req, res) => {
  const groupid = req.params.groupid;
  pool
    .query(
      `SELECT users.name,partners.name AS partner,users.id,groups.role,groups.partnerid FROM USERS INNER JOIN GROUPS ON groups.userid = users.id LEFT OUTER JOIN users partners ON groups.partnerid = partners.id WHERE groups.groupid = $1;`,
      [groupid]
    )
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   GET api/groups/delete/:groupid
 * @description  Delete a group by group id
 **/
router.delete("/delete/:groupid", async (req, res) => {
  const groupid = req.params.groupid;

  //Deletes both group auth and group table entries using cascade deletion
  pool
    .query(`DELETE from GROUPAUTH WHERE groupid = $1 RETURNING *`, [groupid])
    .then((response) => {
      //Since the group has been deleted, delete cache entry for the owner
      redisClient.del(response.rows[0].ownerid);
      res.status(200).json("Group Deleted");
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

/**
 * @route   GET api/groups/:groupid
 * @description  Get a group
 **/
router.get("/:groupid", async (req, res) => {
  const groupid = req.params.groupid;
  let resultObject = {};

  //First get the group name and type
  let Group = await pool
    .query(`SELECT groupname, grouptype FROM GROUPAUTH WHERE groupid= $1`, [
      groupid,
    ])
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

  let Description = await pool
    .query(`SELECT description FROM eventinfo WHERE groupid= $1`, [groupid])
    .then((results) => {
      return results.rows[0];
    })
    .catch((error) => res.status(400).json(error));

  resultObject.description = Description;
  resultObject.name = Group.groupname;
  resultObject.grouptype = Group.grouptype;
  resultObject.groupid = groupid;

  pool
    .query(
      `SELECT name,id,profileimage FROM USERS WHERE id IN (SELECT userid FROM GROUPS WHERE groupid= $1)`,
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
    .query(
      `UPDATE GROUPS SET partnerid = $1 WHERE userid = $2 AND groupid = $3 `,
      [Partner2, Partner1, groupParams.GroupID]
    )
    .catch((error) => {
      res.status(400).json(error);
    });

  pool
    .query(
      `UPDATE GROUPS SET partnerid = $1 WHERE userid = $2 AND groupid = $3 RETURNING *`,
      [Partner1, Partner2, groupParams.GroupID]
    )
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
  let editParams = req.body.GroupDetails;
  if (editParams.PassObject) {
    pool
      .query(
        `UPDATE groupauth SET passcode = $1 WHERE groupid = $2 RETURNING *`,
        [editParams.PassObject.newPass, editParams.PassObject.GroupID]
      )
      .then((res) => {
        //Since the group has been changed, delete cache entry for the owner
        redisClient.del(res.rows[0].ownerid);
        res.status(201).json("Passcode Successfully Changed");
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  if (editParams.DescObject) {
    pool
      .query(
        `UPDATE eventinfo SET description = $1 WHERE groupid = $2 RETURNING *`,
        [editParams.DescObject.Description, editParams.DescObject.GroupID]
      )
      .catch((error) => {
        res.status(400).json(error);
      });

    pool
      .query(`SELECT ownerid FROM groupauth WHERE groupid = $1`, [
        editParams.DescObject.GroupID,
      ])
      .then((response) => {
        //Since the group has been changed, delete cache entry for the owner
        redisClient.del(response.rows[0].ownerid);
        res.status(201).json("Description Sucessfully Changed");
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

module.exports = router;
