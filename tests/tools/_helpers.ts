import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ToolResult } from '../../src/tools/helpers';

type ToolHandler = (args: Record<string, unknown>, extra: unknown) => Promise<ToolResult>;

interface RegisteredToolLike {
  handler: ToolHandler;
}

export function getTool(server: McpServer, name: string): RegisteredToolLike {
  const registry = (server as unknown as { _registeredTools: Record<string, RegisteredToolLike> })
    ._registeredTools;
  const tool = registry[name];
  if (!tool) throw new Error(`Tool not registered: ${name}`);
  return tool;
}

export function callTool(server: McpServer, name: string, args: Record<string, unknown>) {
  return getTool(server, name).handler(args, undefined);
}
