import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import type { SessionStore } from '../session';
import { ok, wrap } from './helpers';

export interface TenantToolsDeps {
  client: KiipClient;
  session: SessionStore;
}

export function registerTenantTools(server: McpServer, { client, session }: TenantToolsDeps): void {
  server.registerTool(
    'list_tenants',
    {
      description:
        'Lista as empresas (contas Kiip) que o usuário tem acesso, indicando qual está ativa no momento. Cada empresa tem nome, CNPJ, quantidade de colaboradores ativos e status. Use antes de trocar de empresa, ou quando o usuário perguntar "em qual empresa estou?" / "quais empresas eu acesso?". Ao apresentar, use "empresa" (não "tenant"); nunca cite o identificador interno.',
      inputSchema: {},
    },
    wrap(async () => ok(await client.get('/auth/tenants'))),
  );

  server.registerTool(
    'switch_tenant',
    {
      description:
        'Troca a empresa ativa da sessão. Após a troca, todas as consultas passam a operar na nova empresa até a sessão terminar. Só peça o identificador ao usuário se ele não deixou claro qual empresa quer — o mais comum é usar list_tenants primeiro e escolher pelo nome.',
      inputSchema: {
        tenantId: z
          .string()
          .min(1)
          .describe('Identificador da empresa alvo (obtido em list_tenants).'),
      },
    },
    wrap(async ({ tenantId }: { tenantId: string }) => {
      const result = await client.put<{ token: string }>(
        `/auth/tenants/${encodeURIComponent(tenantId)}`,
      );
      session.setToken(result.token);
      return ok({ switched: true, tenantId });
    }),
  );
}
