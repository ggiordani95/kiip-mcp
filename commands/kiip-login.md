---
description: Log in to the Kiip platform (opens a browser).
---

Run the Kiip login flow so the user can authenticate via a browser. On success
the JWT is saved to `~/.kiip-mcp/token` and every Kiip MCP tool starts using it
immediately (no restart needed).

Use the Bash tool to run:

```
node "${CLAUDE_PLUGIN_ROOT}/dist/index.mjs" login
```

Report the login CLI's stdout and stderr back to the user. If the CLI prints an
error, help the user diagnose it (usually wrong password or backend unreachable).
