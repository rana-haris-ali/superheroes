import { useMutation, useQuery } from '@tanstack/react-query';
import { createTeam, fetchMyTeams, fetchSuperheroById, fetchSuperheroes } from './api';
import { PaginationParams } from '@/types/pagination';
import { CreateTeamType } from '@/types/team';

// Hook to fetch superhero by id
export const useSingleSuperhero = ({ id }: { id: number }) => {
	return useQuery({
		queryKey: ['single-superhero'],
		queryFn: () => fetchSuperheroById({ id }),
	})
};

// Hook to fetch all superheroes
export const useSuperheroes = (
	paginationParams: PaginationParams,
	searchText: string | null = null,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: ['superheroes', paginationParams.page, searchText],
		queryFn: () => fetchSuperheroes(paginationParams, searchText),
		enabled,
		/* important for appending new page results, otherwise the UI will jump*/
		placeholderData: (prev) => prev
	})
};

// Hook to fetch teams of the logged-in user
export const useMyTeams = () => {
	return useQuery({
		queryKey: ['my-teams'],
		queryFn: fetchMyTeams,
	})
};


// Hook to create a team
export const useCreateTeam = (teamParams: CreateTeamType) => {
	return useMutation({
		mutationFn: () => createTeam(teamParams),
		mutationKey: ['create-team'],
	})
};
