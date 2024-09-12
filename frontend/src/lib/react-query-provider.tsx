'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth } from '@/app/context/auth-context';

export default function ReactQueryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());
	const { isAuthenticated } = useAuth();

	// reset all queries on auth state change
	useEffect(()=>{
		queryClient.resetQueries()
	}, [isAuthenticated, queryClient])

	return (
		<QueryClientProvider client={queryClient}>
			{/* TODO remove when going to production */}
			{/* <ReactQueryDevtools /> */}
			{children}
		</QueryClientProvider>
	);
}
