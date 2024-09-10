import { useQuery } from '@tanstack/react-query';
import { fetchSuperheroById, fetchSuperheroes } from './api';
import { PaginationParams } from '@/types/pagination';

// Hook to fetch superhero by id
export const useSingleSuperhero = ({ id }: { id: number }) => {
	return useQuery({
		queryKey: ['single-superhero'],
		queryFn: () => fetchSuperheroById({ id }),
	})
};

// Hook to fetch all superheroes
export const useSuperheroes = (paginationParams: PaginationParams) => {
	return useQuery({
		queryKey: ['superheroes', paginationParams.page],
		queryFn: () => fetchSuperheroes(paginationParams),
		/* important for appending new page results, otherwise the UI will jump*/
		placeholderData: (prev) => prev
	})
};
