import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { describe, expect, it, vi } from 'vitest';
import type { KiipClient } from '../../src/http/kiip-client';
import { registerDocsTools } from '../../src/tools/docs';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}

function stubClient(get: KiipClient['get']): KiipClient {
  return { get, put: vi.fn() };
}

describe('get_module_docs', () => {
  it('calls GET /mcp/docs/modules/:slug and returns the content field as text', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({
      slug: 'folha',
      title: 'Folha de Pagamento',
      content: '# Folha\n\nConteúdo do módulo.',
      updatedAt: '2026-07-29T00:00:00Z',
    });
    registerDocsTools(server, { client: stubClient(get) });

    const result = await callTool(server, 'get_module_docs', { slug: 'folha' });

    expect(get).toHaveBeenCalledWith('/mcp/docs/modules/folha');
    expect(result).toEqual({
      content: [{ type: 'text', text: '# Folha\n\nConteúdo do módulo.' }],
    });
  });
});
