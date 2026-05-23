# dir-diare: A Digital Diary

<img width="1887" height="928" alt="image" src="https://github.com/user-attachments/assets/3b65ea2e-be39-4aaf-b3a4-12ad4b43ba0a" />

> "Notes on building things, reading things, and the slow accumulation of days."

Welcome to **dir-diare**, a personal corner of the internet that blends a directory structure with the intimacy of a diary. It's a mental dump folder for code, art, music, and thoughts—raw, weird, and built with a unique retro-tech CLI aesthetic.

## Name Origin

The name is a play on **"directory"** and **"diary"**. In programming, a directory (or `dir`) is where we store files; here, it's where I store thoughts, rants, and experiments. 

## Aesthetic & Design

The project features a "warm worn-notebook" palette and a terminal-inspired interface:
- **Typography**: Courier Prime (body/code) for that typewriter feel, paired with Playfair Display (headings) for a touch of elegance.
- **Color Palette**: Dark, warm tones (`#14120f` background) with high-contrast but muted text scales.
- **UI Components**: Custom `uk*`-prefixed components that mimic CLI elements and terminal windows.

## Key Features

-   **Journal (`/w`)**: A space for articles, tutorials, and long-form thoughts on technology and life.
-   **Art Showcase (`/l`)**: A gallery for digital art and creative projects with high-quality rendering.
-   **NoteQ (`/n`)**: A collection of quick quotes, snippets, and interesting findings.
-   **Music Integration (`/m`)**: Real-time Spotify integration showing current or recently played tracks.
-   **Admin Dashboard (`/x`)**: A secure, password-protected panel for full CRUD operations of all content types.
-   **Community Interaction**: GitHub-powered comments (Giscus) integrated into journal posts.

## Tech Stack

Built for performance and a modern developer experience:

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, ISR, Server Components)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Modern, ultra-fast CSS framework)
-   **Database**: [MongoDB](https://www.mongodb.com/) (GridFS for large assets, server-side data fetching)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (GitHub OAuth with restricted access)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth "reveal" transitions and interactive elements)
-   **Typography**: Google Fonts (Courier Prime, Playfair Display)
-   **Deployment**: [Vercel](https://vercel.com) (with Analytics and Speed Insights)

## Getting Started

### Prerequisites

-   **Node.js**: 20.x or higher
-   **MongoDB**: Local or Atlas instance
-   **GitHub App**: For authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dir-diare.git

# Navigate to the directory
cd dir-diare

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Setup

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Optional integrations
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

## Development & Workflow

This project follows a structured branch and release workflow:

-   **`main`**: Production-ready code only.
-   **`dev`**: Integration branch for new features and fixes.
-   **`feat/*`**: Feature branches (from `dev`).
-   **`fix/*`**: Bug fix branches (from `dev`).

### Release Cycle

Merges from `dev` to `main` trigger a new release. We use semantic versioning (`vMAJOR.MINOR.PATCH`) for tagging releases.

## License

1.  You are free to use this code as inspiration.
2.  Please do not copy it directly.
3.  Crediting the author is appreciated.
