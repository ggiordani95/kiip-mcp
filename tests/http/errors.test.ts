import { describe, expect, it } from 'vitest';
import {
  BackendError,
  ConfigurationError,
  ForbiddenError,
  KiipMcpError,
  NotFoundError,
  TimeoutError,
  UnauthorizedError,
} from '../../src/http/errors';

describe('KiipMcpError hierarchy', () => {
  it('all subclasses inherit from KiipMcpError', () => {
    expect(new UnauthorizedError('x')).toBeInstanceOf(KiipMcpError);
    expect(new ForbiddenError('x')).toBeInstanceOf(KiipMcpError);
    expect(new NotFoundError('x')).toBeInstanceOf(KiipMcpError);
    expect(new BackendError('x', 500)).toBeInstanceOf(KiipMcpError);
    expect(new TimeoutError('x')).toBeInstanceOf(KiipMcpError);
    expect(new ConfigurationError('x')).toBeInstanceOf(KiipMcpError);
  });

  it('preserves cause on the base class', () => {
    const cause = new Error('boom');
    const err = new BackendError('wrapped', 500, cause);
    expect(err.cause).toBe(cause);
    expect(err.status).toBe(500);
  });

  it('UnauthorizedError has a helpful default message pointing at /kiip-login', () => {
    const err = new UnauthorizedError();
    expect(err.message).toMatch(/kiip-login/);
    expect(err.message).toMatch(/expired|invalid/i);
  });

  it('sets .name to the concrete subclass name', () => {
    expect(new UnauthorizedError().name).toBe('UnauthorizedError');
    expect(new BackendError('x', 500).name).toBe('BackendError');
    expect(new NotFoundError('x').name).toBe('NotFoundError');
  });

  it('does not set an own cause property when none is passed', () => {
    const err = new NotFoundError('x');
    expect(Object.hasOwn(err, 'cause')).toBe(false);
  });
});
