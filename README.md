# kiip-mcp

Read-only MCP tools for the Kiip HR platform, delivered as a Claude Code plugin
with in-Claude browser login.

## Shortcut command `/kiip-login`

On first session after install, this plugin creates
`~/.claude/commands/kiip-login.md` — a user-level command that delegates to
`/kiip-mcp:kiip-login`. This lets you type just `/kiip-login local` instead
of the full `/kiip-mcp:kiip-login local`.

The install is idempotent — if the file already exists (e.g. you customized
it), the hook leaves it alone.

### Cleanup after uninstall

Claude Code has no plugin-uninstall hook, so the shortcut file is **not**
removed automatically when you uninstall this plugin. Delete it manually:

```bash
# macOS/Linux
rm ~/.claude/commands/kiip-login.md
```

```powershell
# Windows (PowerShell)
Remove-Item "$env:USERPROFILE\.claude\commands\kiip-login.md"
```
