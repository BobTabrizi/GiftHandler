/**
 *
 * @File redis.js
 * @Description Creates a Redis client and exports it for use in server routes
 *
 */

const redis = require("redis");
const bluebird = require("bluebird");
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);
bluebird.promisifyAll(redis.RedisClient.prototype);
client.on("connect", function (err, response) {
  "use strict";
  console.log("Connected to database");
});

module.exports = client;
