import { Paginated, PaginationParams } from '@/types/pagination';
import apiClient from './axios'; // Import the Axios instance
import { SuperheroBaseType, SuperheroDetailsType, SuperheroSuggestionParams } from '@/types/superhero'
import { UserSignupParams } from '@/types/user';
import { CreateTeamType, TeamBaseType, TeamWithTeamMembersType } from '@/types/team';

// User signup
export const userSignup = async (signupParams: UserSignupParams) => {
	const response = await apiClient.post('/users/', {
		name: signupParams.name,
		email: signupParams.email,
		password: signupParams.password
	});
	return response.data;
};

// Fetch superheroes
export const fetchSuperheroById = async ({ id }: { id: number }): Promise<SuperheroDetailsType> => {
	const response = await apiClient.get(`/superheroes/${id}`);
	return response.data;
};

// Fetch superheroes
export const fetchSuperheroes = async (
	paginationParams: PaginationParams,
	searchText: string | null = null
): Promise<Paginated<SuperheroBaseType>> => {
	const response = await apiClient.get('/superheroes/', {
		params: {
			...paginationParams,
			...(searchText && {
				search_query: searchText
			})
		}
	});
	return response.data;
};

// create team
export const createTeam = async (
	teamParams: CreateTeamType
): Promise<TeamBaseType> => {
	const response = await apiClient.post('/teams/', {
		name: teamParams.name,
		team_members: teamParams.teamMembers
	});
	return response.data;
};

// fetch teams of logged-in user
export const fetchMyTeams = async (): Promise<TeamWithTeamMembersType[]> => {
	const response = await apiClient.get('/teams/');
	return response.data;
};

export const suggestSuperheroesForTeam = async (superheroSuggestionParams: SuperheroSuggestionParams): Promise<SuperheroBaseType[]> => {
	const response = await apiClient.get('/superheroes/suggest/', {
		params: {
			...superheroSuggestionParams
		}
	});
	return response.data;
};

export const fetchFavoriteSuperheroes = async (): Promise<SuperheroBaseType[]> => {
	const response = await apiClient.get('/superheroes/favorites');
	return response.data;
};

// return superhero if liked by the user
export const fetchFavoriteSuperheroById = async (superheroId: number): Promise<SuperheroBaseType> => {
	const response = await apiClient.get(`/superheroes/favorites/${superheroId}`);
	return response.data;
};

// create favorite superhero
export const createFavoriteSuperhero = async (superheroId: number): Promise<{ superhero_id: number }> => {
	const response = await apiClient.post('/superheroes/favorites', {
		id: superheroId
	});
	return response.data;
};

// delete favorite superhero
export const removeFavoriteSuperhero = async (superheroId: number): Promise<{ superhero_id: number }> => {
	const response = await apiClient.delete('/superheroes/favorites', {
		params: {
			superhero_id: superheroId
		}
	});
	return response.data;
};