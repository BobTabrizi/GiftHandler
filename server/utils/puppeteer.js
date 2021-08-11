const puppeteer = require("puppeteer");

async function openPage(Link) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(Link);
  return { page, browser };
}

module.exports = { openPage };
