---
description: Log in to the Kiip platform (opens a browser).
---

Run the Kiip login flow so the user can authenticate via a browser. The JWT is
saved to `~/.kiip-mcp/token` and every Kiip MCP tool starts using it immediately
(no restart needed).

## How to run

Use the Bash tool **in foreground** (not background) with a long timeout
(e.g. 600000 ms = 10 minutes) so you can wait for the browser flow to finish:

```
node "${CLAUDE_PLUGIN_ROOT}/dist/index.mjs" login
```

The CLI will print a `http://127.0.0.1:<port>/?csrf=...` URL to stderr and
open the browser. It stays running until the user submits the login form (or
Ctrl+C).

## What to tell the user

**Before** running the command, tell the user in one sentence:
"Opening the Kiip login page in your browser. Sign in with your Kiip
credentials and I'll confirm when the token is saved."

**After** the CLI exits, inspect its output:

- On success (stdout/stderr contains `Logged in. Token saved.`), reply with a
  clear confirmation, e.g.:

  > ✅ **Kiip login successful.** Token saved to
  > `~/.kiip-mcp/token`. You can now use tools like `list_tenants`,
  > `list_persons`, `list_payrolls`, etc.

- On error (any other exit or an error string in the output), reply with:

  > ❌ **Kiip login failed:** `<error message from CLI>`.

  Common causes: wrong password, backend unreachable, or `KIIP_API_BASE_URL`
  pointing to a URL that isn't up. Help the user diagnose based on the message.

Always show the confirmation or error message explicitly — do not stay silent
after the CLI exits.
