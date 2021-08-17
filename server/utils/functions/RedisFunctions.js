/**
 *
 * @File RedisFunctions.js
 * @Description Redis Helper Functions
 *
 */

const redisClient = require("../redis");
function checkGroups(userid) {
  let group_promise = redisClient.getAsync(userid).then(function (response) {
    return response;
  });

  return Promise.all([group_promise]);
}

function checkItems(Key) {
  let item_promise = redisClient.getAsync(Key).then(function (response) {
    return response;
  });

  return Promise.all([item_promise]);
}

module.exports = { checkGroups, checkItems };
