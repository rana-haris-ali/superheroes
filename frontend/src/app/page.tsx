'use client';

import MyPagination from '@/components/my-pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSuperheroes } from '@/lib/react-query-hooks';
import { SuperheroBaseType } from '@/types/superhero';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const pageSize = 12;
	const [selectedSuperhero, setSelectedSuperhero] =
		useState<SuperheroBaseType | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { data, error, isLoading } = useSuperheroes({
		page: currentPage,
		size: pageSize,
	});

	// Calculate total pages
	const totalPages = Math.ceil((data?.total ?? 0) / pageSize);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className='flex flex-col min-h-screen bg-muted/40'>
			<main className='flex-1 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6'>
				{data!.results.map((superhero) => (
					<Card
						key={superhero.id}
						className='relative group'
						onClick={() => setSelectedSuperhero(superhero)}
					>
						<Link href='#' className='absolute inset-0 z-10' prefetch={false}>
							<span className='sr-only'>View {superhero.name}</span>
						</Link>
						<Image
							src={superhero.image_url!}
							alt={superhero.name}
							width={400}
							height={400}
							className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
						/>
						<CardContent className='p-4'>
							<div className='flex items-center justify-between'>
								<h3 className='font-semibold'>{superhero.name}</h3>
								<Button
									variant='ghost'
									size='icon'
									// onClick={(e) => {
									// 	e.stopPropagation();
									// 	if (favorites.includes(superhero)) {
									// 		handleUnfavorite(superhero);
									// 	} else {
									// 		handleFavorite(superhero);
									// 	}
									// }}
								>
									{/* {favorites.includes(superhero) ? (
										<HeartIcon className='w-5 h-5 text-red-500' />
									) : (
										<HeartIcon className='w-5 h-5 text-muted-foreground' />
									)} */}
								</Button>
							</div>
							<p className='text-sm leading-none text-muted-foreground'>
								{superhero?.publisher}
							</p>
						</CardContent>
					</Card>
				))}
			</main>
			{selectedSuperhero && (
				<Sheet
					open={selectedSuperhero !== null}
					onOpenChange={() => setSelectedSuperhero(null)} // This ensures it closes
				>
					<SheetTrigger asChild>
						<div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
							<div className='w-full max-w-3xl'>
								<SheetContent side='bottom' className='rounded-t-2xl'>
									<div className='grid gap-6 p-6'>
										<div className='grid grid-cols-[1fr_auto] items-start gap-4'>
											<div>
												<h2 className='text-2xl font-bold'>
													{selectedSuperhero.name}
												</h2>
												<p className='text-muted-foreground'>
													{selectedSuperhero.name}
												</p>
											</div>
										</div>
										<div className='grid grid-cols-3 gap-4'>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Strength
												</div>
												<Progress
													value={selectedSuperhero.strength}
													max={100}
													aria-label={`Strength: ${selectedSuperhero.strength}`}
												/>
											</div>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Intelligence
												</div>
												<Progress
													value={selectedSuperhero.intelligence}
													max={100}
													aria-label={`Intelligence: ${selectedSuperhero.intelligence}`}
												/>
											</div>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Speed
												</div>
												<Progress
													value={selectedSuperhero.speed}
													max={100}
													aria-label={`Speed: ${selectedSuperhero.speed}`}
												/>
											</div>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Durability
												</div>
												<Progress
													value={selectedSuperhero.durability}
													max={110}
													aria-label={`Durability: ${selectedSuperhero.durability}`}
												/>
											</div>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Combat
												</div>
												<Progress
													value={selectedSuperhero.combat}
													max={101}
													aria-label={`Combat: ${selectedSuperhero.combat}`}
												/>
											</div>
											<div className='grid gap-1'>
												<div className='text-xs font-medium text-muted-foreground'>
													Power
												</div>
												<Progress
													value={selectedSuperhero.power}
													max={100}
													aria-label={`Power: ${selectedSuperhero.power}`}
												/>
											</div>
										</div>
										<div className='flex items-center justify-between'>
											<div className='flex gap-2'>
												<Button variant='secondary' className='font-bold'>
													Details
												</Button>
											</div>
										</div>
									</div>
								</SheetContent>
							</div>
						</div>
					</SheetTrigger>
				</Sheet>
			)}
			<MyPagination
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}
