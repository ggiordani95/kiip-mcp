import { describe, expect, it } from 'vitest';
import { renderLoginPage } from '../../src/login/login-page';

describe('renderLoginPage', () => {
  it('renders a full HTML document with the CSRF token embedded', () => {
    const html = renderLoginPage({ csrf: 'abc123' });
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<form');
    expect(html).toContain('type="email"');
    expect(html).toContain('type="password"');
    expect(html).toContain('abc123');
  });

  it('does not fetch from any external network URL', () => {
    const html = renderLoginPage({ csrf: 'x' });
    // Allow standard XML namespace URIs (they aren't fetched by the browser).
    const external = html.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
    const nonNamespace = external.filter((u) => !u.startsWith('http://www.w3.org/'));
    expect(nonNamespace).toEqual([]);
  });

  it('includes a Portuguese login label', () => {
    const html = renderLoginPage({ csrf: 'x' });
    expect(html.toLowerCase()).toContain('entrar');
  });

  it('exposes the success and error containers', () => {
    const html = renderLoginPage({ csrf: 'x' });
    expect(html).toMatch(/id=["']success["']/);
    expect(html).toMatch(/id=["']error["']/);
  });

  it('renders the Kiip wordmark SVG in the brand purple', () => {
    const html = renderLoginPage({ csrf: 'x' });
    expect(html).toContain('<svg');
    expect(html).toContain('viewBox="0 0 64 32"');
    expect(html).toContain('#5A52E8');
    expect(html).not.toContain('#d97757');
  });
});
