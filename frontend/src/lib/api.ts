import { Paginated, PaginationParams } from '@/types/pagination';
import apiClient from './axios'; // Import the Axios instance
import { SuperheroBaseType } from '@/types/superhero'

// Fetch superheroes
export const fetchSuperheroes = async (paginationParams: PaginationParams): Promise<Paginated<SuperheroBaseType>> => {
	const response = await apiClient.get('/superheroes', {
		params: paginationParams
	});
	return response.data;
};

