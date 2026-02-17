# PennyTrail

A personal finance tracker for recording income and expenses, categorizing transactions, and visualizing spending patterns.

**[Live Demo](https://jfkeci.github.io/penny-trail/)**

![Dashboard](docs/screenshots/04-dashboard-with-data-light.png)

## Features

- **Transaction management** — add, edit, and delete income/expense entries with form validation
- **Charts** — expense breakdown (donut), income vs expenses (bar), and balance trend (line)
- **Filtering** — search by note, filter by type, category (multi-select), and date range
- **Dark mode** — light, dark, and system theme toggle
- **Multi-currency** — USD, EUR, GBP, JPY, INR with locale-aware formatting
- **CSV export** — download all transactions as a CSV file
- **Persistent** — all data stored in localStorage, survives page reloads
- **Responsive** — works on mobile and desktop

<details>
<summary>Dark mode</summary>

![Dark mode](docs/screenshots/09-dashboard-dark-mode.png)
</details>

<details>
<summary>Mobile view</summary>

![Mobile](docs/screenshots/12-mobile-view.png)
</details>

## Tech Stack

| | |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| Zustand + Immer | State management |
| Zod | Validation |
| Recharts | Charts |
| date-fns | Date utilities |
| Lucide React | Icons |

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/penny-trail/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Deployment

Deploys automatically to GitHub Pages on push to `main` via the workflow in `.github/workflows/deploy.yml`.

To enable: go to **Settings > Pages** and set source to **GitHub Actions**.
