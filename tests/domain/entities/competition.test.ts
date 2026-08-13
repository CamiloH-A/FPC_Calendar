import { describe, expect, it } from 'vitest';

import { Competition } from '../../../src/domain/entities/competition.js';

describe('Competition', () => {
  it('should create a competition', () => {
    const competition = Competition.create('competition-primera-a', {
      name: 'Colombia Categoría Primera A',
      shortName: 'Primera A',
      country: 'Colombia',
    });

    expect(competition.id).toBe('competition-primera-a');

    expect(competition.name).toBe('Colombia Categoría Primera A');

    expect(competition.shortName).toBe('Primera A');

    expect(competition.country).toBe('Colombia');
  });

  it('should normalize competition data', () => {
    const competition = Competition.create('competition-primera-a', {
      name: ' Colombia Categoría Primera A ',
      shortName: ' Primera A ',
      country: ' Colombia ',
    });

    expect(competition.name).toBe('Colombia Categoría Primera A');

    expect(competition.shortName).toBe('Primera A');

    expect(competition.country).toBe('Colombia');
  });

  it('should reject an empty competition name', () => {
    expect(() =>
      Competition.create('competition-invalid', {
        name: '   ',
      }),
    ).toThrow('Competition name cannot be empty');
  });

  it('should support multiple external IDs', () => {
    const competition = Competition.create('competition-primera-a', {
      name: 'Colombia Categoría Primera A',
      shortName: 'Primera A',
      country: 'Colombia',
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '4497',
        },
        {
          provider: 'apiFootball',
          value: '239',
        },
      ],
    });

    expect(competition.getExternalIds()).toHaveLength(2);
  });

  it('should find an external ID by provider', () => {
    const competition = Competition.create('competition-primera-a', {
      name: 'Colombia Categoría Primera A',
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '4497',
        },
        {
          provider: 'apiFootball',
          value: '239',
        },
      ],
    });

    const externalId = competition.getExternalId('thesportsdb');

    expect(externalId).toBeDefined();

    expect(externalId?.value).toBe('4497');
  });

  it('should return undefined when provider does not exist', () => {
    const competition = Competition.create('competition-primera-a', {
      name: 'Colombia Categoría Primera A',
    });

    expect(competition.getExternalId('dimayor')).toBeUndefined();
  });
});
