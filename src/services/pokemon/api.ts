
import type { Pokemon, PokemonListResponse } from "../../types/pokemon";

const BASE_URL = 'https://pokeapi.co/api/v2';

const PokemonApiEndpoints = {
    fetchPokemonList: async (
        limit: number = 10,
        offset: number = 0
    ): Promise<PokemonListResponse> => {
        const res = await fetch(
            `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!res.ok) throw new Error('Failed to fetch Pokémon list');
        return res.json();
    },

    fetchPokemonById: async (id: string): Promise<Pokemon> => {
        const res = await fetch(`${BASE_URL}/pokemon/${id}`);
        if (!res.ok) throw new Error(`Pokémon with ID ${id} not found`);
        return res.json();
    }
}

export default PokemonApiEndpoints;


