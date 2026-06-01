# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commit Rules

- **Never** add `Co-Authored-By:` trailer for AI tools (Claude or any AI) in commit messages
- Subject line ≤50 chars, Conventional Commits format
- Body only when "why" isn't obvious from the diff

## Branch Workflow

### Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Production. Always deployable. Receives merges from `dev` only. |
| `dev` | Integration. Accumulates features before a release. |
| `feat/<name>` | New features. Branch from `dev`, PR back to `dev`. |
| `fix/<name>` | Bug fixes. Branch from `dev`. For prod hotfixes, branch from `main`. |
| `release/vX.Y.Z` | Optional short-lived branch for release prep (changelog, version bump). |

### Flow

```
feat/<name>  ─┐
fix/<name>   ─┤─→  dev  →  main  (tagged vX.Y.Z)
              ┘
```

### Rules

- **No direct commits** to `main` or `dev` — always via PR/merge.
- `feat/*` and `fix/*` branch from `dev`.
- Hotfixes that can't wait for `dev` cycle: branch from `main`, merge to both `main` and `dev`.
- Existing `X.Y.x` branches are for backporting critical fixes to old releases only.

### Releases

- Merge `dev → main` when ready to ship.
- Tag `main` immediately after merge: `git tag vMAJOR.MINOR.PATCH`.
- Semver rules:
  - **PATCH** (`vX.Y.Z`): bug fixes, deps, perf
  - **MINOR** (`vX.Y.0`): new features, non-breaking changes
  - **MAJOR** (`vX.0.0`): breaking changes, major redesigns
- Push tag: `git push origin vX.Y.Z`

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
```

No lint or test scripts configured.

**Prettier** (configured in `package.json`): 4-space tabs, no semicolons, single quotes, trailing commas (ES5 style).

## Architecture

Personal digital diary/blog built on **Next.js 16 App Router** with **MongoDB** as the sole data store. Content (posts, art) is stored as MDX strings in MongoDB and rendered server-side with `next-mdx-remote/rsc`.

### Route Groups

Two Next.js route groups in `src/app/`:

- `(public)/` — public-facing site. Pages: `/` (home), `/w` (writing/journal), `/w/[slug]` (post), `/w/tags/[tag]`, `/l` (art), `/l/[slug]` (art post), `/m` (music/Spotify), `/n` (noteQ quotes), `/g` (gallery/Unsplash photos), `/about`
- `(admin)/x/` — password-protected admin panel for CRUD of all content types. Uses NextAuth session check. Routes: `/x/posts`, `/x/artposts`, `/x/tags`, `/x/noteqs`

### Data Layer

`src/lib/db-helpers.ts` provides generic MongoDB CRUD (`getAllDocuments`, `getDocumentByField`, `createDocument`, `updateDocumentByField`, `deleteDocumentByField`). All content-type libs (`posts.ts`, `artpost.ts`, `tags.ts`, `noteq.ts`) wrap these helpers.

MongoDB database: `dirmain`. Collections:

| Collection | Content type |
|------------|--------------|
| `dirpost`  | Writing/journal posts (`Post`) |
| `dirart`   | Art posts (`ArtPost`) |
| `dirtags`  | Tags (`Tag`) |
| `dirnote`  | NoteQ quotes (`noteQ`) |

`_id` is always serialized to string via `documentToObject<T>()`.

### Authentication

NextAuth v4 with GitHub OAuth. A single hardcoded authorized user (`AUTHORIZED_USER = 'qyzh'` in `src/lib/constants.ts`) is checked by GitHub login in the `signIn` callback. All other users are redirected to `/unauthorized`. Admin API routes must call `getServerSession(authOptions)` and return 401/403 for non-authed requests.

### Content Rendering

`src/components/post-renderer.tsx` handles both `type="writing"` and `type="art"`. It renders MDX via `MDXRemote` from `next-mdx-remote/rsc`. Custom MDX components are defined in `mdx-components.tsx` at root.

Post detail pages use ISR (`revalidate = 3600`) with `generateStaticParams` for known slugs and `dynamicParams = true` for new ones.

### External Integrations

- **Spotify** (`src/lib/spotify.ts`): refresh-token flow; `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` env vars
- **Strava**: API route at `/api/strava`
- **Giscus**: GitHub-powered comments on posts (`src/components/comments.tsx`)
- **Vercel Analytics + Speed Insights**: injected in root layout

### UI Components

Custom `uk*`-prefixed components live in `src/components/ui/` (e.g., `ukbadge`, `ukbtn`, `ukcli`, `ukdrawer`). These follow the CLI/terminal aesthetic of the site.

### Environment Variables

Required in `.env.local`:

```
MONGODB_URI
GITHUB_ID
GITHUB_SECRET
NEXTAUTH_SECRET
NEXTAUTH_URL
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
UNSPLASH_ACCESS_KEY
UNSPLASH_USERNAME
```

## Design System

### Typography

| Role | Font | CSS Variable | Fallback |
|------|------|-------------|---------|
| Body / code | Courier Prime | `--font-courier-prime` | Courier New, monospace |
| Headings (h1–h4) | Playfair Display | `--font-playfair` | Georgia, serif |
| Code blocks | SFMono-Regular | — | Consolas, Menlo, monospace |

Fonts loaded via `next/font/google` in `src/app/layout.tsx`.
Theme: warm CLI/terminal diary aesthetic — monospace body, serif display.

### Color Palette

Warm worn-notebook palette. All defined as CSS variables in `src/app/global.css`.

**Base (dark background)**

| Variable | Hex | Usage |
|----------|-----|-------|
| `--bg` | `#14120f` | Page background |
| `--bg-card` | `#1a1713` | Card / panel backgrounds |
| `--bg-hover` | `#201e19` | Hover state |
| `--line` | `#2e2b25` | Borders & dividers |

**Text Scale**

| Variable | Hex | Usage |
|----------|-----|-------|
| `--text-muted` | `#4a4540` | Disabled / placeholder |
| `--text-dim` | `#7a7268` | Secondary labels |
| `--text-mid` | `#a89f94` | Supporting text |
| `--text-main` | `#d6cfc5` | Body text |
| `--text-bright` | `#ede8e0` | Headings / emphasis |

**Article / Journal Theme**

| Variable | Hex | Usage |
|----------|-----|-------|
| `--article-paper` | `#14100c` | Article background |
| `--article-ink` | `#ddd4c9` | Article body text |
| `--article-ink-soft` | `#b0a598` | Soft text |
| `--article-ink-muted` | `#7a6e65` | Muted text |
| `--article-line` | `#2c261f` | Dividers |
| `--article-accent` | `#c4aa7e` | Gold accent |

**Syntax Highlighting (light / dark)**

| Token | Light | Dark |
|-------|-------|------|
| class | `#6c63ff` | `#c77dff` |
| string | `#ff8c42` | `#f4d35e` |
| keyword | `#0077b6` | `#5bc0be` |
| comment | `#8d99ae` | `#7a869a` |
| property | `#00bfa6` | `#00c9a7` |

**Selection highlight:** bg `#47a3f3`, text `#fefefe`

### Theme

- Provider: `next-themes`, class-based, default `light`, no system theme
- Storage key: `dir-diare-theme`
- Tailwind v4 — no custom config, uses built-in neutral palette
