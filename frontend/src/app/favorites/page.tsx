'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFavoriteSuperheroes } from '@/lib/react-query-hooks';
import { H4 } from '@/components/ui/typography';
import HomepageSkeleton from '@/components/homepage-skeleton';

export default function Favorites() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const { data: favoriteSuperheroes, isLoading } = useFavoriteSuperheroes({
		enabled: isAuthenticated,
	});

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login?redirect=/favorites');
		}
	}, [isAuthenticated, router]);

	if (isLoading) return <HomepageSkeleton />;

	if (!favoriteSuperheroes || !favoriteSuperheroes?.length)
		return (
			<H4 className='mt-10 text-center'>
				You don&apos;t have any favorites yet!
			</H4>
		);

	return (
		<main className='flex-1 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6'>
			{favoriteSuperheroes?.map((superhero) => (
				<Link key={superhero.id} href={`/superhero/${superhero.id}`}>
					<Card className='relative group'>
						<Image
							src={superhero.image_url ?? '/superhero-avatar.jpg'}
							alt={superhero.name}
							width={400}
							height={400}
							className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
						/>
						<CardContent className='p-4'>
							<div className='flex items-center justify-between'>
								<h3 className='font-semibold'>{superhero.name}</h3>
							</div>
							<p className='text-sm leading-none text-muted-foreground'>
								{superhero?.publisher}
							</p>
						</CardContent>
					</Card>
				</Link>
			))}
		</main>
	);
}
