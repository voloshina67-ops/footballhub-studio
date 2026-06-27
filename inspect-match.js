const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    'https://www.flashscore.ua/match/soccer/france-QkGeVG1n/senegal-hOIsJLJr/?mid=ALxYcMw2',
    {
      waitUntil: 'networkidle',
      timeout: 60000
    }
  );

  await page.screenshot({
    path: 'match.png',
    fullPage: false
  });

  const text = await page.locator('body').innerText();

  console.log(text.substring(0,3000));

  await browser.close();
})();
