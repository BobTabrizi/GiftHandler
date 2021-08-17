/**
 * @Route /api/images
 * @Description Server Route managing image storing, deletion, and retrieval from S3
 *
 */

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, deleteFile, getFileStream } = require("../../utils/s3");
const router = express.Router();

/**
 * @route   GET api/images/:key
 * @description   Get an image from S3, given the image key
 **/
router.get("/:key", async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

/**
 * @route   POST api/images/add
 * @description   Upload image to S3, and return the URL to reference
 **/
router.post("/add", upload.single("image"), async (req, res) => {
  const file = req.file;
  let result = await uploadFile(file);
  result.imagePath = `/api/images/${result.key}`;
  await unlinkFile(file.path);
  res.status(201).json(result);
});

/**
 * @route   DELETE api/images/delete
 * @description  Delete an image on S3
 **/
router.delete("/delete", async (req, res) => {
  try {
    let { imageKey } = req.query;
    await deleteFile(imageKey);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});
module.exports = router;
