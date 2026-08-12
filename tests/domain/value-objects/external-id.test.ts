import { describe, expect, it } from 'vitest';

import { ExternalId } from '../../../src/domain/value-objects/external-id.js';

describe('ExternalId', () => {
  it('should create an external ID', () => {
    const externalId = ExternalId.create('thesportsdb', '137617');

    expect(externalId.provider).toBe('thesportsdb');

    expect(externalId.value).toBe('137617');
  });

  it('should trim the external ID value', () => {
    const externalId = ExternalId.create('apiFootball', ' 1125 ');

    expect(externalId.value).toBe('1125');
  });

  it('should reject an empty external ID', () => {
    expect(() => ExternalId.create('thesportsdb', '   ')).toThrow(
      'External ID value cannot be empty',
    );
  });

  it('should identify equal external IDs', () => {
    const first = ExternalId.create('thesportsdb', '137617');

    const second = ExternalId.create('thesportsdb', '137617');

    expect(first.equals(second)).toBe(true);
  });

  it('should identify different providers', () => {
    const first = ExternalId.create('thesportsdb', '137617');

    const second = ExternalId.create('apiFootball', '137617');

    expect(first.equals(second)).toBe(false);
  });
});
