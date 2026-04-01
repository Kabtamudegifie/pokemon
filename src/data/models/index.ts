export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  abilities: AbilitySlot[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: MoveSlot[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: Stat[];
  types: TypeSlot[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface AbilitySlot {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}
export interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

export interface MoveSlot {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}
export interface PokemonOtherHome {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
export interface PokemonOther {
  dream_world?: { front_default: string; front_female?: string | null };
  home?: PokemonOtherHome;
  "official-artwork"?: { front_default: string | null };
}

export interface PokemonSprites {
  front_default: string | null;
  back_default: string | null;
  front_shiny: string | null;
  back_shiny: string | null;
  front_female?: string | null;
  back_female?: string | null;
  front_shiny_female?: string | null;
  back_shiny_female?: string | null;
  other?: PokemonOther;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface TypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
