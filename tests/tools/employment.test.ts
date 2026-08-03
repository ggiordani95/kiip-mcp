import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { describe, expect, it, vi } from 'vitest';
import type { KiipClient } from '../../src/http/kiip-client';
import { registerEmploymentTools } from '../../src/tools/employment';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}
function stub(): { client: KiipClient; get: ReturnType<typeof vi.fn> } {
  const get = vi.fn().mockResolvedValue([]);
  return { client: { get, put: vi.fn() }, get };
}

describe('list_employment_relationships', () => {
  it('calls GET /employment-relationships without args by default', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerEmploymentTools(server, { client });
    await callTool(server, 'list_employment_relationships', {});
    expect(get).toHaveBeenCalledWith('/employment-relationships', {
      includeDeleted: undefined,
    });
  });

  it('forwards includeDeleted as a string when provided', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerEmploymentTools(server, { client });
    await callTool(server, 'list_employment_relationships', { includeDeleted: true });
    expect(get).toHaveBeenCalledWith('/employment-relationships', {
      includeDeleted: 'true',
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
