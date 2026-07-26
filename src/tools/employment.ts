import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface EmploymentToolsDeps {
  client: KiipClient;
}

export function registerEmploymentTools(
  server: McpServer,
  { client }: EmploymentToolsDeps,
): void {
  server.registerTool(
    'list_employment_relationships',
    {
      description:
        'Lista os vínculos de trabalho — os contratos que ligam colaboradores à empresa (CLT, PJ, estagiário, aprendiz, temporário, etc.). Cada item traz o colaborador, tipo do contrato, data de início, salário, jornada e status. Filtrável por colaborador ou por status. Use para perguntas como "quantos CLTs eu tenho?", "contratos ativos", "colaboradores PJ".',
      inputSchema: {
        personId: z
          .string()
          .optional()
          .describe('Identificador do colaborador — filtra vínculos dele.'),
        status: z.string().optional().describe('Status do vínculo. Ex: "active".'),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: {
        personId?: string;
        status?: string;
        page?: number;
        pageSize?: number;
      }) => ok(await client.get('/employment-relationships', args)),
    ),
  );

  server.registerTool(
    'get_employment_relationship',
    {
      description:
        'Detalhes completos de um vínculo/contrato específico: datas, salário, jornada, horários, benefícios, categoria eSocial. Use quando o usuário perguntar sobre condições contratuais de um colaborador.',
      inputSchema: {
        id: z.string().min(1).describe('Identificador do vínculo.'),
      },
    },
    wrap(async ({ id }: { id: string }) =>
      ok(await client.get(`/employment-relationships/${encodeURIComponent(id)}`)),
    ),
  );
}
