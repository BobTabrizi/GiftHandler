const express = require("express");
const pool = require("../../utils/db");
const redisClient = require("../../utils/redis");
const router = express.Router();
const { checkItems } = require("../../utils/functions/RedisFunctions");
const { openPage } = require("../../utils/puppeteer");
const { deleteFile } = require("../../utils/s3");
const {
  getTargetItem,
  getEtsyItem,
  getAmazonItem,
} = require("../../utils/functions/ScrapeFunctions");

/**
 * @route   GET api/items/user
 * @description  Get a user's registry items in a specified group
 **/
router.get("/user", async (req, res) => {
  let { userid, groupid } = req.query;

  //First check redis cache for the data
  let ItemCacheResult = await checkItems(`${userid}/${groupid}/Items`).then(
    function (results) {
      return results[0];
    }
  );
  //If data is found, pull the data from the cache and skip the DB call
  if (ItemCacheResult !== null) {
    console.log("Items in cache");
    return res.status(200).json(JSON.parse(ItemCacheResult));
  }

  pool
    .query(
      `SELECT * FROM itemdetails WHERE itemid IN (SELECT itemid FROM items WHERE userid = $1 AND groupid = $2)`,
      [userid, groupid]
    )
    .then((result) => {
      //Store data temporarily in cache, stringifying the object since redis only takes in strings
      //Key will be a string in the format UserID/GroupID/Items
      redisClient.setex(
        `${userid}/${groupid}/Items`,
        300,
        JSON.stringify(result.rows)
      );
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
      `INSERT INTO ITEMDETAILS (itemid,price,quantity,link,purchased,image,name,description) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        itemID,
        Item.price,
        Item.quantity,
        Item.link,
        Item.purchased,
        Item.imageKey,
        Item.itemName,
        Item.description,
      ]
    )
    .then((result) => {
      if (result.rows[0].itemid === itemID) {
        //If an item is modified, delete the old cache entry
        redisClient.del(`${Item.userID}/${Item.groupID}/Items`);
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
  let { itemid, price, quantity, link, imageKey, name, description } =
    req.body.item;
  pool
    .query(
      `UPDATE itemdetails SET price = $2, quantity = $3, link = $4, image = $5, name = $6, description = $7 WHERE itemid = $1
      RETURNING *`,
      [itemid, price, quantity, link, imageKey, name, description]
    )
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((error) => console.log(error));
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
    pool
      .query(`DELETE FROM items WHERE itemid = $1`, [itemid])
      .catch((error) => {
        res.status(400).json(error);
        return;
      });
    //Delete the saved image in S3 if it is not the default
    if (itemKey !== "DefaultItem") {
      await deleteFile(itemKey);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   GET api/items/getData
 * @description  Retrieves item data given a vendor link
 **/
router.get("/getData", async (req, res) => {
  let { Vendor, Link } = req.query;

  //Check for a vendor, and find data based on the vendor. Some vendors have open API's, some don't.
  //For those that don't we will use the puppeteer library to webscrape everything we need.

  const { page, browser } = await openPage(Link);

  let ItemDetails;
  switch (Vendor) {
    case "Target":
      ItemDetails = await getTargetItem(page);
      break;

    case "Etsy":
      ItemDetails = await getEtsyItem(page);
      break;

    case "Amazon":
      ItemDetails = await getAmazonItem(page);
      break;
  }

  browser.close();
  res.status(201).json(ItemDetails);
});

module.exports = router;
