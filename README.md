# Synapse Platform — Organizational Intelligence V2

Synapse connects people, projects, and knowledge across your organization. Built with React, TypeScript, D3.js, and Tailwind CSS.

## Features

- **Knowledge Graph** — Interactive visualization of organizational knowledge with D3.js force simulation, shortest path finding, filtering, and PNG export
- **AI Assistant** — Natural language answers with source attribution, conversation history, export to PDF
- **Executive Dashboard** — KPI monitoring, date range filtering, PDF report download, department drill-down
- **People Intelligence** — Employee profiles, skill gap analysis, knowledge transfer requests
- **Project Archive** — Searchable project database with lessons learned and decisions tracking
- **Knowledge Health Feed** — Live activity stream with real-time events (8s interval), categorized filtering
- **Global Command Center** — Cmd+K search overlay with keyboard navigation and recent searches
- **Onboarding Flow** — 5-step guided tour with completion animation, skip option, localStorage persistence
- **Dark/Light Mode** — Smooth 300ms transition, persisted preference
- **Chrome Extension** — Planned browser extension for quick capture

## Tech Stack

- React 19 + TypeScript 6
- Vite 8 + PostCSS + Tailwind CSS 3
- D3.js 7 (force-directed graph)
- React Router v7
- Recharts (charts)
- jsPDF + jspdf-autotable (PDF export)
- html2canvas (PNG export)
- Lucide React (icons)

## Setup

```bash
npm install
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

## Deploy

Pushed to GitHub triggers auto-deploy to Vercel.

Live: https://synapse-platform.vercel.app