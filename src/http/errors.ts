export class KiipMcpError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = new.target.name;
  }
}

export class ConfigurationError extends KiipMcpError {}

export class UnauthorizedError extends KiipMcpError {
  constructor(
    message = 'Kiip token expired or invalid. Log in again on the Kiip UI, copy the new JWT, update the KIIP_TOKEN env in your MCP client and restart it.',
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
