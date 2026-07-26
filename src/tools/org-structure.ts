import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface OrgStructureToolsDeps {
  client: KiipClient;
}

interface ListArgs {
  [key: string]: string | number | undefined;
  search?: string;
  page?: number;
  pageSize?: number;
}

const listSchema = {
  search: z.string().optional().describe('Busca por texto livre no nome.'),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(200).optional(),
};

export function registerOrgStructureTools(
  server: McpServer,
  { client }: OrgStructureToolsDeps,
): void {
  const registerListing = (tool: string, path: string, description: string): void => {
    server.registerTool(
      tool,
      { description, inputSchema: listSchema },
      wrap(async (args: ListArgs) => ok(await client.get(path, args))),
    );
  };

  registerListing(
    'list_departments',
    '/departments',
    'Lista os departamentos da empresa (setores organizacionais como Financeiro, Comercial, Tecnologia, RH). Cada departamento pode ter um responsável e quantidade de colaboradores. Use para perguntas sobre organograma, distribuição por setor.',
  );

  registerListing(
    'list_cost_centers',
    '/cost-centers',
    'Lista os centros de custo — usados para agrupar despesas de folha por unidade de negócio, projeto ou área. Um colaborador pode estar vinculado a um centro de custo específico. Use quando o usuário perguntar sobre alocação de custos ou distribuição financeira por área.',
  );

  registerListing(
    'list_localities',
    '/localities',
    'Lista os locais de trabalho — endereços físicos ou remotos onde os colaboradores atuam (matriz, filiais, home office). Use para perguntas sobre distribuição geográfica dos colaboradores.',
  );

  registerListing(
    'list_job_positions',
    '/job-positions',
    'Lista os cargos existentes na empresa (ex: Analista Financeiro Jr., Gerente de Produto, Coordenador Comercial). Use para perguntas sobre plano de cargos, funções disponíveis ou distribuição por cargo.',
  );
}
