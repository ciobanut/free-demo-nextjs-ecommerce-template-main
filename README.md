# Behavora Demo Site

Demo site for testing [Behavora](https://behavora.com) — a customer journey tracking and prediction widget.

Built on the NextMerce Next.js e-commerce template.

## Configuration

Behavora environment settings (API URLs, site IDs, WebSocket keys) are configured via environment variables.

### Setup

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

The `.env` file is gitignored and never committed. Available variables are documented in [`.env.example`](.env.example).

| Variable | Description |
|---|---|
| `DEMO_BEHAVORA_DEV_*` | Dev environment (API, script, site ID, WS) |
| `DEMO_BEHAVORA_PROD_*` | Production environment (API, script, site ID) |
| `DEMO_BEHAVORA_LOCAL_*` | Local development overrides |

The values are read in `src/config/environments.ts` via `process.env.DEMO_*`, with hardcoded fallbacks so the app works even without a `.env` file. Next.js replaces these at build time.

### Switching environments

Visit `/env` in the browser to switch between Dev, Prod, and Local environments. The page reloads with the selected environment's widget script.

- **Local** is only visible when running on `localhost`.
- The Local environment has a form to override site ID, API URL, script URL, and WebSocket settings. Changes are saved to `localStorage` and persist across reloads.

### Adding a new environment

Add an entry to `ENVIRONMENTS` in `src/config/environments.ts` and update the `Environment` type. Then add the corresponding `DEMO_BEHAVORA_*` variables to `.env` and `.env.example`.

## Local development

```bash
npm install
npm run dev
```

The site runs on `http://localhost:3000`.

### Connecting to a local backend

1. Set the environment to **Local** at `/env`.
2. Fill in your local API URL and site ID in the form.
3. Save — the page reloads with your local config.

The default local config expects:
- A backend API at `http://localhost:8082`
- The widget client at `http://localhost:5173` (Vite dev server for [journey-predictor-client](https://github.com/zordecmax/journey-predictor-client))
- A WebSocket server at `ws://localhost:8080` (for real-time prediction updates)
