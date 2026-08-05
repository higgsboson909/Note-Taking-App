# Note Taking App

A small note-taking app built with React, TypeScript, Vite, and Tailwind CSS. Notes and tags are stored in `localStorage`, so your data stays in the browser between sessions.

## Features

- Create, edit, and delete notes
- Add and rename tags
- Filter notes by tag
- Write notes in Markdown and preview formatted output
- Persist notes locally without a backend

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- DaisyUI

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - type-check and build the app
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Storage

The app uses `localStorage` keys for notes and tags. Clearing browser storage will remove saved content.
