import { describe, expect, it } from 'vitest';
import { KiipMcpError, UnauthorizedError } from '../../src/http/errors';
import { ok, okText, wrap } from '../../src/tools/helpers';

describe('ok', () => {
  it('wraps a value as a text content block', () => {
    const result = ok({ a: 1 });
    expect(result.isError).toBeUndefined();
    expect(result.content[0]!.type).toBe('text');
    expect(JSON.parse(result.content[0]!.text)).toEqual({ a: 1 });
  });
});

describe('wrap', () => {
  it('returns the handler result on success', async () => {
    const handler = wrap(async () => ok({ ok: true }));
    const result = await handler({});
    expect(result.isError).toBeUndefined();
  });

  it('converts KiipMcpError to isError result with the error message', async () => {
    const handler = wrap(async () => {
      throw new UnauthorizedError();
    });
    const result = await handler({});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toMatch(/kiip-login/);
  });

  it('converts unknown errors to a generic isError result', async () => {
    const handler = wrap(async () => {
      throw new Error('unexpected');
    });
    const result = await handler({});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain('unexpected');
  });

  it('KiipMcpError subclasses are matched via instanceof', async () => {
    class Custom extends KiipMcpError {}
    const handler = wrap(async () => {
      throw new Custom('hi');
    });
    const result = await handler({});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toBe('hi');
  });
});

describe('okText', () => {
  it('returns raw text without JSON.stringify', () => {
    const result = okText('# Title\n\nBody');
    expect(result).toEqual({
      content: [{ type: 'text', text: '# Title\n\nBody' }],
    });
  });
});
