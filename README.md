# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Project log

See [BITACORA.md](./BITACORA.md) for the project change history, AI usage record, and commands to run, validate, configure Supabase, and publish the site.

## Supabase setup

The Supabase CLI is initialized in `supabase/`, and the Supabase JavaScript client is installed.

1. Copy `.env.example` to `.env.local`.
2. In the Supabase dashboard, copy the project's URL and anon/publishable key into `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Import `supabase` from `src/lib/supabase.js` wherever the app needs Supabase.
4. To connect the CLI to the project, authenticate with `supabase login`, then run `supabase link --project-ref <PROJECT_REF>`.
5. Apply database changes with `supabase db push --linked`.

The reservation form writes to `public.expedition_reservations`. Its migration enables row-level security and grants browser clients permission to submit requests only; it does not grant permission to read, update, or delete them. The frontend uses only the public anon/publishable key. Never use a `service_role` key in the frontend.

GitHub Pages serves the `main` branch's `docs/` directory. The `.gitignore` explicitly tracks the PNG/JPG source images in `.Mockups/` that the site imports, so a fresh clone has the logo and route images required to build. To publish frontend changes, run `npm.cmd run build:pages`. This builds the app, syncs `dist/` to `docs/`, and checks that every asset referenced by the built HTML exists both before and after syncing. The public Supabase URL and anon/publishable key are included in the browser bundle so the form can connect to the API.

Keep `.env.local` private. Never put a Supabase `service_role` key in frontend code. Enable Row Level Security and appropriate policies for any tables accessed by the browser.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
