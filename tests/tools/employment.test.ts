import { describe, expect, it, vi } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerEmploymentTools } from '../../src/tools/employment';
import type { KiipClient } from '../../src/http/kiip-client';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}
function stub(): { client: KiipClient; get: ReturnType<typeof vi.fn> } {
  const get = vi.fn().mockResolvedValue([]);
  return { client: { get, put: vi.fn() }, get };
}

describe('list_employment_relationships', () => {
  it('calls GET /employment-relationships with filters', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerEmploymentTools(server, { client });
    await callTool(server, 'list_employment_relationships', { personId: 'p1', page: 1 });
    expect(get).toHaveBeenCalledWith('/employment-relationships', {
      personId: 'p1',
      status: undefined,
      page: 1,
      pageSize: undefined,
    });
  });
});

describe('get_employment_relationship', () => {
  it('calls GET /employment-relationships/:id', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerEmploymentTools(server, { client });
    await callTool(server, 'get_employment_relationship', { id: 'er1' });
    expect(get).toHaveBeenCalledWith('/employment-relationships/er1');
  });
});
