import { ExternalId, type ExternalProvider } from '../value-objects/external-id.js';

export interface SeasonExternalId {
  readonly provider: ExternalProvider;
  readonly value: string;
}

export interface CreateSeasonProps {
  readonly competitionId: string;
  readonly year: number;
  readonly name?: string;
  readonly externalIds?: readonly SeasonExternalId[];
}

export class Season {
  private readonly externalIds: ExternalId[];

  private constructor(
    public readonly id: string,
    public readonly competitionId: string,
    public readonly year: number,
    public readonly name: string,
    externalIds: ExternalId[],
  ) {
    this.externalIds = externalIds;
  }

  public static create(id: string, props: CreateSeasonProps): Season {
    const normalizedCompetitionId = props.competitionId.trim();

    if (normalizedCompetitionId.length === 0) {
      throw new Error('Season competition ID cannot be empty');
    }

    if (!Number.isInteger(props.year) || props.year < 1900) {
      throw new Error('Season year must be a valid integer');
    }

    const normalizedName = props.name?.trim() ?? String(props.year);

    if (normalizedName.length === 0) {
      throw new Error('Season name cannot be empty');
    }

    const externalIds = (props.externalIds ?? []).map((externalId) =>
      ExternalId.create(externalId.provider, externalId.value),
    );

    return new Season(id, normalizedCompetitionId, props.year, normalizedName, externalIds);
  }

  public getExternalIds(): readonly ExternalId[] {
    return [...this.externalIds];
  }

  public getExternalId(provider: ExternalProvider): ExternalId | undefined {
    return this.externalIds.find((externalId) => externalId.provider === provider);
  }
}
