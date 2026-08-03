import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { describe, expect, it, vi } from 'vitest';
import type { KiipClient } from '../../src/http/kiip-client';
import { registerPersonTools } from '../../src/tools/persons';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}

function stubClient(get: KiipClient['get']): KiipClient {
  return { get, put: vi.fn() };
}

describe('list_persons', () => {
  it('calls GET /persons with filters', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({ items: [] });
    registerPersonTools(server, { client: stubClient(get) });

    await callTool(server, 'list_persons', { search: 'ana', page: 2, pageSize: 50 });
    expect(get).toHaveBeenCalledWith('/persons', {
      search: 'ana',
      status: undefined,
      page: 2,
      pageSize: 50,
    });
  });
});

describe('get_person', () => {
  it('calls GET /persons/:id', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({ id: 'p1' });
    registerPersonTools(server, { client: stubClient(get) });

    await callTool(server, 'get_person', { personId: 'p1' });
    expect(get).toHaveBeenCalledWith('/persons/p1');
  });
});

describe('get_person_summary', () => {
  it('calls GET /persons/:id/profile/summary', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({ id: 'p1' });
    registerPersonTools(server, { client: stubClient(get) });

    await callTool(server, 'get_person_summary', { personId: 'p1' });
    expect(get).toHaveBeenCalledWith('/persons/p1/profile/summary');
  });
});

describe('list_person_fields', () => {
  it('calls GET /persons/:id/fields without filters by default', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue([]);
    registerPersonTools(server, { client: stubClient(get) });

    await callTool(server, 'list_person_fields', { personId: 'p1' });
    expect(get).toHaveBeenCalledWith('/persons/p1/fields', {
      sectionId: undefined,
      categoryId: undefined,
    });
  });

  it('forwards sectionId and categoryId when provided', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue([]);
    registerPersonTools(server, { client: stubClient(get) });

    await callTool(server, 'list_person_fields', {
      personId: 'p1',
      sectionId: 'sec1',
      categoryId: 'cat1',
    });
    expect(get).toHaveBeenCalledWith('/persons/p1/fields', {
      sectionId: 'sec1',
      categoryId: 'cat1',
    });
  });
});
