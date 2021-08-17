/**
 *
 * @File s3.js
 * @Description Contains methods to upload, retrieve, and modify images from an AWS S3 Bucket.
 *
 */

require("dotenv").config();

const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const BucketName = process.env.AWS_BUCKET_NAME;
const Region = process.env.BUCKET_REGION;
const accesskeyID = process.env.AWS_ACCESS_KEY;
const secretaccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  Region,
  accesskeyID,
  secretaccessKey,
});

//Upload File to S3
function uploadFile(file) {
  if (file !== undefined) {
    const filestream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: BucketName,
      Body: filestream,
      Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
  }
}

function deleteFile(key) {
  const deleteParams = {
    Bucket: BucketName,
    Key: key,
  };

  return s3.deleteObject(deleteParams).promise();
}

//Download File from S3

function getFileStream(Key) {
  const downloadParams = {
    Key: Key,
    Bucket: BucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.getFileStream = getFileStream;
