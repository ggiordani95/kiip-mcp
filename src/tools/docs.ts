import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { KIIP_MODULE_SLUGS } from '../constants/kiip-docs';
import type { KiipClient } from '../http/kiip-client';
import { okText, wrap } from './helpers';

export interface DocsToolsDeps {
  client: KiipClient;
}

interface DocResponse {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

export function registerDocsTools(server: McpServer, { client }: DocsToolsDeps): void {
  server.registerTool(
    'get_module_docs',
    {
      description:
        'Retorna a documentação completa (markdown) de um módulo da Kiip. Chame este tool antes de responder qualquer pergunta específica sobre um módulo — a documentação é a fonte de verdade. Slugs válidos: ' +
        KIIP_MODULE_SLUGS.join(', ') +
        '.',
      inputSchema: {
        slug: z
          .enum(KIIP_MODULE_SLUGS)
          .describe('Slug do módulo (ex.: "folha", "ponto", "ferias").'),
      },
    },
    wrap(async ({ slug }: { slug: string }) => {
      const data = await client.get<DocResponse>(`/mcp/docs/modules/${encodeURIComponent(slug)}`);
      return okText(data.content);
    }),
  );
}
