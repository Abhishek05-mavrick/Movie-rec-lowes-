# Movie Discovery App

A React and Vite movie discovery application foundation. The current version
uses a local movie dataset and provides the routing, shared UI shell, styling,
and storage utilities that future feature work can build on.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## TMDB integration

The app automatically preloads TMDB movie rails and can search TMDB dynamically.
The home page includes trending, top-rated, highest-grossing, drama, and
thriller shelves plus an auto-rotating featured board. Search fetches multiple
TMDB result pages in the background rather than requiring a load button. Create a local
`.env.local` file from `.env.example` and add either a TMDB read access token
or an API key:

```bash
VITE_TMDB_READ_ACCESS_TOKEN=your_read_access_token
VITE_TMDB_API_KEY=your_api_key
```

Never commit `.env.local` or expose credentials in source code. Vite variables
are available in the browser, so use a restricted TMDB credential and rotate
any credential that has been exposed publicly. Without credentials, the app
continues to work with the bundled local movie data.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Discover locally stored movies |
| `/movie/:movieId` | View a movie details page |
| `/watchlist` | Watchlist placeholder |
| `/favorites` | Favorites placeholder |
| `/login` | Login placeholder |

## Project structure

```text
src/
├── components/   # Shared UI components and feature placeholders
├── data/         # Local movie data
├── pages/        # Route-level page components
├── utils/        # Browser persistence helpers
├── context/      # Reserved for shared React context
├── styles/       # Global application styles
├── App.jsx       # Application routes and layout
└── main.jsx      # React entry point
```

Vite uses the root `index.html` as its application entry point. The
`public/index.html` file is retained to match the requested project layout.

## Movie data contract

Movies are exported from `src/data/movies.js`. Every movie currently has:

```js
{
  id: 1,
  title: 'Movie title',
  genre: 'Action',
  rating: 8.7,
  year: 2024,
  poster: 'https://image.example/poster.jpg',
  description: 'A short movie description.'
}
```

Supported genres are `Action`, `Comedy`, `Drama`, `Sci-Fi`, `Horror`, and
`Romance`.

## Local storage

`src/utils/storage.js` contains JSON-safe helpers for watchlist and favorite
movie IDs. The utilities are intentionally independent of React so they can be
used by future context providers or page components.

## Handoff notes

- **Developer 2 - Movie browsing:** `MovieCard.jsx`, `MovieList.jsx`,
  `SearchBar.jsx`, and `GenreFilter.jsx` are placeholders. Add search,
  filtering, and reusable movie rendering while preserving the movie data
  contract.
- **Developer 3 - Watchlist, favorites, and details:** Connect the placeholder
  pages and movie actions to the IDs in `movies.js` and the helpers in
  `storage.js`.
- **Developer 4 - Shared context and authentication:** Add providers under
  `src/context/`. Keep storage behavior in `storage.js` so context remains
  easy to test and reuse.
