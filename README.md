# Behavora Demo Site

Demo site for testing [Behavora](https://behavora.com) — a customer journey tracking and prediction widget.

Built on the NextMerce Next.js e-commerce template.

## Configuration

Environment variables for the Behavora widget are in `src/config/environments.ts`:

```ts
export const ENVIRONMENTS = {
  dev: {
    apiBaseUrl: 'https://dev.behavora.com',
    scriptSrc: 'https://dev-cdn.behavora.com/widget/loader.js',
    siteId: 'site_XsWxm9OtWH',
  },
  prod: {
    apiBaseUrl: 'https://app.behavora.com',
    scriptSrc: 'https://cdn.behavora.com/widget/loader.js',
    siteId: 'site_K4J8jmqoyK',
  },
  local: {
    apiBaseUrl: 'http://localhost:8082',
    scriptSrc: 'http://localhost:5173/dist/journey-predictor-widget.umd.js',
    siteId: 'site_O2TVKawgo8',
    wsKey: 'appkey',
    wsHost: 'localhost',
    wsPort: '8080',
  },
};
```

### Updating config

- **Site ID** or **API URL** changed? Update the values in the appropriate environment block above.
- The widget script tag (`<Script>`) is rendered in `src/app/(site)/layout.tsx` using the active environment's config.
- To add a new environment, add an entry to `ENVIRONMENTS` and update the `Environment` type.

### Switching environments

Visit `/env` in the browser to switch between Dev, Prod, and Local environments. The page reloads with the selected environment's widget script.

- **Local** is only visible when running on `localhost`.
- The Local environment has a form to override site ID, API URL, script URL, and WebSocket settings. Changes are saved to `localStorage` and persist across reloads.

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
