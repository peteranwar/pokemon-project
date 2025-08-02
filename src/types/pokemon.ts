export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    sprites: {
      front_default: string;
    };
  }
  
  export interface PokemonListResult {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
  }