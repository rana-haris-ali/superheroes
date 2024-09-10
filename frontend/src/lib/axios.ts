import axios from 'axios';

// Create an Axios instance with the backend API base URL
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// apiClient.interceptors.request.use((config) => {
// 	// Example: Add authorization token if using session storage
// 	const token = sessionStorage.getItem('token');
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// }, (error) => {
// 	return Promise.reject(error);
// });

export default apiClient;
