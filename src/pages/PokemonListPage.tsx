import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import PokemonCard from '../components/pokemon/Card';
import ErrorDisplay from '../components/shared/ErrorDisplay';
import MainButton from '../components/shared/MainButton';
import SkeletonCard from '../components/shared/SkeletonCard';
import { useInfinitePokemon, usePaginatedPokemon } from '../services/pokemon/query';
import type { PokemonListResult } from '../types/pokemon';


const PAGE_LIMIT = 20; // Number of Pokémon per page

const PokemonListPage: React.FC = () => {
  const [view, setView] = useState<'pagination' | 'load-more'>('pagination');
  const [page, setPage] = useState(1);


  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 🔹 Pagination Mode
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
    error: paginatedError,
    refetch,
  } = usePaginatedPokemon(page, PAGE_LIMIT);

  const totalPages = paginatedData?.count ? Math.ceil(paginatedData?.count / 20) : 0;

  // 🔹 Infinite Scroll / Load More Mode
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isInfiniteError,
    error: infiniteError,
  } = useInfinitePokemon();

  const allPokemon = infiniteData?.pages.flatMap(p => p.results) || [];

  const handleRetry = () => {
    window.location.reload(); // Simple retry
  };



  // 🔹 Infinite Scroll: Auto-fetch when user scrolls to bottom
  useEffect(() => {
    if (view !== 'load-more') return;
    if (!hasNextPage || isFetchingNextPage) return;

    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('✅ Fetching next page...');
          fetchNextPage();
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [view, hasNextPage, isFetchingNextPage, fetchNextPage]);


  console.log('hasNextPage:', hasNextPage);
  console.log('isFetchingNextPage:', isFetchingNextPage);
  console.log('Total Pokémon loaded:', allPokemon.length);
  return (
    <div className="min-h-screen pb-40">
      {/* View Toggle */}
      <div className="flex justify-center items-center mb-8 md:mb-12 gap-4">
        <div className="flex gap-2">
          <MainButton
            variant={view === 'pagination' ? 'primary' : 'outline'}
            onClick={() => setView('pagination')}
          >
            Pagination
          </MainButton>
          <MainButton
            variant={view === 'load-more' ? 'primary' : 'outline'}
            onClick={() => setView('load-more')}
          >
            Load More
          </MainButton>
        </div>
      </div>

      {/* 🔹 PAGINATION VIEW */}
      {view === 'pagination' && (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-6">
            {isPaginatedLoading && page === 1 ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : isPaginatedError ? (
              <div className="col-span-full">
                <ErrorDisplay message={(paginatedError as Error)?.message} onRetry={handleRetry} />
              </div>
            ) : (
              paginatedData?.results?.map((p: PokemonListResult) => {
                // Get ID from URL ===> Is the last part of the URL
                const id = p.url.split('/').filter(Boolean).pop();
                return (
                  <Link to={`/pokemon/${id}`} key={id}>
                    <PokemonCard name={p.name} imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
                  </Link>
                );
              })
            )}
          </div>

          <div className="">
            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              <MainButton
                onClick={() => setPage(1)}
                disabled={page <= 1}
                variant="outline"
                className="px-3 py-1"
              >
                First
              </MainButton>
              <MainButton
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page <= 1}
                variant="outline"
                className="px-3 py-1"
              >
                Previous
              </MainButton>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {renderPageNumbers(page, totalPages, setPage)}
              </div>



              <MainButton
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page >= totalPages}
                variant="outline"
                className="px-3 py-1"
              >
                Next
              </MainButton>
              <MainButton
                onClick={() => setPage(totalPages)}
                disabled={page >= totalPages}
                variant="outline"
                className="px-3 py-1"
              >
                Last
              </MainButton>
            </div>
            <p className="text-cyan-500 mt-4 mx-auto text-center">
              Page {page} of {totalPages} ({PAGE_LIMIT} On Each Page)
            </p>

          </div>
        </>
      )}

      {/* 🔹 LOAD MORE / INFINITE SCROLL VIEW */}
      {view === 'load-more' && (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6" ref={gridRef}>
            {allPokemon.length === 0 && isFetchingNextPage ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              allPokemon.map((p) => {
                const id = p.url.split('/').filter(Boolean).pop();
                return (
                  <Link to={`/pokemon/${id}`} key={id}>
                    <PokemonCard name={p.name} imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
                  </Link>
                );
              })
            )}
          </div>

          {/* Loading Indicator */}
          <div ref={loadMoreRef} className="flex justify-center py-4 h-20">
          </div>
          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <p className="text-sm text-green-500">
                Fetching more Pokémon...
              </p>
            </div>
          )}

          {/* Error */}
          {isInfiniteError && !isFetchingNextPage && (
            <div className="text-center mt-4">
              <ErrorDisplay message={(infiniteError as Error)?.message} onRetry={() => refetch()} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// 🔹 Render Page Numbers (1, 2, 3, ..., 66)
const renderPageNumbers = (
  currentPage: number,
  totalPages: number,
  setPage: (page: number) => void
) => {
  console.log('currentPage:', currentPage)
  console.log('totalPages:', totalPages)
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${i === currentPage
            ? 'bg-black text-white font-bold cursor-pointer'
            : 'hover:bg-gray-200 bg-white text-gray-700'
            }`}
        >
          {i}
        </button>
      );
    }
  } else {
    pages.push(
      <button
        key={1}
        onClick={() => setPage(1)}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-black text-white cursor-pointer' : 'bg-white hover:bg-gray-200'}`}
      >
        1
      </button>
    );

    if (currentPage > 3) pages.push(<span key="dots1">...</span>);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i === 1 || i === totalPages) continue;
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${i === currentPage
            ? 'bg-black text-white font-bold cursor-pointer'
            : 'hover:bg-gray-200 bg-white text-gray-700'
            }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) pages.push(<span key="dots2">...</span>);

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`px-3 py-1 rounded ${currentPage === totalPages
            ? 'bg-black text-white font-bold cursor-pointer'
            : 'hover:bg-gray-200 bg-white text-gray-700'
            }`}
        >
          {totalPages}
        </button>
      );
    }
  }

  return pages;
};

export default PokemonListPage;