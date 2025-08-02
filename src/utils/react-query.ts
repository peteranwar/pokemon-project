import { QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      // refetchOnMount: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: 10 * 1000,
      // cacheTime: 60 * 1000,
      // optimisticResults: true,
      structuralSharing: true,
      retryOnMount: true,
      retry: 2,

    },
    mutations: {},
  },
  queryCache: new QueryCache({
    onError: (error: unknown, query: unknown) => {
      // Handle the error here
      console.log('Error:', error);
      console.log('Query:', query);
    }
  })
});
