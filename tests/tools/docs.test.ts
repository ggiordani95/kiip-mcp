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

describe('get_playbook', () => {
  it('calls GET /mcp/docs/playbooks/:slug and returns the content field as text', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({
      slug: 'ativacao-ponto',
      title: 'Ativação do Ponto',
      content: '# Ativação\n\nPasso a passo.',
      updatedAt: '2026-07-29T00:00:00Z',
    });
    registerDocsTools(server, { client: stubClient(get) });

    const result = await callTool(server, 'get_playbook', { slug: 'ativacao-ponto' });

    expect(get).toHaveBeenCalledWith('/mcp/docs/playbooks/ativacao-ponto');
    expect(result).toEqual({
      content: [{ type: 'text', text: '# Ativação\n\nPasso a passo.' }],
    });
  });
});

describe('docs cache', () => {
  it('reuses the response for a repeated get_module_docs call', async () => {
    const server = makeServer();
    const get = vi.fn().mockResolvedValue({
      slug: 'folha',
      title: 'Folha',
      content: '# Folha',
      updatedAt: '2026-07-29T00:00:00Z',
    });
    registerDocsTools(server, { client: stubClient(get) });

    await callTool(server, 'get_module_docs', { slug: 'folha' });
    await callTool(server, 'get_module_docs', { slug: 'folha' });

    expect(get).toHaveBeenCalledTimes(1);
  });

  it('module and playbook calls hit different endpoints (cache is namespaced by kind)', async () => {
    const server = makeServer();
    const get = vi
      .fn()
      .mockResolvedValueOnce({ slug: 'ferias', title: 'M', content: '# M', updatedAt: '' })
      .mockResolvedValueOnce({
        slug: 'regularizacao-ferias',
        title: 'P',
        content: '# P',
        updatedAt: '',
      });
    registerDocsTools(server, { client: stubClient(get) });

    await callTool(server, 'get_module_docs', { slug: 'ferias' });
    await callTool(server, 'get_playbook', { slug: 'regularizacao-ferias' });

    expect(get).toHaveBeenCalledTimes(2);
    expect(get).toHaveBeenNthCalledWith(1, '/mcp/docs/modules/ferias');
    expect(get).toHaveBeenNthCalledWith(2, '/mcp/docs/playbooks/regularizacao-ferias');
  });
});
