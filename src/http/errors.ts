export class KiipMcpError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = new.target.name;
  }
}

export class ConfigurationError extends KiipMcpError {}

export class NotAuthenticatedError extends KiipMcpError {
  constructor(
    message = 'Not logged in to Kiip. Run `/kiip-login` in Claude Code to authenticate, or set KIIP_TOKEN in your env.',
    options?: { cause?: unknown },
  ) {
    super(message, options);
  }
}

export class UnauthorizedError extends KiipMcpError {
  constructor(
    message = 'Kiip session expired or invalid. Run `/kiip-login` in Claude Code to log in again.',
    options?: { cause?: unknown },
  ) {
    super(message, options);
  }
}

export class ForbiddenError extends KiipMcpError {}
export class NotFoundError extends KiipMcpError {}
export class TimeoutError extends KiipMcpError {}

export class BackendError extends KiipMcpError {
  readonly status: number;
  constructor(message: string, status: number, cause?: unknown) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.status = status;
  }
}
