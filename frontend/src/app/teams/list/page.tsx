'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMyTeams } from '@/lib/react-query-hooks';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useRouter } from 'next/navigation';
import { SuperheroBaseType } from '@/types/superhero';
import HomepageSkeleton from '@/components/homepage-skeleton';
import { H4 } from '@/components/ui/typography';

// Component for displaying overlapping team member images
const TeamMemberImages = ({ members }: { members: SuperheroBaseType[] }) => {
	return (
		<div className='flex justify-center -space-x-4 rtl:space-x-reverse'>
			{members.slice(0, 10).map((member, index) => (
				<Image
					key={member.id}
					src={member.image_url ?? '/superhero-avatar.jpg'}
					width={20}
					height={20}
					alt={member.name}
					className='w-16 h-16 rounded-full border-2 border-white object-cover'
					style={{
						transform: `rotate(${index * 5 - 5}deg)`,
						zIndex: 10 - index,
					}}
				/>
			))}
		</div>
	);
};

export default function TeamsListing() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const { data: teams, isLoading } = useMyTeams();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login?redirect=/teams/list');
		}
	}, [isAuthenticated, router]);

	if (isLoading) return <HomepageSkeleton />;

	if (!teams || !teams?.length)
		return (
			<H4 className='mt-10 text-center'>You don&apos;t have any teams yet!</H4>
		);
	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-3xl font-bold mb-8 text-center'>Teams</h1>
			<div className='flex flex-wrap justify-center gap-6'>
				{teams?.map((team) => (
					<Card key={team.id} className='w-96 overflow-hidden flex flex-col'>
						<CardHeader className='pb-0 text-center'>
							<CardTitle className='text-2xl font-bold mb-2'>
								{team.name}
							</CardTitle>
							<TeamMemberImages members={team.team_members} />
						</CardHeader>
						<CardContent className='mt-4 flex-1'>
							<div className='space-y-4'>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Speed</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.speed}%
										</span>
									</div>
									<Progress value={team.avg_attributes.speed} className='h-2' />
								</div>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Intelligence</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.intelligence}%
										</span>
									</div>
									<Progress
										value={team.avg_attributes.intelligence}
										className='h-2'
									/>
								</div>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Durability</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.durability}%
										</span>
									</div>
									<Progress
										value={team.avg_attributes.durability}
										className='h-2'
									/>
								</div>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Combat</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.combat}%
										</span>
									</div>
									<Progress
										value={team.avg_attributes.combat}
										className='h-2'
									/>
								</div>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Power</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.power}%
										</span>
									</div>
									<Progress value={team.avg_attributes.power} className='h-2' />
								</div>
								<div>
									<div className='flex justify-between mb-1'>
										<span className='text-sm font-medium'>Strength</span>
										<span className='text-sm font-medium'>
											{team.avg_attributes.strength}%
										</span>
									</div>
									<Progress
										value={team.avg_attributes.strength}
										className='h-2'
									/>
								</div>
							</div>
							<div className='mt-4'>
								<span className='text-sm font-medium'>
									Team Members: {team.team_members.length}
								</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
