# Personal Website

This Repository contains the code for my Personal website — an interactive macOS-style desktop you can explore in the browser.

## You can see the website [here](https://www.arya-nair.in/)

## Features

- 🖥️ **macOS desktop experience** — draggable, zoomable, minimizable windows inside a laptop frame, with an iPhone-style frame on mobile
- 🍎 **Authentic boot screen** — Apple-style boot with progress bar, played once per session (Apple menu → Restart to replay)
- ⌨️ **Interactive Terminal** — a real shell in the dock: `help`, `neofetch`, `projects`, `experience`, `open github`, tab completion, command history, and a few easter eggs
- 🔍 **Command Centre (⌘K)** — Spotlight-style search across apps, projects, and quick links with full keyboard navigation
- 🚀 **Dock magnification** — proximity-based icon magnification with running-app indicator dots
- 📌 **Minimize to dock** — windows shrink into the dock and restore from it, just like the real thing
- 📝 Apps for About, Projects (VS Code-style), Experience (Finder-style), and Notes (with live GitHub/LeetCode/Wakatime stats)
- 📱 Fully responsive, installable as a PWA, deep-linkable windows via URLs

## Development

This project has been migrated from Create React App to Vite for better performance and modern tooling.

### Available Scripts

#### Development

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run deploy` - Deploy to GitHub Pages

#### Code Quality

- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted
- `npm run format:src` - Format only source files
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues automatically
- `npm run type-check` - Run TypeScript compiler to check types

### Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Tech Stack

- React 18
- TypeScript
- Vite
- Framer Motion
- CSS Modules

### Code Quality & Formatting

This project uses several tools to maintain code quality:

#### Prettier

- **Configuration**: `.prettierrc.cjs`
- **Purpose**: Automatic code formatting
- **Usage**: Run `npm run format` to format all files
- **CI**: Automatically checked in GitHub Actions

#### ESLint

- **Configuration**: `.eslintrc.cjs`
- **Purpose**: Code linting and error detection
- **Usage**: Run `npm run lint` to check for issues
- **CI**: Automatically checked in GitHub Actions

#### TypeScript

- **Configuration**: `tsconfig.json`
- **Purpose**: Type checking and safety
- **Usage**: Run `npm run type-check` to validate types
- **CI**: Automatically checked in GitHub Actions

#### GitHub Actions

- **File**: `.github/workflows/ci.yml` - Main CI pipeline
- **File**: `.github/workflows/prettier.yml` - Dedicated Prettier checks
- **Triggers**: On push to main/develop branches and PRs
- **Checks**: Type checking, Prettier formatting, ESLint, and build verification
