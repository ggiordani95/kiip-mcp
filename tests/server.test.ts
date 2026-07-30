import { describe, expect, it } from 'vitest';
import { createServer } from '../src/server';
import { getTool } from './tools/_helpers';

describe('createServer', () => {
  it('returns an McpServer with all 17 tools registered', () => {
    const server = createServer({
      apiBaseUrl: 'https://api.kiip.test',
      token: 'jwt',
      timeoutMs: 15000,
    });

    const expected = [
      'list_tenants',
      'switch_tenant',
      'list_persons',
      'get_person',
      'get_person_summary',
      'list_person_fields',
      'list_departments',
      'list_cost_centers',
      'list_localities',
      'list_job_positions',
      'list_employment_relationships',
      'get_employment_relationship',
      'list_payrolls',
      'get_payroll',
      'list_payroll_events',
      'list_scheduled_entries',
      'get_module_docs',
      'get_playbook',
    ];

    for (const name of expected) {
      expect(() => getTool(server, name), `${name} should be registered`).not.toThrow();
    }
  });
});
