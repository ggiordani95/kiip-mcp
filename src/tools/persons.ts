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
        'Lista os colaboradores da empresa ativa. Cada item traz nome, status (ativo/inativo/afastado/em admissão), cargo, departamento, líder direto, empresa e centro de custo. Suporta busca por texto livre (nome, e-mail, CPF) e filtro por status. Bom para responder: "quantos colaboradores tenho?", "quem está no departamento X?", "colaboradores admitidos em janeiro". NÃO traz salário, endereço, dados bancários, dependentes, documentos ou outros campos detalhados — para esses dados use list_person_fields (traz todos os campos cadastrais e trabalhistas por colaborador, sujeito à permissão do usuário logado). Ao apresentar, resuma em linguagem de negócio; nunca exponha campos JSON, UUIDs ou o nome desta tool.',
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
    wrap(async (args: { search?: string; status?: string; page?: number; pageSize?: number }) =>
      ok(await client.get('/persons', args)),
    ),
  );

  server.registerTool(
    'get_person',
    {
      description:
        'Ficha resumida de um colaborador: nome, apelido, status, foto, cargo atual, data de admissão e data de desligamento (quando aplicável). Bom para uma visão inicial. IMPORTANTE: NÃO retorna salário, endereço, contatos, dados bancários, documentos, dependentes, benefícios nem outros campos cadastrais/trabalhistas — para o cadastro completo use list_person_fields (é a tool que expõe todos os campos armazenados sobre o colaborador, respeitando permissões do usuário logado). Ao apresentar, agrupe em seções; nunca exponha IDs internos.',
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
        'Cartão-resumo social do colaborador — nome, foto, biografia, esportes/comidas favoritas, talentos, contatos (e-mail pessoal, celular, LinkedIn, Instagram), histórico profissional e time (colegas de departamento e líder direto). Voltado a "conhecer a pessoa" — não é o cadastro completo. Para dados cadastrais/trabalhistas detalhados (salário, endereço, banco, documentos, dependentes, benefícios) use list_person_fields.',
      inputSchema: {
        personId: z.string().min(1).describe('Identificador do colaborador.'),
      },
    },
    wrap(async ({ personId }: { personId: string }) =>
      ok(await client.get(`/persons/${encodeURIComponent(personId)}/profile/summary`)),
    ),
  );

  server.registerTool(
    'list_person_fields',
    {
      description:
        'Todos os campos cadastrais e trabalhistas de um colaborador, agrupados por seção (Documentos pessoais, Endereços e contatos, Informações pessoais, Dependentes, Cargo & remuneração, Benefícios, Sindicato, etc.). Cobre: CPF, RG, CTPS, CNH, título de eleitor, endereço, contatos, contatos de emergência, dados bancários (banco, agência, conta, PIX), dependentes, dependentes no IR, deficiência, formação, curiosidades, dados profissionais (empresa, admissão, jornada, líder, centro de custo, matrícula, forma de pagamento, experiência), CARGO e SALÁRIO (tipo de vínculo, cargo, nível, tipo de salário, período de pagamento, VALOR DO SALÁRIO, início/fim), benefícios (VR, VT, plano de saúde, coparticipação, gasto empresa/colaborador), lançamentos fixos, sindicato e pensão alimentícia. É a tool a usar quando o usuário pergunta salário, endereço, dados bancários, documentos, dependentes, benefícios etc. de um colaborador específico. A resposta respeita as permissões do usuário logado — campos sem permissão de visualização podem vir vazios ou ausentes. Ao apresentar, filtre só o que o usuário pediu e formate em pt-BR (R$ 12.500,00, 25/01/2024); nunca despeje o JSON completo.',
      inputSchema: {
        personId: z
          .string()
          .min(1)
          .describe('Identificador do colaborador (obtido em list_persons).'),
        sectionId: z
          .string()
          .optional()
          .describe(
            'Opcional. Filtra por uma seção específica (ex.: só endereços & contatos). Normalmente omitir para receber todos os campos.',
          ),
        categoryId: z
          .string()
          .optional()
          .describe(
            'Opcional. Filtra por categoria (documentos, pessoal, profissional, adicional). Normalmente omitir.',
          ),
      },
    },
    wrap(
      async ({
        personId,
        sectionId,
        categoryId,
      }: {
        personId: string;
        sectionId?: string;
        categoryId?: string;
      }) =>
        ok(
          await client.get(`/persons/${encodeURIComponent(personId)}/fields`, {
            sectionId,
            categoryId,
          }),
        ),
    ),
  );
}
