import { ExternalId, type ExternalProvider } from '../value-objects/external-id.js';

export interface CompetitionExternalId {
  readonly provider: ExternalProvider;
  readonly value: string;
}

export interface CreateCompetitionProps {
  readonly name: string;
  readonly shortName?: string;
  readonly country?: string;
  readonly externalIds?: readonly CompetitionExternalId[];
}

export class Competition {
  private readonly externalIds: ExternalId[];

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly shortName: string | null,
    public readonly country: string | null,
    externalIds: ExternalId[],
  ) {
    this.externalIds = externalIds;
  }

  public static create(id: string, props: CreateCompetitionProps): Competition {
    const normalizedName = props.name.trim();

    if (normalizedName.length === 0) {
      throw new Error('Competition name cannot be empty');
    }

    const normalizedShortName = props.shortName?.trim() ?? null;

    const normalizedCountry = props.country?.trim() ?? null;

    const externalIds = (props.externalIds ?? []).map((externalId) =>
      ExternalId.create(externalId.provider, externalId.value),
    );

    return new Competition(id, normalizedName, normalizedShortName, normalizedCountry, externalIds);
  }

  public getExternalIds(): readonly ExternalId[] {
    return [...this.externalIds];
  }

  public getExternalId(provider: ExternalProvider): ExternalId | undefined {
    return this.externalIds.find((externalId) => externalId.provider === provider);
  }
}
