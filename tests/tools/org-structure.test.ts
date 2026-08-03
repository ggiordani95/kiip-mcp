import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { describe, expect, it, vi } from 'vitest';
import type { KiipClient } from '../../src/http/kiip-client';
import { registerOrgStructureTools } from '../../src/tools/org-structure';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}
function stubClient(): { client: KiipClient; get: ReturnType<typeof vi.fn> } {
  const get = vi.fn().mockResolvedValue([]);
  return { client: { get, put: vi.fn() }, get };
}

const cases: Array<{ tool: string; path: string }> = [
  { tool: 'list_departments', path: '/departments' },
  { tool: 'list_cost_centers', path: '/cost-centers' },
  { tool: 'list_localities', path: '/localities' },
  { tool: 'list_job_positions', path: '/job-positions' },
];

describe.each(cases)('$tool', ({ tool, path }) => {
  it(`calls GET ${path} with pagination`, async () => {
    const server = makeServer();
    const { client, get } = stubClient();
    registerOrgStructureTools(server, { client });

    await callTool(server, tool, { search: 'x', page: 1, pageSize: 10 });
    expect(get).toHaveBeenCalledWith(path, { search: 'x', page: 1, pageSize: 10 });
  });
});
