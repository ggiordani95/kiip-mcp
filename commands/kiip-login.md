---
description: Log in to the Kiip platform (opens a browser).
---

Run the Kiip login flow **in the background** so Claude stays free to answer
other requests while the user completes the sign-in in their browser.

## Steps

1. Spawn the login CLI using the Bash tool with `run_in_background: true`.
   Command:

   ```
   node "${CLAUDE_PLUGIN_ROOT}/dist/index.mjs" login
   ```

   The Bash tool will return a task ID immediately — do **not** wait for it.

2. Sleep ~2 seconds, then read the task's output file once to capture the URL
   printed to stderr (line starting with `[kiip-mcp] Opening login page at`).

3. Tell the user (formatted, don't paste raw logs):

   > 🌐 **Kiip login page opened in your browser.** Complete the sign-in there —
   > I'll pick up the token automatically as soon as it's saved. No need to wait
   > here; you can already ask me for other things.
   >
   > If the browser didn't open, use: `<URL>`

4. **Return control to the user immediately.** Do not poll, do not wait,
   do not tail the output file. The background task will run for up to
   10 minutes (or until the user logs in) — that's fine, it doesn't block you.

## When the background task completes

If Claude Code sends you a task-notification for this run later, briefly
acknowledge:

- **Exit code 0** (success): reply once with:

  > ✅ **Kiip login successful.** Token saved to `~/.kiip-mcp/token`. Tools like
  > `list_tenants`, `list_persons`, `list_payrolls` are ready to use.

- **Non-zero exit**: reply with the error message from the output file and
  offer to retry with `/kiip-login`.

Do not surface raw `[kiip-mcp] ...` log lines to the user. The friendly
message is enough.
