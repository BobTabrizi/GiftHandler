const express = require("express");
const { deleteFile } = require("../../s3");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");
initializePassport(passport);
const router = express.Router();
router.use(passport.initialize());

/**
 * @route   GET api/items/user
 * @description  Get a user's registry items in a specified group
 **/
router.get("/user", async (req, res) => {
  let { userid, groupid } = req.query;
  pool
    .query(
      `SELECT * FROM itemdetails WHERE itemid IN (SELECT itemid FROM items WHERE userid = $1 AND groupid = $2)`,
      [userid, groupid]
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   POST api/items/add
 * @description   Add a registry item
 **/
router.post("/add", async (req, res) => {
  let { Item } = req.body;
  //First add to items table and get the generated item id

  let itemID = await pool
    .query(
      `INSERT INTO ITEMS (userid,groupid) VALUES($1,$2) RETURNING itemid`,
      [Item.userID, Item.GroupID]
    )
    .then((result) => {
      return result.rows[0].itemid;
    })
    .catch((error) => {
      res.status(400).json(error);
      return;
    });
  //Then add item details to item detail table with the generated item id

  pool
    .query(
      `INSERT INTO ITEMDETAILS (itemid,price,quantity,link,purchased,image,name) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [
        itemID,
        Item.price,
        Item.quantity,
        Item.link,
        Item.purchased,
        Item.imageKey,
        Item.itemName,
      ]
    )
    .then((result) => {
      if (result.rows[0].itemid === itemID) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(400).json({ message: "Error Adding Item" });
      }
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   POST api/items/edit
 * @description  Edit a registry item
 **/
router.post("/edit", async (req, res) => {
  let { itemid, price, quantity, link, imageKey, name } = req.body.item;

  pool
    .query(
      `UPDATE itemdetails SET price = '${price}', quantity = '${quantity}', link = '${link}', image = '${imageKey}', name = '${name}' WHERE itemid = $1
      RETURNING *`,
      [itemid]
    )
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   POST api/items/purchase
 * @description  Update a registry item when a purchase is made
 **/
router.post("/purchase", async (req, res) => {
  let { itemid } = req.body.item;
  pool
    .query(
      `UPDATE itemdetails SET quantity = ${quantity} - 1 ,  WHERE itemid = $1 AND quantity >= 0
      RETURNING *`,
      [itemid]
    )
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((error) => res.status(400).json(error));
});

/**
 * @route   DELETE api/items/delete/:id
 * @description  Delete a registry item
 **/
router.delete("/delete", async (req, res) => {
  try {
    let { itemid, itemKey } = req.query;

    //Delete from multiple tables using SQL Cascading Delete
    //Deletes from items and itemdetails tables
    pool
      .query(`DELETE FROM items WHERE itemid = $1`, [itemid])
      .catch((error) => {
        res.status(400).json(error);
        return;
      });
    //Then delete the saved image in S3 if it is not the default
    if (itemKey !== "DefaultItem") {
      await deleteFile(itemKey);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
