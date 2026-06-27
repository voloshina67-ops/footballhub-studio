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

  const html = await page.content();

  require('fs').writeFileSync(
    'flashscore.html',
    html
  );

  console.log('saved');

  await browser.close();
})();
