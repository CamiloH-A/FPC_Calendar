import { describe, expect, it } from 'vitest';

import { Season } from '../../../src/domain/entities/season.js';

describe('Season', () => {
  it('should create a season', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: 'colombia-primera-a',
      year: 2026,
      name: '2026',
    });

    expect(season.id).toBe('primera-a-2026');

    expect(season.competitionId).toBe('colombia-primera-a');

    expect(season.year).toBe(2026);

    expect(season.name).toBe('2026');
  });

  it('should use the year as name when name is not provided', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: 'colombia-primera-a',
      year: 2026,
    });

    expect(season.name).toBe('2026');
  });

  it('should normalize competition ID and name', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: '  colombia-primera-a  ',
      year: 2026,
      name: '  Apertura 2026  ',
    });

    expect(season.competitionId).toBe('colombia-primera-a');

    expect(season.name).toBe('Apertura 2026');
  });

  it('should reject an empty competition ID', () => {
    expect(() =>
      Season.create('invalid-season', {
        competitionId: '   ',
        year: 2026,
      }),
    ).toThrow('Season competition ID cannot be empty');
  });

  it('should reject an invalid year', () => {
    expect(() =>
      Season.create('invalid-season', {
        competitionId: 'colombia-primera-a',
        year: 2026.5,
      }),
    ).toThrow('Season year must be a valid integer');
  });

  it('should reject a year below the minimum', () => {
    expect(() =>
      Season.create('invalid-season', {
        competitionId: 'colombia-primera-a',
        year: 1800,
      }),
    ).toThrow('Season year must be a valid integer');
  });

  it('should support external IDs', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: 'colombia-primera-a',
      year: 2026,
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '2026',
        },
        {
          provider: 'apiFootball',
          value: '2026',
        },
      ],
    });

    expect(season.getExternalIds()).toHaveLength(2);
  });

  it('should find an external ID by provider', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: 'colombia-primera-a',
      year: 2026,
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '2026',
        },
        {
          provider: 'apiFootball',
          value: '2026',
        },
      ],
    });

    const externalId = season.getExternalId('thesportsdb');

    expect(externalId).toBeDefined();

    expect(externalId?.value).toBe('2026');
  });

  it('should return undefined when provider does not exist', () => {
    const season = Season.create('primera-a-2026', {
      competitionId: 'colombia-primera-a',
      year: 2026,
    });

    expect(season.getExternalId('dimayor')).toBeUndefined();
  });
});
