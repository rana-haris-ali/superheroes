import { Paginated, PaginationParams } from '@/types/pagination';
import apiClient from './axios'; // Import the Axios instance
import { SuperheroBaseType, SuperheroDetailsType } from '@/types/superhero'
import { UserSignupParams } from '@/types/user';
import { CreateTeamType, TeamBaseType } from '@/types/team';

// User signup
export const userSignup = async (signupParams: UserSignupParams) => {
	const response = await apiClient.post('/users', {
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
	const response = await apiClient.get('/superheroes', {
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
	const response = await apiClient.post('/teams', {
		name: teamParams.name,
		team_members: teamParams.teamMembers
	});
	return response.data;
};

