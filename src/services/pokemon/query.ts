import { useInfiniteQuery, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Pokemon, PokemonListResponse } from '../../types/pokemon';
import PokemonApiEndpoints from './api';


const LIMIT = 20;

// 🔹 Hook for Pagination (Manual Page Control)
export const usePaginatedPokemon = (page: number, limit: number = LIMIT) => {
  const offset = (page - 1) * limit;

  return useQuery<PokemonListResponse, Error>({
    queryKey: ['pokemonPaginated', page],
    queryFn: () => PokemonApiEndpoints.fetchPokemonList(limit, offset),
    staleTime: 1000 * 60 * 5,
  });
};

// 🔹 Hook for Infinite Scroll / Load More
export const useInfinitePokemon = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonInfinite'],
    queryFn: ({ pageParam = 0 }) => PokemonApiEndpoints.fetchPokemonList(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const match = lastPage.next?.match(/offset=(\d+)/);
      return match ? parseInt(match[1]) : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// 🔹 Hook for single Pokémon detail
export const usePokemon = (id: string): UseQueryResult<Pokemon | undefined, Error> => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => PokemonApiEndpoints.fetchPokemonById(id),
    enabled: !!id,
  });
};