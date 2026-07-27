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
        'Lista os TIPOS DE VÍNCULO / CONTRATO cadastrados na empresa — o CATÁLOGO de modalidades disponíveis (CLT, PJ, estagiário, aprendiz, temporário, sócio, etc.). Cada item traz o nome do tipo e sua definição (estrutura de campos exigidos). Use para responder "que tipos de contrato existem no cadastro?" ou para descobrir o vínculo de referência antes de configurar algo. IMPORTANTE: NÃO retorna os contratos de cada colaborador, nem salário, nem data de admissão por pessoa — para o vínculo específico + salário de um colaborador use list_person_fields (traz cargo, tipo de vínculo, salário etc.). Para saber quantos colaboradores são CLT/PJ, cruze com list_persons.',
      inputSchema: {
        includeDeleted: z
          .boolean()
          .optional()
          .describe('Inclui também tipos de vínculo arquivados/excluídos. Default: false.'),
      },
    },
    wrap(async ({ includeDeleted }: { includeDeleted?: boolean }) =>
      ok(
        await client.get('/employment-relationships', {
          includeDeleted: includeDeleted === undefined ? undefined : String(includeDeleted),
        }),
      ),
    ),
  );

  server.registerTool(
    'get_employment_relationship',
    {
      description:
        'Definição de um TIPO DE VÍNCULO específico (CLT, PJ, estagiário, etc.): nome, keyName (tipo default do sistema ou custom), estrutura de campos por categoria eSocial. É a "planta" do tipo de contrato, não um contrato de uma pessoa. Não traz salário nem colaborador — para isso, use list_person_fields.',
      inputSchema: {
        id: z.string().min(1).describe('Identificador do tipo de vínculo.'),
      },
    },
    wrap(async ({ id }: { id: string }) =>
      ok(await client.get(`/employment-relationships/${encodeURIComponent(id)}`)),
    ),
  );
}
