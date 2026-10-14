# Move it automation

GitHub is the queue and the release control plane for the Move it Colorado landing page. No database, no auth, no CRM, no email provider.

## Event flow

1. The quote form writes the lead to `localStorage`, then `POST /api/leads`.
2. The server validates with `src/lib/lead-schema.ts`, builds an idempotency key, and fires `repository_dispatch` `moveit.lead.created`.
3. `lead-intake.yml` opens or updates one issue. The marker `<!-- lead:{key} -->` and the line `Lead-Key: {key}` are the dedupe key.
4. The thank-you page stores the consult window locally, then `POST /api/consults`.
5. That dispatches `moveit.consult.selected`, which updates the same issue.
6. If GitHub is down or `GITHUB_LEAD_TOKEN` is unset, the API still returns 202. The browser always continues to `/thank-you`.

The key is `sha256(lowercase name | digits | service | submittedAt truncated to the minute)`.

## Secrets and variables

Set these in the repository. Do not commit values.

| Name | Kind | Use |
| --- | --- | --- |
| `GITHUB_LEAD_TOKEN` | secret | Fine-scoped PAT. Contents: none. Issues: write. Metadata: read. Used only by the server to dispatch events. |
| `VERCEL_TOKEN` | secret | Preview lookup in `preview.yml`. |
| `VERCEL_ORG_ID` | secret | Vercel team or user id. |
| `VERCEL_PROJECT_ID` | secret | Vercel project id. |
| `PRODUCTION_URL` | variable | Live origin, no trailing slash. Used by `uptime.yml`. |
| `GITHUB_REPOSITORY` | env, optional | Override of `chrisrossrecrui/move-it` for dispatch. |

Keep this repository private. GitHub cannot make a single issue private in a public repo, and issue bodies contain the phone number.

## SLA

New quote issues get `sla:due`. `lead-sla.yml` runs every 15 minutes. An issue older than 4 hours is relabeled `sla:breach` and commented once. The comment marker is `<!-- sla:breach -->`.

## Required checks

Protect `main` with these check names:

- `typecheck`
- `lint`
- `test`
- `build`
- `framework-floor`
- `lighthouse`
- `conversion-smoke`

`framework-floor` fails if `@tanstack/react-start` resolves below 1.168.60.

## Replay a lead

```bash
curl -sS -X POST \
  -H "Authorization: Bearer $GITHUB_LEAD_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/chrisrossrecrui/move-it/dispatches \
  -d '{"event_type":"moveit.lead.created","client_payload":{"key":"<64-hex>","name":"Ada Rivera","phone":"3035550142","phoneLast4":"0142","service":"Local Move","serviceSlug":"local-move","message":"","submittedAt":"2026-10-14T15:04:00.000Z"}}'
```

Do not put the phone in workflow logs or pull request comments. The intake workflow prints only the key.

## Visual baselines

Baselines live in `.github/visual/`. Refresh them with:

```bash
node scripts/visual-diff.mjs --url http://127.0.0.1:8080 --write-baseline
```

`preview.yml` enforces the diff only when a pull request touches `src/components/**` or `src/routes/**`.
