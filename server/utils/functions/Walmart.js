/**
 *
 * @File Walmart.js
 * @Description Configuration and Helper Function for use of Walmart's Affiliates API
 *
 */

const crypto = require("crypto");
const fetch = require("node-fetch");

//Authentication parameters for API
const keyData = {
  consumerId: process.env.WALMART_API_ID,
  privateKey: process.env.WALMART_API_KEY,
  keyVer: 1,
};

/* Each API request requires an API app ID, unix epoch timestamp, private key version, and a signature of the other header values
 *  using an RSA-SHA256 key value pair.
 */
function generateWalmartHeaders() {
  const { privateKey, consumerId, keyVer } = keyData;
  const hashList = {
    "WM_CONSUMER.ID": consumerId,
    "WM_CONSUMER.INTIMESTAMP": Date.now().toString(),
    "WM_SEC.KEY_VERSION": keyVer,
  };

  //Create string of headers to sign with the private key.
  const sortedHashString = `${hashList["WM_CONSUMER.ID"]}\n${hashList["WM_CONSUMER.INTIMESTAMP"]}\n${hashList["WM_SEC.KEY_VERSION"]}\n`;

  //Use the crypto library to sign the key.
  const sign = crypto.createSign("SHA256");
  sign.write(sortedHashString);
  sign.end();

  //Get the signature and convert the returned buffer of bytes to a base 64 string representation
  const signature = sign.sign({
    key: privateKey,
    passphrase: process.env.WALMART_PRIVATE_KEY_PHRASE,
  });
  const signature_enc = signature.toString("base64");

  return {
    "WM_SEC.AUTH_SIGNATURE": signature_enc,
    "WM_CONSUMER.INTIMESTAMP": hashList["WM_CONSUMER.INTIMESTAMP"],
    "WM_CONSUMER.ID": hashList["WM_CONSUMER.ID"],
    "WM_SEC.KEY_VERSION": hashList["WM_SEC.KEY_VERSION"],
  };
}

/*   Helper function to be called in the item route   */
async function getWalmartProductById(productId) {
  const options = {
    method: "GET",
    headers: generateWalmartHeaders(),
  };
  const res = await fetch(
    `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items/${productId}`,
    options
  );

  return await res.json();
}

module.exports = { getWalmartProductById };
