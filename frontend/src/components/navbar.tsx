'use client';

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SVGProps } from 'react';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '@/app/context/auth-context';
import { LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Navbar() {
	const { name, isAuthenticated, logout } = useAuth();

	return (
		<header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6  bg-[#F0F0F0] dark:bg-[#1F1F1F]'>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='lg:hidden'>
						<MenuIcon className='h-6 w-6' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<div className='grid gap-2 py-6'>
						{name && (
							<p className='text-lg font-semibold underline'>Hi, {name}!</p>
						)}
						<Link
							href='/'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Superheroes
						</Link>
						<Link
							href='/favorites'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Favorites
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger className='flex w-full items-center py-2 text-lg font-semibold'>
								Team Options
								<ChevronDownIcon className='h-4 w-4' />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Link
										href='/teams/create'
										className='flex items-center gap-2'
										prefetch={false}
									>
										Create Team
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href='#'
										className='flex items-center gap-2'
										prefetch={false}
									>
										Team Recommendation
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href='/teams/fight'
										className='flex items-center gap-2'
										prefetch={false}
									>
										Team Fight!
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href='/teams/list'
										className='flex items-center gap-2'
										prefetch={false}
									>
										My Teams
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{isAuthenticated ? (
							<Button
								onClick={() => logout()}
								className='bg-primary px-4 py-2 rounded-md hover:bg-red-600 transition-all'
							>
								Logout <LogOut className='ml-2' />
							</Button>
						) : (
							<>
								<Link
									href='/login'
									className='flex w-full items-center py-2 text-lg font-semibold'
									prefetch={false}
								>
									Login
								</Link>
								<Link
									href='/signup'
									className='flex w-full items-center py-2 text-lg font-semibold'
									prefetch={false}
								>
									Signup
								</Link>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>
			<Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
				<SiteIcon className='h-20 w-20' />
				<span className='sr-only'>Superheroes Homepage</span>
			</Link>
			<nav className='ml-auto hidden lg:flex items-center gap-6'>
				{name && <p className='text-lg font-semibold underline'>Hi, {name}!</p>}
				<Link
					href='/'
					className='group inline-flex h-9 w-max justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
					prefetch={false}
				>
					Superheroes
				</Link>
				<Link
					href='/favorites'
					className='group inline-flex h-9 w-max justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
					prefetch={false}
				>
					Favorites
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger className='group inline-flex h-9 w-max justify-center items-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'>
						Team Options
						<ChevronDownIcon className='h-4 w-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link
								href='/teams/create'
								className='flex items-center gap-2'
								prefetch={false}
							>
								Create Team
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='#'
								className='flex items-center gap-2'
								prefetch={false}
							>
								Team Recommendation
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/teams/fight'
								className='flex items-center gap-2'
								prefetch={false}
							>
								Team Fight!
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/teams/list'
								className='flex items-center gap-2'
								prefetch={false}
							>
								My Teams
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{isAuthenticated ? (
					<Button
						onClick={() => logout()}
						className='bg-primary px-4 py-2 rounded-md hover:bg-red-600 transition-all'
					>
						Logout <LogOut className='ml-2' />
					</Button>
				) : (
					<>
						<Link
							href='/login'
							className='group inline-flex h-9 w-max justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
							prefetch={false}
						>
							Login
						</Link>
						<Link
							href='/signup'
							className='group inline-flex h-9 w-max justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
							prefetch={false}
						>
							Signup
						</Link>
					</>
				)}
				<ThemeToggle />
			</nav>
		</header>
	);
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	);
}

function SiteIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			version='1.0'
			width='512.000000pt'
			height='512.000000pt'
			viewBox='0 0 512.000000 512.000000'
			preserveAspectRatio='xMidYMid meet'
		>
			<metadata>
				Created by potrace 1.16, written by Peter Selinger 2001-2019
			</metadata>
			<g
				transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
				fill='#FF0000'
				stroke='none'
			>
				<path d='M1122 3714 c19 -27 74 -107 122 -179 49 -71 107 -150 129 -174 l42 -44 -50 28 c-56 32 -208 132 -305 202 -36 26 -59 40 -52 31 23 -28 298 -269 338 -295 92 -61 59 -51 -106 32 -95 48 -119 56 -157 53 l-46 -3 99 -73 c54 -41 142 -98 194 -128 108 -62 112 -71 10 -19 -39 19 -70 33 -70 29 0 -24 172 -218 184 -207 2 2 3 -3 3 -11 -1 -9 54 -72 123 -141 94 -94 122 -128 111 -134 -18 -12 -9 -80 26 -186 27 -83 34 -173 20 -255 l-8 -46 46 -32 c64 -45 126 -45 184 1 22 17 43 43 46 57 4 14 10 35 15 46 11 28 -7 54 -65 94 -53 36 -54 47 -19 134 17 44 33 67 51 75 14 6 26 10 27 9 23 -43 73 -99 141 -161 85 -78 85 -78 70 -106 -76 -148 -73 -256 9 -377 19 -28 23 -42 16 -55 -6 -10 -10 -31 -10 -47 0 -34 29 -122 40 -122 12 0 80 78 90 103 5 12 11 34 15 50 3 15 29 51 59 80 46 46 56 52 75 43 15 -6 35 -6 61 1 l39 10 31 -50 c28 -45 30 -55 24 -103 -5 -47 -4 -53 16 -64 11 -6 34 -8 50 -5 20 4 37 1 52 -9 30 -22 71 -20 119 4 44 23 63 58 54 100 -4 17 3 45 20 81 41 89 29 190 -40 338 -19 40 -35 82 -35 93 0 11 24 41 55 70 31 28 67 70 81 93 l25 43 58 -28 c52 -25 59 -32 64 -65 11 -68 53 -123 133 -174 40 -26 83 -59 94 -74 l21 -26 -22 -48 c-28 -60 -31 -133 -6 -161 14 -15 32 -20 86 -21 59 -1 73 2 95 21 l26 23 -19 80 c-11 44 -27 114 -36 155 -72 317 -79 336 -152 411 l-44 46 56 48 c31 27 88 85 128 129 39 45 94 100 123 124 54 44 109 114 103 130 -2 5 -38 -5 -79 -24 -41 -18 -82 -33 -90 -33 -8 0 17 14 55 31 74 33 191 107 264 167 24 20 55 46 69 57 l26 21 -54 -4 c-42 -4 -76 -17 -140 -53 -86 -49 -173 -90 -192 -90 -5 0 23 22 64 49 62 42 371 339 328 315 -8 -4 -60 -42 -115 -84 -133 -102 -214 -157 -261 -175 l-39 -16 43 36 c23 20 83 94 134 163 50 70 107 149 127 177 l36 49 -60 -49 c-78 -63 -178 -127 -235 -150 -25 -10 -76 -18 -117 -19 l-72 -3 -85 -70 -85 -71 57 -7 c98 -11 197 19 271 81 52 43 46 20 -6 -26 -105 -93 -208 -119 -338 -84 -145 37 -238 29 -335 -31 -47 -28 -62 -33 -97 -28 l-41 5 -7 57 c-17 154 -66 226 -171 257 -108 31 -217 4 -282 -70 -29 -33 -56 -121 -64 -211 -3 -27 -7 -30 -42 -33 -27 -2 -49 3 -75 20 -95 61 -152 68 -322 37 -112 -20 -139 -21 -194 -12 -75 13 -174 60 -230 109 l-40 35 55 -30 c107 -58 233 -88 327 -76 l52 6 -67 58 c-37 32 -73 65 -81 74 -11 14 -25 16 -80 11 -114 -11 -228 29 -347 120 -32 25 -81 62 -108 82 l-50 37 36 -49z m1511 -138 c131 -39 158 -108 141 -352 l-8 -119 -8 164 c-4 90 -13 182 -20 205 l-11 41 -8 -30 c-3 -16 -7 -88 -8 -160 -2 -162 -12 -215 -42 -235 -13 -8 -38 -28 -57 -44 -37 -33 -51 -28 -33 11 10 26 10 27 -4 9 -8 -11 -15 -25 -15 -30 0 -6 -9 4 -20 22 -25 40 -35 43 -12 3 26 -47 8 -46 -55 0 -32 24 -59 44 -60 44 -8 4 -22 111 -23 180 -3 130 -12 222 -20 200 -4 -11 -13 -60 -20 -110 -17 -122 -34 -136 -27 -23 3 61 11 101 27 132 43 90 162 128 283 92z m167 -484 c-9 -14 -10 -10 -6 17 3 18 7 66 8 105 2 70 2 70 5 -17 2 -52 -1 -94 -7 -105z m-520 102 c0 -45 8 -90 26 -141 14 -41 24 -77 21 -79 -2 -3 -20 13 -40 35 -42 46 -56 112 -39 176 14 52 7 58 -13 12 -16 -40 -20 -112 -7 -149 8 -21 3 -26 -44 -50 l-53 -26 -21 51 -21 52 6 -46 c9 -73 15 -101 27 -122 21 -40 104 -121 162 -159 69 -44 52 -49 -42 -12 -85 34 -138 70 -195 134 -96 106 -102 242 -14 312 34 27 38 22 17 -24 -11 -24 -19 -54 -19 -68 0 -20 3 -17 14 14 20 57 55 87 143 122 42 18 80 32 85 33 4 1 7 -29 7 -65z m33 -29 c3 -52 2 -79 -3 -65 -8 24 -14 168 -6 159 2 -2 6 -44 9 -94z m587 59 c84 -44 109 -70 127 -131 l13 -48 -4 49 c-2 29 -13 60 -26 78 -20 28 -21 29 -2 19 31 -17 70 -67 77 -102 9 -42 -3 -115 -27 -163 -30 -58 -125 -148 -188 -178 -89 -42 -112 -44 -54 -5 96 66 174 170 189 250 9 47 0 48 -20 1 l-15 -35 -35 28 c-33 27 -34 30 -29 78 7 61 -9 125 -37 151 l-22 19 19 -35 c11 -22 18 -57 18 -92 1 -62 -16 -89 -81 -129 -33 -20 -33 -21 -33 -99 0 -56 -4 -81 -15 -90 -12 -10 -13 -7 -5 22 6 18 10 56 10 84 0 36 10 74 32 125 28 64 32 85 31 157 0 45 2 82 4 82 3 0 36 -16 73 -36z m-970 -44 c18 -10 18 -12 -5 -63 -14 -28 -25 -68 -25 -88 0 -48 24 -126 47 -151 18 -20 18 -20 -27 -13 -85 13 -166 59 -202 113 -40 60 -12 147 61 194 39 25 53 29 89 24 24 -3 51 -10 62 -16z m1312 -10 c67 -19 127 -115 111 -179 -17 -73 -92 -121 -186 -121 -31 0 -57 2 -57 4 0 3 9 20 20 39 31 52 36 124 15 188 -10 30 -18 56 -17 59 1 3 16 8 34 11 18 4 35 7 38 8 3 0 22 -4 42 -9z m-807 -157 c34 -16 46 -33 24 -33 -15 0 -69 33 -69 42 0 11 5 10 45 -9z m274 1 c-16 -19 -50 -34 -62 -27 -10 6 42 41 62 42 11 1 11 -2 0 -15z m-265 -94 c14 -5 43 -26 66 -46 l41 -37 39 38 c26 25 52 40 80 45 l41 8 -6 -42 c-9 -53 -40 -125 -67 -153 -19 -20 -32 -23 -95 -23 l-73 0 -40 61 c-50 78 -66 124 -50 144 14 17 29 19 64 5z m-107 -97 c-3 -10 -5 -4 -5 12 0 17 2 24 5 18 2 -7 2 -21 0 -30z m886 -31 c37 -3 67 -7 67 -11 0 -13 -65 -69 -88 -76 -13 -4 -39 -8 -58 -10 -36 -2 -36 -5 -19 53 13 44 -11 20 -50 -50 -53 -95 -137 -181 -210 -214 -51 -23 -66 -26 -139 -22 -44 3 -98 12 -119 21 l-39 17 21 34 c12 18 21 36 21 40 0 16 -22 -8 -40 -43 -18 -36 -18 -40 -2 -54 43 -37 137 -67 217 -67 32 0 45 -4 35 -9 -48 -27 -225 -17 -260 14 -15 13 -19 14 -29 1 -15 -18 -69 -28 -154 -27 -46 0 -66 -3 -61 -10 4 -7 -3 -6 -17 1 -34 18 -38 24 -10 15 14 -4 21 -3 18 3 -4 5 15 12 43 15 77 9 187 63 168 83 -3 3 -33 -4 -67 -16 -94 -31 -179 -28 -252 11 -70 38 -164 133 -209 212 -17 31 -34 57 -37 57 -2 0 -2 -13 2 -30 6 -29 6 -30 -32 -30 -50 0 -103 28 -125 65 l-17 30 57 -3 c32 -2 87 3 124 12 l68 16 56 -40 c57 -40 178 -92 244 -105 19 -4 53 -12 75 -18 39 -12 38 -12 -50 -17 l-90 -5 68 -22 c82 -27 105 -39 138 -69 l26 -24 -4 32 -4 33 24 -29 24 -28 23 39 c16 30 38 48 83 71 34 18 70 32 79 32 49 0 251 89 310 137 l38 31 42 -21 c27 -14 69 -23 111 -25z m-1467 -26 c-4 -18 1 -66 9 -106 17 -83 32 -109 21 -40 l-7 45 46 -45 c25 -24 45 -48 45 -52 0 -14 -61 -9 -97 8 -52 25 -67 53 -54 103 6 23 16 59 21 81 13 48 25 53 16 6z m1565 -56 c17 -66 33 -65 26 3 l-6 52 22 -57 c13 -32 36 -72 53 -90 60 -65 59 -62 24 -123 -18 -31 -37 -58 -44 -59 -77 -20 -95 -22 -109 -11 -14 10 -8 14 37 28 29 9 63 17 76 17 22 0 23 2 17 58 -4 32 -11 69 -16 83 -8 19 -10 9 -10 -48 -1 -40 -5 -73 -9 -73 -5 0 -17 9 -27 20 -10 11 -22 17 -28 13 -6 -3 -7 -1 -3 6 4 6 12 8 18 5 7 -5 8 -2 3 6 -5 8 -8 32 -7 55 1 38 0 39 -9 13 -6 -16 -15 -28 -20 -28 -6 0 -8 -4 -5 -8 11 -18 -70 -11 -94 8 l-25 20 27 23 c14 12 38 48 52 80 14 31 29 57 35 57 5 0 15 -22 22 -50z m-1531 -233 c13 -34 25 -68 28 -75 3 -10 -2 -13 -18 -10 -19 2 -28 17 -52 88 -34 102 -35 110 -4 81 13 -12 34 -50 46 -84z m1725 -97 c19 -68 33 -126 31 -128 -2 -2 -18 1 -36 5 -27 7 -35 18 -61 78 -16 38 -29 75 -29 82 0 15 51 95 57 90 2 -2 19 -59 38 -127z m-1275 -5 c13 -14 21 -25 18 -25 -2 0 -15 11 -28 25 -13 14 -21 25 -18 25 2 0 15 -11 28 -25z m365 -9 c22 -8 36 -15 31 -16 -5 0 -3 -6 3 -13 6 -8 9 -16 7 -18 -3 -2 4 -15 16 -29 11 -14 16 -19 12 -11 -4 9 -3 12 4 8 5 -4 8 -16 5 -27 -7 -26 -37 -26 -85 0 l-37 19 -57 -25 c-45 -20 -59 -22 -65 -12 -11 17 -11 31 0 24 5 -3 11 2 14 13 5 20 49 30 132 31 l50 1 -40 14 c-31 11 -49 12 -82 3 -74 -18 -102 9 -32 32 22 8 43 18 46 23 6 9 14 8 78 -17z m222 -12 c-15 -13 -38 -24 -50 -24 -16 0 -11 7 23 29 52 33 68 30 27 -5z m-973 -4 c54 -23 56 -33 21 -102 -24 -48 -35 -92 -14 -55 10 18 59 24 59 8 0 -15 -17 -22 -60 -24 -29 -1 -46 5 -65 23 -21 20 -25 21 -25 6 0 -9 -4 -15 -9 -12 -5 3 -5 25 0 48 4 24 8 62 9 86 0 50 12 53 84 22z m953 -37 c-9 -9 -20 -13 -24 -9 -4 4 -1 11 7 16 25 16 35 11 17 -7z m-834 0 c3 -5 2 -26 -3 -48 l-7 -40 -11 28 c-16 38 -15 67 2 67 8 0 17 -3 19 -7z m747 3 c0 -2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z m-348 -32 c27 -14 43 -32 36 -39 -6 -6 -105 41 -113 54 -8 14 36 5 77 -15z m388 11 c0 -8 -13 -21 -30 -30 -26 -13 -30 -14 -30 -1 0 14 36 46 52 46 5 0 8 -7 8 -15z m180 -64 c37 -96 36 -227 -3 -260 -11 -8 -13 6 -11 77 1 48 0 71 -2 52 -6 -50 -36 -150 -45 -150 -13 0 -59 103 -71 162 l-12 56 47 57 c26 32 47 64 47 73 0 28 26 -7 50 -67z m-342 2 c2 -9 -8 -13 -32 -13 -36 0 -56 14 -34 24 22 8 61 2 66 -11z m932 -3 c12 -6 27 -37 40 -79 23 -79 26 -123 5 -76 -8 17 -14 24 -15 16 0 -16 -29 -51 -42 -51 -16 0 -7 29 14 44 12 9 17 16 10 16 -7 0 -19 15 -27 33 l-13 32 -12 -30 c-7 -16 -14 -44 -17 -62 -4 -21 -10 -30 -19 -26 -9 3 -14 -1 -14 -12 0 -9 -4 -13 -10 -10 -5 3 -10 17 -10 31 0 21 3 24 21 19 21 -7 21 -6 6 15 -18 25 -14 42 20 88 16 21 33 32 51 33 26 1 26 1 -5 10 -18 5 -33 12 -33 14 0 9 31 5 50 -5z m-1239 -41 c-5 -19 -12 -60 -16 -91 -4 -40 -11 -58 -20 -58 -11 0 -13 -9 -9 -32 9 -53 -14 -12 -27 49 -10 45 -10 56 3 70 9 10 18 27 22 39 7 22 45 68 52 62 2 -2 -1 -20 -5 -39z m469 -155 c11 -43 23 -88 26 -99 3 -11 -11 5 -30 35 -27 40 -36 65 -36 95 0 37 8 61 17 52 1 -2 12 -39 23 -83z m-300 -38 c0 -2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z' />
				<path d='M2443 3420 c-51 -22 -58 -35 -10 -15 56 23 127 27 187 11 65 -17 74 -15 26 8 -48 22 -150 21 -203 -4z' />
				<path d='M2513 2813 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z' />
				<path d='M2578 2813 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z' />
				<path d='M2505 2790 c-4 -6 14 -10 47 -10 38 0 49 3 38 10 -20 13 -77 13 -85 0z' />
				<path d='M2750 2644 l-75 -13 65 4 c36 2 76 8 90 14 32 13 13 12 -80 -5z' />
			</g>
		</svg>
	);
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m6 9 6 6 6-6' />
		</svg>
	);
}
