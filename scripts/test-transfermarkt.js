const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    'https://www.transfermarkt.com',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  console.log(
    'TITLE:',
    await page.title()
  );

  await browser.close();
})();
