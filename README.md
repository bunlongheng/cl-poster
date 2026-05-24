# CL Poster

Craigslist post manager with weekly rotation, Playwright auto-posting, and CLI tools.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4) ![SQLite](https://img.shields.io/badge/SQLite-local-green)

## Features

- 100 post templates with 10/week auto-rotation
- One-click copy to clipboard
- Playwright CLI for semi-automated CL posting
- 48-hour cooldown enforcement per category
- Title/description rotation to avoid duplicate detection
- Post history tracking

## Setup

```bash
npm install
npx playwright install chromium
npm run dev
```

## CLI

```bash
npx ts-node cli/post.ts list        # List templates
npx ts-node cli/post.ts post 1      # Post template #1 via Playwright
npx ts-node cli/post.ts rotate 10   # Generate 10 title variations
npx ts-node cli/post.ts status      # Show posting history
npx ts-node cli/post.ts cooldown    # Check 48hr cooldowns
```

## URLs

| Env | URL |
|-----|-----|
| Local | http://localhost:3009 |
| Caddy | http://cl-poster.localhost |

## Conventions

- `feat:` new feature
- `fix:` bug fix
- `chore:` maintenance (skips Vercel deploy)
- `docs:` documentation
- `refactor:` code restructuring
