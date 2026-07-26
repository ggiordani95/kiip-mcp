import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface PersonToolsDeps {
  client: KiipClient;
}

export function registerPersonTools(server: McpServer, { client }: PersonToolsDeps): void {
  server.registerTool(
    'list_persons',
    {
      description:
        'Lista os colaboradores da empresa ativa. Cada item traz nome, status (ativo/inativo/afastado/em admissão), cargo, departamento e líder direto. Suporta busca por texto livre (nome, e-mail, CPF) e filtro por status. Bom para responder: "quantos colaboradores tenho?", "quem está no departamento X?", "colaboradores admitidos em janeiro". Ao apresentar, resuma em linguagem de negócio; nunca exponha campos JSON, UUIDs ou o nome desta tool.',
      inputSchema: {
        search: z
          .string()
          .optional()
          .describe('Busca por texto livre — nome, e-mail ou documento.'),
        status: z
          .string()
          .optional()
          .describe('Status do colaborador. Ex: "active", "inactive", "on_leave".'),
        page: z.number().int().positive().optional().describe('Página (a partir de 1).'),
        pageSize: z
          .number()
          .int()
          .positive()
          .max(200)
          .optional()
          .describe('Máximo por página (até 200).'),
      },
    },
    wrap(
      async (args: { search?: string; status?: string; page?: number; pageSize?: number }) =>
        ok(await client.get('/persons', args)),
    ),
  );

  server.registerTool(
    'get_person',
    {
      description:
        'Detalhes completos de um colaborador: dados pessoais, contato, endereço, contrato, dependentes, documentos, dados bancários. Use quando o usuário perguntar sobre um colaborador específico. Ao apresentar, agrupe em seções (dados pessoais, contrato, contato); nunca exponha IDs internos.',
      inputSchema: {
        personId: z
          .string()
          .min(1)
          .describe('Identificador do colaborador (obtido em list_persons).'),
      },
    },
    wrap(async ({ personId }: { personId: string }) =>
      ok(await client.get(`/persons/${encodeURIComponent(personId)}`)),
    ),
  );

  server.registerTool(
    'get_person_summary',
    {
      description:
        'Cartão-resumo do colaborador — visão compacta com nome, cargo, departamento, tempo de casa e principais infos. Use quando o usuário quer só um panorama rápido, não o cadastro completo.',
      inputSchema: {
        personId: z.string().min(1).describe('Identificador do colaborador.'),
      },
    },
    wrap(async ({ personId }: { personId: string }) =>
      ok(await client.get(`/persons/${encodeURIComponent(personId)}/profile/summary`)),
    ),
  );
}
