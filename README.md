# kiip-mcp

Read-only MCP tools for the Kiip HR platform, delivered as a Claude Code plugin
with in-Claude browser login.

## Install (once)

In any Claude Code session:

```
/plugin marketplace add https://github.com/ggiordani95/kiip-claude-plugins.git
/plugin install kiip-mcp@kiip
```

## Log in

```
/kiip-login
```

A browser opens, you type your Kiip email and password, and the JWT is saved to
`~/.kiip-mcp/token` (chmod 600). Every Kiip MCP tool starts using it
immediately — no restart needed. Re-run `/kiip-login` when the token expires
(~24h).

## Tools

| Tool | Endpoint |
|---|---|
| `list_tenants` | `GET /auth/tenants` |
| `switch_tenant` | `PUT /auth/tenants/:tenantId` |
| `list_persons` | `GET /persons` |
| `get_person` | `GET /persons/:id` |
| `get_person_summary` | `GET /persons/:id/profile/summary` |
| `list_departments` | `GET /departments` |
| `list_cost_centers` | `GET /cost-centers` |
| `list_localities` | `GET /localities` |
| `list_job_positions` | `GET /job-positions` |
| `list_employment_relationships` | `GET /employment-relationships` |
| `get_employment_relationship` | `GET /employment-relationships/:id` |
| `list_payrolls` | `GET /payrolls` |
| `get_payroll` | `GET /payrolls/:id` |
| `list_payroll_events` | `GET /payroll-events` |
| `list_scheduled_entries` | `GET /scheduled-entries` |

## Env vars (optional)

| Var | Default | Purpose |
|---|---|---|
| `KIIP_API_BASE_URL` | `https://api.kiip.com.br` | Backend base URL. Set for staging/dev. |
| `KIIP_TIMEOUT_MS` | `15000` | Per-request timeout. |
| `KIIP_LOGIN_PORT` | random | Fix the port used by `/kiip-login`'s local server. |
| `KIIP_TOKEN` | — | Legacy: use a raw JWT instead of the token file. Overrides `~/.kiip-mcp/token`. |

Set these in your shell (`~/.zshrc`, `~/.bashrc`, or PowerShell profile) before
launching Claude Code. The plugin manifest passes nothing baked-in, so env
overrides work automatically.

## Troubleshooting

- **"No Kiip token found..."** — run `/kiip-login`.
- **"Kiip token expired or invalid..."** — the JWT lives ~24h. Run `/kiip-login` again.
- **`/kiip-login` says a port is in use** — unset `KIIP_LOGIN_PORT` or free the port.
- **Browser did not open** — copy the URL printed on stderr and open it manually.

## Development

```
npm install
npm test               # 71 unit tests
npm run typecheck
npm run lint           # biome
npm run format
npm run build          # bundles to dist/index.mjs
node dist/index.mjs login    # local login flow
```
