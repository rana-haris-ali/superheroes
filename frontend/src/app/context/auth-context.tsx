'use client';

import React, {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect,
} from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '@/lib/axios';

type LoginParams = { email: string; password: string };

// Define the shape of the context value
interface AuthContextType {
	token: string | null;
	name: string | null;
	isAuthenticated: boolean;
	login: (loginParams: LoginParams) => Promise<void>;
	logout: () => void;
}

// Create a default value for the context
const defaultContextValue: AuthContextType = {
	isAuthenticated: false,
	token: null,
	name: null,
	login: async () => {},
	logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const tokenFromStorage = sessionStorage.getItem('token');
		const nameFromStorage = sessionStorage.getItem('name');
		if (tokenFromStorage && nameFromStorage) {
			setToken(tokenFromStorage);
			setName(nameFromStorage);
			setIsAuthenticated(true);
		}
	}, []);

	const login = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const formData = new FormData();
			/* because the FastAPI oauth package excepts username field,
			 we send the email labelled as username */
			formData.append('username', email);
			formData.append('password', password);
			const response = await apiClient.post('/auth/login', formData, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});

			apiClient.defaults.headers.common[
				'Authorization'
			] = `Bearer ${response.data.access_token}`;

			setToken(response.data.access_token);
			setName(response.data.name);
			sessionStorage.setItem('token', response.data.access_token);
			sessionStorage.setItem('name', response.data.name);
			setIsAuthenticated(true);
			toast(`Welcome back ${response.data.name}!`, {
				type: 'success',
			});
			router.push(searchParams.get('redirect') ?? '/');
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				// Checking if the error is AxiosError and has a `response` property
				toast(error.response.data.detail ?? 'Something went wrong!', {
					type: 'error',
				});
			} else {
				// If error doesn't have a response or isn't an Axios error
				toast('An unexpected error occurred!', {
					type: 'error',
				});
			}
		}
	};

	const logout = () => {
		setToken(null);
		setName(null);
		setIsAuthenticated(false);
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('name');
		delete axios.defaults.headers.common['Authorization'];
		toast('Logged out successfully!', {
			type: 'success',
		});
		router.push('/');
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, token, name, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth() {
	return useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };
