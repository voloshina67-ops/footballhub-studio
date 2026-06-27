const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const teamName = process.argv[2];

if (!teamName) {
  console.log('Usage: node scripts/import-team.js "Real Madrid"');
  process.exit(1);
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function download(url, filePath) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(
    `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${encodeURIComponent(teamName)}`,
    {
      waitUntil: "networkidle",
      timeout: 60000,
    }
  );

  const firstTeam = await page
    .locator('a[href*="/startseite/verein/"]')
    .first()
    .getAttribute("href");

  if (!firstTeam) {
    throw new Error("Team not found");
  }

  const teamUrl =
    "https://www.transfermarkt.com" +
    firstTeam;

  console.log("TEAM:", teamUrl);

  await page.goto(teamUrl, {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  const logo = await page.evaluate(() => {
    const img = [...document.images].find(
      (i) =>
        i.alt &&
        i.alt !== "Transfermarkt" &&
        i.src.includes("/images/wappen/head/")
    );

    return img?.src || "";
  });

  const players = await page
    .locator("table.items tbody tr")
    .evaluateAll((rows) => {
      const seen = new Set();

      return rows
        .map((row) => {
          const link =
            row.querySelector(
              'td.posrela a'
            );

          const img =
            row.querySelector("img");

          const name =
            link?.textContent?.trim() || "";

          const photo =
            img?.getAttribute("data-src") ||
            img?.getAttribute("data-srcset") ||
            img?.getAttribute("srcset") ||
            img?.src ||
            "";

          const position = row.innerText.split("\n").map(v => v.trim()).filter(Boolean)[2] || "";

          return {
            name,
            position,
            photo,
          };
        })
        .filter((p) => {
          if (!p.name) return false;

          if (seen.has(p.name))
            return false;

          seen.add(p.name);

          return true;
        });
    });

  const teamSlug = slugify(teamName);

  fs.mkdirSync(
    "public/cache/logos",
    { recursive: true }
  );

  if (logo) {
    await download(
      logo,
      `public/cache/logos/${teamSlug}.png`
    );
  }

  const teamJson = {
    name: teamName,
    logo: `/cache/logos/${teamSlug}.png`,
    players: players.map(
      (player, index) => ({
        id: index + 1,
        name: player.name,
        position: player.position,
        position: player.position,
        photo: player.photo,
      })
    ),
  };

  fs.writeFileSync(
    `data/teams/${teamSlug}.json`,
    JSON.stringify(
      teamJson,
      null,
      2
    )
  );

  console.log(
    "PLAYERS:",
    players.length
  );

  console.log(
    "SAVED:",
    `data/teams/${teamSlug}.json`
  );

  await browser.close();
})();
