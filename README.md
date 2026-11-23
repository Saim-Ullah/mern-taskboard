# MERN Taskboard

A small full-stack task manager with React, Node.js, Express and MongoDB. Add tasks, move them through three statuses, and delete them. Tasks persist in MongoDB; the UI and API validate input. This is a learning project, not a production service: **there is no authentication, authorization or multi-user isolation**. Do not expose it publicly or use sensitive data.

## Run locally

Requires Node.js 18+ (20 recommended), npm, and a running MongoDB instance. Open a terminal in this folder:

```sh
npm install
npm test
npm run dev
```

Open the Vite URL shown in the terminal (usually http://localhost:5173). The API listens on port 3001. By default it connects to `mongodb://127.0.0.1:27017/mern_taskboard`. To use a different database, set `MONGODB_URI` in your terminal before `npm run dev`; keep credentials private and never commit them. The dev server proxies `/api` to port 3001. `npm run build` checks the frontend production build; serving the built app in production requires separate hosting/proxy setup.

API: `GET /api/tasks`, `POST /api/tasks` with `{"title":"..."}`, `PATCH /api/tasks/:id` with `title` and/or `status` (`todo`, `doing`, `done`), and `DELETE /api/tasks/:id`. List returns the 200 newest tasks. Automated tests cover shared server validation; integration tests require MongoDB and are not included.
