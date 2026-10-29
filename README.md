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
   NEXT_PUBLIC_API_URL=https://samchamp.apachish.ir/
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
  (protected)/          Pages for logged-in users; the folder isn't part of the URL
    layout.tsx          Verifies the session with the backend
    home/               Home page (where logged-in users land)
    profile/edit-account/ Profile form, avatar picker, platform picker
  constants/            APP_ROUTES (pages) and API_ROUTES (backend endpoints)
  layout.tsx            Fonts, providers, splash screen
  globals.css           Global styles (base text colour, h1, inputs, checkboxes)
components/ui/          Design-system building blocks: button, page, link, form error
components/form/        Form inputs and shared field styles
components/             Splash screen, session check
lib/                    API client, error helpers, auth-token cookie, cn()
store/                  Redux store, typed hooks, slices (auth, profile)
types/                  API request/response types
utils/                  Form validation
middleware.ts           Route protection
```

## How it works

**Sessions.** Logging in stores the access token in the `authToken` cookie
(`lib/auth-token.ts`). `middleware.ts` uses that cookie to route users before a
page renders: `/home` and `/profile/*` require it, `/auth/*` is only for
logged-out users, and `/` sends each user to home or login. After logging in
users land on `/home`; after registering, on the profile form.

The middleware only knows a token exists, so the `(protected)` layout also asks
the backend (`GET /api/profile`) once per visit whether it's still valid. Any
request that carried a token and gets a `401` clears the token and sends the
user to login. New pages for logged-in users go inside `app/(protected)/` and
their path prefix into `PROTECTED_PREFIXES` in `middleware.ts`.

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

**Club logos.** The backend serves logos slowly and forbids caching, so the app
loads them through its own caching proxy, `/club-logos/...`
(`app/club-logos/[...path]/route.ts`). It fetches each logo from the backend once
(at most 4 at a time), saves it in `.next/cache/club-logos/`, refreshes it in the
background after 24 hours, and lets browsers keep it for a day. Logo URLs are
rewritten to the proxy in `fetchClubs` (`lib/club-logos.ts`). The edit-account
page also preloads all logos so the avatar picker opens with them ready. The
server needs a writable disk for the cache.

## Design

The UI follows the SamChamp design system (Figma). Build screens from the
pieces below instead of writing new colours or copying class lists.

**Colour tokens** (`tailwind.config.ts`) are named by purpose, not by shade:

| Token                                                   | Used for                                    |
| ------------------------------------------------------- | ------------------------------------------- |
| `background`, `foreground`                              | Page background, default text               |
| `surface`                                               | Cards                                       |
| `field`, `field-alt`                                    | Input backgrounds (normal, search)          |
| `subtle`, `muted`                                       | Borders/dividers/quiet text, secondary text |
| `primary`, `primary-hover`, `primary-foreground`        | Main buttons and links                      |
| `secondary`, `secondary-border`, `secondary-foreground` | Alternative buttons, selected tiles         |
| `chip`, `tile`                                          | Pill buttons ("Skip"), icon buttons         |
| `danger`, `success`                                     | Errors, positive values                     |

Also `text-heading` (24px, the `h1` size) and `rounded-card` (2rem).

**Components**

- `components/ui/button.tsx`: every button. `variant`: `primary` (default),
  `secondary`, `chip`, `tile`. Add layout tweaks with `className`.
- `components/ui/page.tsx`: page container with a header (`title`, optional `action`).
- `components/ui/text-link.tsx`, `components/ui/form-error.tsx`.
- `components/form/`: `FormInput`, `BirthdayInput`, and shared field styles in `field.tsx`.
- `app/auth/components/`: `AuthLayout` (illustration + card) and `AuthPrompt`.

Combine classes with `cn()` from `lib/cn.ts`: it skips empty values and lets a
later Tailwind class override an earlier one (e.g. `cn("text-center", "text-right")`).
Prettier sorts Tailwind classes automatically on save.

Text uses **Rubik** app-wide, with Roboto only where the design calls for it.

## Not built yet

These are waiting on backend endpoints or decisions:

- **Social login** — the Google button does not complete a login yet; Apple and
  Facebook are not wired up.
- **Edit account** — the form isn't pre-filled with the saved profile yet (the
  saved club is shown).
- **Forgot password** — the new-password page isn't connected to an endpoint.
- **Home** — only a placeholder; the hide-balance endpoint is already in
  `API_ROUTES.USER.PROFILE.HIDE_BALANCE`.

Also planned: a logout button (the `logout()` action already exists) and a
landing page at `/` for logged-out visitors.
