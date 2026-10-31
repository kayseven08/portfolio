# Kesavan Rangarajan's portfolio

An editable SvelteKit portfolio for Kesavan's software, research, and CircuitRunners robotics
projects. Portfolio content is stored as JSON in CockroachDB and can be updated from `/edit` after
logging in with a CockroachDB-backed editor account.

## CockroachDB setup

1. Create a CockroachDB Serverless cluster and run
   `cockroach/migrations/20261031000000_create_portfolio.sql` with the CockroachDB SQL shell.
2. Generate an editor password hash with `node scripts/hash-password.mjs "your-password"` and
   insert the resulting hash into `portfolio_users`.
3. Copy `.env.example` to `.env` and set `COCKROACH_DATABASE_URL`.

The app reads public content through `/api/data`, while writes require a valid CockroachDB session.
If the database row is empty, the GitHub-informed seed content in `src/lib/default-data.ts` is shown
until the first save.

## Developing

```bash
npm install
npm run dev
```

## Checks

```bash
npm run check
npm run lint
npm run build
```
