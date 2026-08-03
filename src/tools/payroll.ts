import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface PayrollToolsDeps {
  client: KiipClient;
}

export function registerPayrollTools(server: McpServer, { client }: PayrollToolsDeps): void {
  server.registerTool(
    'list_payrolls',
    {
      description:
        'Lista as folhas de pagamento. Cada folha corresponde a uma competência (mês/ano) e traz total bruto, total líquido, quantidade de colaboradores e status (aberta, fechada, transmitida, etc.). Filtrável por competência (formato "AAAA-MM", ex: "2024-03") e status. Use para: "me mostre a folha de março", "folhas fechadas do ano passado", "total pago em fevereiro".',
      inputSchema: {
        competency: z
          .string()
          .optional()
          .describe('Competência no formato "AAAA-MM" (ex: "2024-03" = março/2024).'),
        status: z.string().optional().describe('Status da folha. Ex: "closed", "open".'),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(async (args: { competency?: string; status?: string; page?: number; pageSize?: number }) =>
      ok(await client.get('/payrolls', args)),
    ),
  );

  server.registerTool(
    'get_payroll',
    {
      description:
        'Detalhes de uma folha de pagamento específica: totais (bruto, líquido, encargos), quantidade de colaboradores, período de referência e status. Use quando o usuário quiser abrir uma folha específica encontrada em list_payrolls.',
      inputSchema: {
        payrollId: z.string().min(1).describe('Identificador da folha (obtido em list_payrolls).'),
      },
    },
    wrap(async ({ payrollId }: { payrollId: string }) =>
      ok(await client.get(`/payrolls/${encodeURIComponent(payrollId)}`)),
    ),
  );

  server.registerTool(
    'list_payroll_events',
    {
      description:
        'Lista os eventos de folha — proventos (o que o colaborador ganha: salário, horas extras, comissões, adicional noturno) e descontos (INSS, IRRF, vale-transporte, faltas). Cada evento tem colaborador, tipo, valor e a folha a que pertence. Filtrável por folha. Use para "detalhamento da folha de X", "descontos de Y".',
      inputSchema: {
        payrollId: z.string().optional().describe('Filtra eventos de uma folha específica.'),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(async (args: { payrollId?: string; page?: number; pageSize?: number }) =>
      ok(await client.get('/payroll-events', args)),
    ),
  );

  server.registerTool(
    'list_scheduled_entries',
    {
      description:
        'Lista os lançamentos programados — proventos ou descontos recorrentes agendados para próximas folhas de um colaborador (ex: parcelas de empréstimo consignado, gratificação parcelada, plano de saúde). Filtrável por colaborador. Use quando o usuário perguntar sobre lançamentos futuros/agendados.',
      inputSchema: {
        personId: z
          .string()
          .optional()
          .describe('Filtra lançamentos de um colaborador específico.'),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(async (args: { personId?: string; page?: number; pageSize?: number }) =>
      ok(await client.get('/scheduled-entries', args)),
    ),
  );
}
