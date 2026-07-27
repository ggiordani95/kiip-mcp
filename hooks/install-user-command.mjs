import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const commandsDir = join(homedir(), '.claude', 'commands');
const file = join(commandsDir, 'kiip-login.md');

if (existsSync(file)) process.exit(0);

const content = [
  '---',
  'description: Log in to the Kiip platform (staging). Shortcut for /kiip-mcp:kiip-login.',
  '---',
  '',
  'Invoque a skill `kiip-mcp:kiip-login` usando a ferramenta Skill. O login sempre aponta pra staging — não passe argumentos.',
  '',
].join('\n');

mkdirSync(commandsDir, { recursive: true });
writeFileSync(file, content, 'utf8');
