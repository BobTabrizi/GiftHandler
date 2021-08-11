const axios = require("axios");
async function getTargetItem(page) {
  let ItemDetails = {
    ItemPrice: 0,
    ItemName: "",
    ItemImage: "",
  };
  //Scrape item data with three page selectors
  const PriceSelector = await page.waitForSelector(".elGGzp");
  const ImageSelector = await page.waitForSelector(
    ".eKyPHV .slide--active img"
  );
  const NameSelector = await page.waitForSelector(".dkHWUj");
  ItemDetails.ItemPrice = await PriceSelector.evaluate((el) => el.textContent);
  ItemDetails.ItemName = await NameSelector.evaluate((el) => el.textContent);
  ItemDetails.ItemImage = await ImageSelector.evaluate((el) =>
    el.getAttribute("src")
  );

  return ItemDetails;
}

async function getEtsyItem(page) {
  let ItemDetails = {
    ItemPrice: 0,
    ItemName: "",
    ItemImage: "",
  };
  const IDSelector = await page.waitForSelector(
    ".listing-page-image-carousel-component"
  );

  //Get the shop and listing ids to make api call
  let ShopID = await IDSelector.evaluate((el) =>
    el.getAttribute("data-shop-id")
  );
  let ListingID = await IDSelector.evaluate((el) =>
    el.getAttribute("data-palette-listing-id")
  );

  axios.defaults.headers.common = {
    "X-API-Key": `${process.env.ETSY_KEYSTRING}`,
  };

  //Get the data and image for the item
  let EtsyResponse = await axios
    .get(`https://openapi.etsy.com/v3/application/listings/${ListingID}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  let EtsyImage = await axios
    .get(
      `https://openapi.etsy.com/v3/application/shops/${ShopID}/listings/${ListingID}/images`
    )
    .then((res) => {
      return res.data.results[0].url_fullxfull;
    })
    .catch((err) => console.log(err));

  ItemDetails.ItemPrice =
    "$" + EtsyResponse.price.amount / EtsyResponse.price.divisor;
  ItemDetails.ItemName = EtsyResponse.title;
  ItemDetails.ItemImage = EtsyImage;

  return ItemDetails;
}

async function getAmazonItem(page) {
  let ItemDetails = {
    ItemPrice: 0,
    ItemName: "",
    ItemImage: "",
  };
  //Scrape the price of the item
  ItemDetails.ItemPrice = await page.evaluate(() => {
    try {
      return document
        .getElementById("price_inside_buybox")
        .innerHTML.replace(/\n/g, "");
    } catch (error) {
      console.log(error);
    }
    try {
      return document.getElementById("price").innerHTML.replace(/\n/g, "");
    } catch (error) {
      console.log(error);
    }
  });

  //Then scrape the name of the item
  ItemDetails.ItemName = await page.evaluate(() => {
    try {
      return document
        .getElementById("productTitle")
        .innerHTML.replace(/\n/g, "");
    } catch (error) {
      console.log(error);
    }
  });

  //Then lastly scrape the url image of the item
  ItemDetails.ItemImage = await page.evaluate(() => {
    try {
      return document.getElementById("imgBlkFront").getAttribute("src");
    } catch (error) {
      console.log(error);
    }
    try {
      return document.querySelector(".selected img[src]").getAttribute("src");
    } catch (error) {
      console.log(error);
    }
  });

  return ItemDetails;
}

module.exports = { getTargetItem, getEtsyItem, getAmazonItem };
