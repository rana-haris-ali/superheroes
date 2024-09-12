import axios from 'axios';

// Create an Axios instance with the backend API base URL
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add a response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
	(response) => {
		// If the response is successful, just return the response
		return response;
	},
	(error) => {
		// Check if the error is a 401
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('name');
			delete axios.defaults.headers.common['Authorization'];
			// Redirect the user to the /login page
			window.location.href = '/login';
		}
		// Return a rejected promise to handle the error elsewhere if needed
		return Promise.reject(error);
	}
);

export default apiClient;
