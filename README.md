# GymOrbit

Gym management software for administrators, staff, trainers, and members.

## Phase 1

This foundation includes a pnpm/Turborepo workspace, a Next.js dashboard shell, PostgreSQL/Prisma schema and demo seed, and server-side role helpers.

### Quick start

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL: `docker compose up -d postgres`.
3. Install dependencies: `pnpm install`.
4. Create the database: `pnpm db:migrate && pnpm db:seed`.
5. Start the app: `pnpm dev`.

Open `http://localhost:3000`. The seed creates `owner@gymorbit.test` with password `ChangeMe123!` for local development only.

### Expo test client

The web dashboard remains the primary interface. The Expo companion in `apps/mobile` is a mobile test client for front-desk/device flows. Run `pnpm --filter @gymorbit/mobile dev`, then open it with Expo Go or an emulator.

## Commands

- `pnpm lint` — lint all workspaces
- `pnpm typecheck` — type-check all workspaces
- `pnpm test` — run unit tests
- `pnpm build` — production build

Money is persisted as integer minor units. Dates are stored in UTC.
