import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createFavoriteSuperhero,
	createTeam,
	fetchFavoriteSuperheroById,
	fetchFavoriteSuperheroes,
	fetchMyTeams,
	fetchTeams,
	fetchSuperheroById,
	fetchSuperheroes,
	removeFavoriteSuperhero,
	suggestSuperheroesForTeam,
	updateSuperhero
} from './api';
import { PaginationParams } from '@/types/pagination';
import { CreateTeamType } from '@/types/team';
import { SuperheroSuggestionParams, SuperheroUpdatePayload } from '@/types/superhero';

// Hook to fetch superhero by id
export const useSingleSuperhero = ({ id }: { id: number }) => {
	return useQuery({
		queryKey: ['single-superhero', id],
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
export const useMyTeams = (searchText: string | null = null, enabled: boolean = true) => {
	return useQuery({
		queryKey: ['my-teams', searchText],
		queryFn: () => fetchMyTeams(searchText),
		enabled
	})
};

// Hook to fetch all teams
export const useAllTeams = (searchText: string | null = null, enabled: boolean = true) => {
	return useQuery({
		queryKey: ['all-teams', searchText],
		queryFn: () => fetchTeams(searchText),
		enabled
	})
};

// Hook to create a team
export const useCreateTeam = (teamParams: CreateTeamType) => {
	return useMutation({
		mutationFn: () => createTeam(teamParams),
		mutationKey: ['create-team'],
	})
};


// Hook to fetch superhero suggestion for a team
export const useTeamSuggestion = ({
	superheroSuggestionParams,
	sortingPriority = undefined,
	enabled = false
}: {
	superheroSuggestionParams: SuperheroSuggestionParams,
	sortingPriority: string | undefined,
	enabled: boolean
}
) => {
	return useQuery({
		queryFn: () => suggestSuperheroesForTeam(superheroSuggestionParams, sortingPriority),
		queryKey: ['suggest-team', superheroSuggestionParams, sortingPriority],
		enabled
	})
};

// Hook to fetch favorite superheroes of user
export const useFavoriteSuperheroes = ({
	enabled = false
}: {
	enabled: boolean
}) => {
	return useQuery({
		queryKey: ['favorite-superheroes'],
		queryFn: fetchFavoriteSuperheroes,
		enabled
	})
};

// Hook to fetch superhero if liked by the user
export const useFavoriteSuperheroById = ({
	superheroId,
	enabled = false
}: {
	superheroId: number,
	enabled: boolean
}) => {
	return useQuery({
		queryKey: [`favorite-superhero-${superheroId}`],
		queryFn: () => fetchFavoriteSuperheroById(superheroId),
		enabled
	})
};

// Hook to create a team
export const useCreateFavoriteSuperhero = (superheroId: number) => {
	return useMutation({
		mutationFn: () => createFavoriteSuperhero(superheroId),
		mutationKey: [`favorite-superhero-${superheroId}`],
	})
};

// Hook to create a team
export const useRemoveFavoriteSuperhero = (superheroId: number) => {
	return useMutation({
		mutationFn: () => removeFavoriteSuperhero(superheroId),
		mutationKey: [`favorite-superhero-${superheroId}`],
	})
};

export const useUpdateSuperhero = (superheroId: number, updatePayload: SuperheroUpdatePayload) => {
	return useMutation({
		mutationFn: () => updateSuperhero(superheroId, updatePayload),
		mutationKey: ['single-superhero', 'superheroes', superheroId],
	}
	);
};