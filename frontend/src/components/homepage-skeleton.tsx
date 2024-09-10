import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomepageSkeleton() {
	return (
		<div className='flex flex-col min-h-screen bg-muted/40'>
			<main className='flex-1 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6'>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
				<Card className='relative'>
					<Skeleton className='h-[400px] w-full' />
					<CardHeader className='p-4'>
						<Skeleton className='h-6 w-3/4 mb-2' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
				</Card>
			</main>
		</div>
	);
}
