const jwt = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, deleteFile, getFileStream } = require("../../s3");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");
initializePassport(passport);
const router = express.Router();
router.use(passport.initialize());

/**
 * @route   GET api/items/user
 * @description  Get a user's registry items
 **/
router.get("/user", async (req, res) => {
  try {
    let { userid } = req.query;

    pool.query(
      `SELECT itemid,price,image,name FROM itemdetails WHERE itemid IN (SELECT itemid FROM items WHERE uid = $1)`,
      [userid],
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
 * @route   GET api/items/images/
 * @description   Get an image from S3, given the image key
 **/
router.get("/images/:key", async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

/**
 * @route   POST api/items/add
 * @description   Add a registry item
 **/
router.post("/add", async (req, res) => {
  let { userid, price, imageKey, name } = req.body;
  //First add to items table and get the generated item id
  try {
    pool.query(
      `INSERT INTO ITEMS (uid) VALUES($1) RETURNING itemid`,
      [userid],
      (err, results) => {
        if (err) {
          throw err;
        }
        //Then add item details to item detail table with the generated item id
        let itemid = results.rows[0].itemid;
        pool.query(
          `INSERT INTO ITEMDETAILS (itemid,price,image,name) VALUES($1,$2,$3,$4) RETURNING itemid, price, image, name`,
          [itemid, price, imageKey, name],
          (err, results) => {
            if (err) {
              throw err;
            }
            if (results.rows[0].itemid === itemid) {
              res.status(201).json(results.rows[0]);
            } else {
              res.status(400).json({ msg: "Error Adding Item" });
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
 * @route   POST api/items/image
 * @description   Upload image to AWS S3, and return the URL to reference
 **/
router.post("/image", upload.single("image"), async (req, res) => {
  const file = req.file;
  let result = await uploadFile(file);
  result.imagePath = `http://localhost:3005/api/items/images/${result.key}`;
  await unlinkFile(file.path);
  res.status(201).json(result);
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
    pool.query(
      `DELETE FROM items WHERE itemid = $1`,
      [itemid],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
      }
    );
    //Then delete the saved image in S3
    await deleteFile(itemKey);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
