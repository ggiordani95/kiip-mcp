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

   > 🌐 **Página de login da Kiip aberta no seu navegador.** Complete o sign-in
   > por lá — vou pegar o token automaticamente e te confirmar aqui. Pode me
   > pedir outras coisas enquanto isso.
   >
   > Se o navegador não abriu, use: `<URL>`

4. **Return control to the user immediately.** Do not poll, do not wait,
   do not tail the output file. The background task will run for up to
   10 minutes (or until the user logs in) — that's fine, it doesn't block you.

## When the background task completes

If Claude Code sends you a task-notification for this run later:

- **Exit code 0** (success):
  1. Call the `list_tenants` MCP tool (it uses the freshly saved token).
  2. From the response, find the tenant where `tenantId === response.currentTenantId`
     and take its `name` field.
  3. Reply with exactly this format (no extra text, no mention of tools):

     > ✅ **Kiip login realizado com sucesso.** Token salvo em `~/.kiip-mcp/token`.
     > 🏢 Tenant ativo: **`<name>`**

  4. If `list_tenants` fails for any reason, omit line 3 and reply only with
     the first line.

- **Non-zero exit** with the login CLI's error string in the output: reply with:

  > ❌ **Login da Kiip falhou:** `<error message from CLI>`
  >
  > Causas comuns: senha errada, backend inacessível, ou `KIIP_API_BASE_URL`
  > apontando pra URL fora do ar.

Do not surface raw `[kiip-mcp] ...` log lines to the user. The friendly
message is enough.

**Note on Windows exit codes:** On Windows/Node, the process may exit with a
non-zero code even after a successful login (libuv shutdown assertion). If the
output file contains `Logged in. Token saved.`, treat it as success regardless
of exit code.
