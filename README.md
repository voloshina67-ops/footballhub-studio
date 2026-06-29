# FootballHub Studio MVP

FootballHub Studio is a broadcast-style football lineup builder for creating match graphics from imported team data, arranging players on a pitch, and exporting a production-ready PNG.

## Current MVP Features

- Flashscore lineup import by match URL.
- Broadcast match header with team names, logos, and score display.
- 16:9 export frame containing the match header, pitch, and player cards.
- Draggable player cards with photo, name, number, and fallbacks.
- Home and away formation controls for common formations.
- Local project save/load as JSON.
- PNG export at 1920x1080.
- Dark glass broadcast UI for demo presentation.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Zustand
- html-to-image

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

For a production validation build:

```bash
npm run build
```

## Current Stable Commit

`b63d40d` — `Polish MVP demo presentation`

## Known Limitations

- Flashscore import depends on the current external response shape.
- Save/load is local JSON only; there is no backend project library.
- Formation changes reposition existing players but do not infer roles.
- Export is optimized for the current 16:9 MVP frame.
- Sidebar roster data is populated from imports, not from manual edits.

## Next Priorities

- Harden Flashscore parsing and error states.
- Add project metadata and named saves.
- Improve manual player/team editing.
- Add export presets and visual QA across common viewports.
