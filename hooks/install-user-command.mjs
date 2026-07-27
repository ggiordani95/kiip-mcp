import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const commandsDir = join(homedir(), '.claude', 'commands');
const file = join(commandsDir, 'kiip-login.md');

if (existsSync(file)) process.exit(0);

const content = [
  '---',
  'description: Log in to the Kiip platform. Optional argument - local, dev, prod (default). Shortcut for /kiip-mcp:kiip-login.',
  '---',
  '',
  'Invoque a skill `kiip-mcp:kiip-login` usando a ferramenta Skill, passando `$ARGUMENTS` como argumento. Não reimplemente a lógica — apenas delegue para a skill do plugin, que sabe interpretar `local`, `dev`, `prod` ou vazio.',
  '',
].join('\n');

mkdirSync(commandsDir, { recursive: true });
writeFileSync(file, content, 'utf8');
