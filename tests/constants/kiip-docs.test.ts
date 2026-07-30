import { describe, expect, it } from 'vitest';
import {
  KIIP_INSTRUCTIONS,
  KIIP_MODULE_SLUGS,
  KIIP_PLAYBOOK_SLUGS,
} from '../../src/constants/kiip-docs';

describe('kiip-docs constants', () => {
  it('module slugs are unique and non-empty', () => {
    expect(KIIP_MODULE_SLUGS.length).toBeGreaterThan(0);
    expect(new Set(KIIP_MODULE_SLUGS).size).toBe(KIIP_MODULE_SLUGS.length);
    for (const slug of KIIP_MODULE_SLUGS) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('playbook slugs are unique and non-empty', () => {
    expect(KIIP_PLAYBOOK_SLUGS.length).toBeGreaterThan(0);
    expect(new Set(KIIP_PLAYBOOK_SLUGS).size).toBe(KIIP_PLAYBOOK_SLUGS.length);
    for (const slug of KIIP_PLAYBOOK_SLUGS) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('instructions mention both tools and stay under 2KB', () => {
    expect(KIIP_INSTRUCTIONS).toContain('get_module_docs');
    expect(KIIP_INSTRUCTIONS).toContain('get_playbook');
    expect(Buffer.byteLength(KIIP_INSTRUCTIONS, 'utf8')).toBeLessThan(2048);
  });
});
