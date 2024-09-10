import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<main className='flex flex-col items-center p-4 md:p-10'>
				<Card className='w-full max-w-3xl'>
					<CardHeader className='flex flex-col items-center'>
						<Skeleton className='w-48 h-48 rounded-full' />
						<Skeleton className='h-6 w-40 mt-4' />
						<Skeleton className='h-4 w-32 mt-2' />
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						{/* Personal Details Skeleton */}
						<div className='flex flex-col items-start'>
							<Skeleton className='h-6 w-48 mb-4' />
							<Skeleton className='h-4 w-64 mb-2' />
							<Skeleton className='h-4 w-56 mb-2' />
							<Skeleton className='h-4 w-60 mb-2' />
							<Skeleton className='h-4 w-48 mb-2' />
							<Skeleton className='h-4 w-52 mb-2' />
							<Skeleton className='h-4 w-40 mb-2' />
							<Skeleton className='h-4 w-64 mb-2' />
							<Skeleton className='h-4 w-58 mb-2' />
							<Skeleton className='h-4 w-54 mb-2' />
							<Skeleton className='h-4 w-48 mb-2' />
							<Skeleton className='h-4 w-50 mb-2' />
							<Skeleton className='h-4 w-62 mb-2' />
							<Skeleton className='h-4 w-60 mb-2' />
							<Skeleton className='h-4 w-64 mb-2' />
						</div>

						{/* Power Stats Skeleton */}
						<div className='flex flex-col items-start'>
							<Skeleton className='h-6 w-48 mb-4' />
							{Array.from({ length: 6 }).map((_, index) => (
								<div className='w-full mb-4' key={index}>
									<div className='flex items-center justify-between mb-2'>
										<Skeleton className='h-4 w-28' />
										<Skeleton className='h-4 w-12' />
									</div>
									<Skeleton className='h-2 w-full' />
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
