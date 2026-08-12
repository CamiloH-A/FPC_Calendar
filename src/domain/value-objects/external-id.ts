export type ExternalProvider = 'thesportsdb' | 'apiFootball' | 'dimayor';

export class ExternalId {
  private constructor(
    public readonly provider: ExternalProvider,
    public readonly value: string,
  ) {}

  public static create(provider: ExternalProvider, value: string): ExternalId {
    const normalizedValue = value.trim();

    if (normalizedValue.length === 0) {
      throw new Error('External ID value cannot be empty');
    }

    return new ExternalId(provider, normalizedValue);
  }

  public equals(other: ExternalId): boolean {
    return this.provider === other.provider && this.value === other.value;
  }
}
