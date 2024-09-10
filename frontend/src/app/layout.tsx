import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { AuthProvider } from './context/auth-context';
import ReactQueryProvider from '@/lib/react-query-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Superheroes',
	description: 'Superheroes encyclopedia',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ReactQueryProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							<Navbar />
							{children}
							<ToastContainer />
						</ThemeProvider>
					</ReactQueryProvider>
				</body>
			</html>
		</AuthProvider>
	);
}
