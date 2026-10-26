# SamChamp MVP — Frontend

Mobile-first web app where players sign up, log in and set up their profile
(team avatar, gaming platform and gamer tag). It talks to the SamChamp backend
over a REST API.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Redux Toolkit
· Tailwind CSS 3 · axios

## Getting started

Requires **Node.js 18.18+** (20+ recommended) and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root (it is git-ignored):

   ```bash
   NEXT_PUBLIC_API_URL=https://sampchamp.apachish.ir/
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<Google OAuth client ID — ask the team>
   ```

   Keep the trailing slash on the API URL. Env files are only read at startup,
   so restart the dev server after changing them.

3. Start the dev server and open <http://localhost:3000>:

   ```bash
   npm run dev
   ```

## Scripts

| Command                  | What it does                                  |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Development server with hot reload            |
| `npm run build`          | Production build (also type-checks and lints) |
| `npm start`              | Serves the production build                   |
| `npm run lint`           | ESLint                                        |
| `npx tsc --noEmit`       | Type check only                               |
| `npx prettier --write .` | Format all files and sort imports             |

Before committing, `npm run build` should pass with no warnings.

## Project structure

```
app/                    Routes (App Router) and app-wide setup
  auth/                 Login, register, new password (+ social login buttons)
  profile/edit-account/ Profile form, avatar picker, platform picker
  constants/            APP_ROUTES (pages) and API_ROUTES (backend endpoints)
  layout.tsx            Fonts, providers, splash screen
  globals.css           Global styles (base text colour, h1, inputs, checkboxes)
components/             Shared UI: form inputs, button, splash screen
lib/                    API client, error helpers, auth-token cookie
store/                  Redux store, typed hooks, slices (auth, profile)
types/                  API request/response types
utils/                  Form validation
middleware.ts           Route protection
```

## How it works

**Sessions.** Logging in stores the access token in the `authToken` cookie
(`lib/auth-token.ts`). `middleware.ts` uses that cookie to route users before a
page renders: `/profile/*` requires it, `/auth/*` is only for logged-out users,
and `/` sends each user to the right place. If the backend answers a request
that carried a token with `401`, the token is cleared and the user is sent to
login.

**API calls.** Always go through `api` from `lib/api.ts`. It adds the base URL
and the `Authorization` header. Endpoints live in `app/constants/apiRoutes.ts`.
Failed requests are turned into a plain `ApiError` (`{ message, fieldErrors }`)
with `toApiError`; forms split it into per-field messages with `getFormErrors`.

**State.** Redux Toolkit. Create request actions with `createAppAsyncThunk`
(`store/createAppAsyncThunk.ts`) so every slice gets the same
`loading` / `error` handling, and read or dispatch with `useAppSelector` /
`useAppDispatch` from `store/hooks.ts`. `logout()` clears the session and
resets all slices.

**Forms.** `FormInput` is controlled (`value` + `onChange`). Client-side checks
live in `utils/validation.ts`; server errors are shown under the matching field,
or above the submit button when they don't belong to a field.

**Navigation.** Link to pages with `APP_ROUTES` instead of hard-coded paths.

## Design

The UI follows the SamChamp design system. Use the colour tokens in
`tailwind.config.ts` and the existing components rather than adding new styles.
Text uses **Rubik** app-wide, with Roboto only where the design calls for it.

## Not built yet

These are waiting on backend endpoints:

- **Social login** — the Google button does not complete a login yet; Apple and
  Facebook are not wired up.
- **Edit account** — the form isn't pre-filled with the saved profile, the ID
  field isn't sent, and Skip does nothing.
- **Forgot password** — the new-password page isn't connected to an endpoint.

Also planned: a logout button (the `logout()` action already exists) and a
landing page at `/` for logged-out visitors.
