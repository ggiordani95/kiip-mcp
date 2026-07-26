import { describe, expect, it, vi } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerPayrollTools } from '../../src/tools/payroll';
import type { KiipClient } from '../../src/http/kiip-client';
import { callTool } from './_helpers';

function makeServer() {
  return new McpServer({ name: 'test', version: '0.0.0' });
}
function stub(): { client: KiipClient; get: ReturnType<typeof vi.fn> } {
  const get = vi.fn().mockResolvedValue([]);
  return { client: { get, put: vi.fn() }, get };
}

describe('list_payrolls', () => {
  it('calls GET /payrolls with filters', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerPayrollTools(server, { client });
    await callTool(server, 'list_payrolls', { competency: '2026-07', status: 'open' });
    expect(get).toHaveBeenCalledWith('/payrolls', {
      competency: '2026-07',
      status: 'open',
      page: undefined,
      pageSize: undefined,
    });
  });
});

describe('get_payroll', () => {
  it('calls GET /payrolls/:id', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerPayrollTools(server, { client });
    await callTool(server, 'get_payroll', { payrollId: 'py1' });
    expect(get).toHaveBeenCalledWith('/payrolls/py1');
  });
});

describe('list_payroll_events', () => {
  it('calls GET /payroll-events with pagination', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerPayrollTools(server, { client });
    await callTool(server, 'list_payroll_events', { payrollId: 'py1', page: 1 });
    expect(get).toHaveBeenCalledWith('/payroll-events', {
      payrollId: 'py1',
      page: 1,
      pageSize: undefined,
    });
  });
});

describe('list_scheduled_entries', () => {
  it('calls GET /scheduled-entries with pagination', async () => {
    const server = makeServer();
    const { client, get } = stub();
    registerPayrollTools(server, { client });
    await callTool(server, 'list_scheduled_entries', { personId: 'p1' });
    expect(get).toHaveBeenCalledWith('/scheduled-entries', {
      personId: 'p1',
      page: undefined,
      pageSize: undefined,
    });
  });
});
