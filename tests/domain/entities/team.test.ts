import { describe, expect, it } from 'vitest';

import { Team } from '../../../src/domain/entities/team.js';

describe('Team', () => {
  it('should create a team', () => {
    const team = Team.create('team-millonarios', {
      name: 'Millonarios',
      shortName: 'MIL',
      country: 'Colombia',
    });

    expect(team.id).toBe('team-millonarios');

    expect(team.name).toBe('Millonarios');

    expect(team.shortName).toBe('MIL');

    expect(team.country).toBe('Colombia');
  });

  it('should normalize team data', () => {
    const team = Team.create('team-millonarios', {
      name: ' Millonarios ',
      shortName: ' MIL ',
      country: ' Colombia ',
    });

    expect(team.name).toBe('Millonarios');

    expect(team.shortName).toBe('MIL');

    expect(team.country).toBe('Colombia');
  });

  it('should reject an empty team name', () => {
    expect(() =>
      Team.create('team-invalid', {
        name: '   ',
      }),
    ).toThrow('Team name cannot be empty');
  });

  it('should support multiple external IDs', () => {
    const team = Team.create('team-millonarios', {
      name: 'Millonarios',
      shortName: 'MIL',
      country: 'Colombia',
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '137617',
        },
        {
          provider: 'apiFootball',
          value: '1125',
        },
      ],
    });

    expect(team.getExternalIds()).toHaveLength(2);
  });

  it('should find an external ID by provider', () => {
    const team = Team.create('team-millonarios', {
      name: 'Millonarios',
      externalIds: [
        {
          provider: 'thesportsdb',
          value: '137617',
        },
        {
          provider: 'apiFootball',
          value: '1125',
        },
      ],
    });

    const externalId = team.getExternalId('thesportsdb');

    expect(externalId).toBeDefined();

    expect(externalId?.value).toBe('137617');
  });

  it('should return undefined when provider does not exist', () => {
    const team = Team.create('team-millonarios', {
      name: 'Millonarios',
    });

    expect(team.getExternalId('dimayor')).toBeUndefined();
  });
});
