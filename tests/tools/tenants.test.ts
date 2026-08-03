import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { describe, expect, it, vi } from 'vitest';
import type { KiipClient } from '../../src/http/kiip-client';
import { createSessionStore } from '../../src/session';
import { registerTenantTools } from '../../src/tools/tenants';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}

function makeClient(overrides: Partial<KiipClient> = {}): KiipClient {
  return {
    get: vi.fn().mockResolvedValue([]),
    put: vi.fn().mockResolvedValue({ token: 'new-token' }),
    ...overrides,
  };
}

describe('list_tenants', () => {
  it('registers and calls GET /auth/tenants', async () => {
    const server = makeServer();
    const client = makeClient({ get: vi.fn().mockResolvedValue([{ tenantId: 't1' }]) });
    const session = createSessionStore('jwt');
    registerTenantTools(server, { client, session });

    const result = await callTool(server, 'list_tenants', {});
    expect(client.get).toHaveBeenCalledWith('/auth/tenants');
    expect(result.isError).toBeUndefined();
    expect(JSON.parse(result.content[0]!.text)).toEqual([{ tenantId: 't1' }]);
  });
});

describe('switch_tenant', () => {
  it('calls PUT /auth/tenants/:id and updates session token', async () => {
    const server = makeServer();
    const putMock = vi.fn().mockResolvedValue({ token: 'new-jwt' });
    const client = makeClient({ put: putMock });
    const session = createSessionStore('old-jwt');
    registerTenantTools(server, { client, session });

    const result = await callTool(server, 'switch_tenant', { tenantId: 'abc' });
    expect(putMock).toHaveBeenCalledWith('/auth/tenants/abc');
    expect(session.getToken()).toBe('new-jwt');
    expect(result.isError).toBeUndefined();
  });
});
