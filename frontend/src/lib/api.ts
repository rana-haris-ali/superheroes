import { Paginated, PaginationParams } from '@/types/pagination';
import apiClient from './axios'; // Import the Axios instance
import { SuperheroBaseType } from '@/types/superhero'
import { UserSignupParams } from '@/types/user';

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
export const fetchSuperheroes = async (paginationParams: PaginationParams): Promise<Paginated<SuperheroBaseType>> => {
	const response = await apiClient.get('/superheroes', {
		params: paginationParams
	});
	return response.data;
};

