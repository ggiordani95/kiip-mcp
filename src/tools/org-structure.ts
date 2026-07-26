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
  search: z.string().optional(),
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

  registerListing('list_departments', '/departments', 'List Kiip departments.');
  registerListing('list_cost_centers', '/cost-centers', 'List Kiip cost centers.');
  registerListing('list_localities', '/localities', 'List Kiip localities (workplaces).');
  registerListing('list_job_positions', '/job-positions', 'List Kiip job positions (cargos).');
}
