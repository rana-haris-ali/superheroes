'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	useCreateFavoriteSuperhero,
	useFavoriteSuperheroById,
	useRemoveFavoriteSuperhero,
	useSingleSuperhero,
} from '@/lib/react-query-hooks';
import Image from 'next/image';
import Skeleton from '@/components/single-superhero-skeleton';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import { useAuth } from '@/app/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
	const superheroId = parseInt(params.id);
	const queryClient = useQueryClient();
	const [isLiked, setIsLiked] = useState(false);
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { data, error, isLoading } = useSingleSuperhero({
		id: superheroId,
	});

	const { data: isLikedResponse } = useFavoriteSuperheroById({
		superheroId,
		enabled: isAuthenticated,
	});

	const createFavoriteSuperheroMutation =
		useCreateFavoriteSuperhero(superheroId);

	const removeFavoriteSuperheroMutation =
		useRemoveFavoriteSuperhero(superheroId);

	// set state on response from server
	useEffect(() => {
		if (isLikedResponse) {
			setIsLiked(true);
		}
	}, [isLikedResponse]);

	if (isLoading) return <Skeleton />;

	if (error) {
		toast(error.message, { type: 'error' });
	}

	const handleHeartClick = () => {
		if (!isAuthenticated) {
			return router.push(`/login?redirect=${pathname}`);
			
		}

		if (isLiked) {
			removeFavoriteSuperheroMutation.mutate(undefined, {
				onSuccess: () => {
					setIsLiked(false);
				},
			});
		} else {
			createFavoriteSuperheroMutation.mutate(undefined, {
				onSuccess: () => {
					setIsLiked(true);
				},
			});
		}
	};

	return (
		<div className='flex flex-col w-full min-h-screen'>
			<main className='flex flex-col items-center p-4 md:p-10'>
				<Card className='w-full max-w-3xl'>
					<CardHeader className='flex flex-col items-center'>
						<Image
							src={data?.image_url ?? '/superhero-avatar.jpg'}
							alt={data?.name ?? 'Superhero Avatar'}
							className='w-48 h-48 rounded-full'
							height={100}
							width={100}
						/>
						<CardTitle className='text-2xl font-bold mt-4'>
							{data?.name}
						</CardTitle>
						<CardDescription className='text-muted-foreground'>
							{data?.publisher}
						</CardDescription>
						<button
							onClick={handleHeartClick}
							className='focus:outline-none'
							aria-label={isLiked ? 'Unlike' : 'Like'}
						>
							<Heart
								className={`w-6 h-6 ${
									isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
								} 
                          transition-colors duration-200 ease-in-out hover:text-red-400`}
							/>
						</button>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold'>Personal Details</h3>
							{data?.full_name && (
								<p>
									<strong>Full Name:</strong> {data?.full_name}
								</p>
							)}
							{data?.alter_egos && (
								<p>
									<strong>Alter Egos:</strong> {data?.alter_egos}
								</p>
							)}
							{data?.place_of_birth && (
								<p>
									<strong>Place of Birth:</strong> {data?.place_of_birth}
								</p>
							)}
							{data?.first_appearance && (
								<p>
									<strong>First Appearance:</strong> {data.first_appearance}
								</p>
							)}
							{data?.alignment && (
								<p>
									<strong>Alignment:</strong> {data.alignment}
								</p>
							)}
							{data?.gender && (
								<p>
									<strong>Gender:</strong> {data.gender}
								</p>
							)}
							{data?.race && (
								<p>
									<strong>Race:</strong> {data.race}
								</p>
							)}
							{(data?.height_cm || data?.height_feet) && (
								<p>
									<strong>Height:</strong> {`${data?.height_cm} cm`}{' '}
									{`/ ${data.height_feet}`}
								</p>
							)}
							{(data?.weight_kg || data?.weight_lb) && (
								<p>
									<strong>Weight:</strong> {`${data?.weight_kg} kg`}{' '}
									{`/ ${data.weight_lb} lbs`}
								</p>
							)}
							{data?.eye_color && (
								<p>
									<strong>Eye Color:</strong> {data?.eye_color}
								</p>
							)}
							{data?.hair_color && (
								<p>
									<strong>Hair Color:</strong> {data?.hair_color}
								</p>
							)}
							{data?.occupation && (
								<p>
									<strong>Occupation:</strong> {data?.occupation}
								</p>
							)}
							{data?.base && (
								<p>
									<strong>Base:</strong> {data?.base}
								</p>
							)}
							{data?.group_affiliation && (
								<p>
									<strong>Group Affiliation:</strong> {data?.group_affiliation}
								</p>
							)}
						</div>
						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold'>Power Stats</h3>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Intelligence</span>
									<span>{data?.intelligence ?? 'N/A'}</span>
								</div>
								<Progress value={data?.intelligence ?? 0} />
							</div>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Strength</span>
									<span>{data?.strength ?? 'N/A'}</span>
								</div>
								<Progress value={data?.strength ?? 0} />
							</div>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Speed</span>
									<span>{data?.speed ?? 'N/A'}</span>
								</div>
								<Progress value={data?.speed ?? 0} />
							</div>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Durability</span>
									<span>{data?.durability ?? 'N/A'}</span>
								</div>
								<Progress value={data?.durability ?? 0} />
							</div>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Power</span>
									<span>{data?.power ?? 'N/A'}</span>
								</div>
								<Progress value={data?.power ?? 0} />
							</div>
							<div className='w-full'>
								<div className='flex items-center justify-between mb-2'>
									<span>Combat</span>
									<span>{data?.combat ?? 'N/A'}</span>
								</div>
								<Progress value={data?.combat ?? 0} />
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
