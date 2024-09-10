import { useQuery } from '@tanstack/react-query';
import { fetchSuperheroes } from './api';
import { PaginationParams } from '@/types/pagination';

// Hook to fetch all superheroes
export const useSuperheroes = (paginationParams: PaginationParams) => {
	return useQuery({
		queryKey: ['superheroes', paginationParams.page],
		queryFn: () => fetchSuperheroes(paginationParams),
		/* important for appending new page results, otherwise the UI will jump*/
		placeholderData: (prev) => prev
	})
};
