'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft } from 'lucide-react';
import { useAllTeams, useMyTeams } from '@/lib/react-query-hooks';
import { useDebounce } from 'use-debounce';
import { TeamWithTeamMembersType } from '@/types/team';
import { SuperheroAttributesType } from '@/types/superhero';
import { useAuth } from '@/app/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { attributes } from '@/lib/superhero-attributes';

function TeamCard({
	team,
	onSelect,
}: {
	team: TeamWithTeamMembersType;
	onSelect: () => void;
}) {
	return (
		<Card className='mb-4 cursor-pointer hover:bg-accent' onClick={onSelect}>
			<CardHeader className='p-4'>
				<CardTitle className='text-lg'>{team.name}</CardTitle>
			</CardHeader>
			<CardContent className='p-4 pt-0'>
				{attributes.map((attr) => {
					const teamAttributeValue =
						team.avg_attributes[attr as keyof SuperheroAttributesType];
					return (
						<div key={attr} className='flex justify-between mb-2'>
							<span className='text-sm font-medium capitalize'>{attr}</span>
							<span className='text-sm font-medium'>{teamAttributeValue}</span>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}

export default function TeamFight() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const [myTeamSearchTerm, setMyTeamSearchTerm] = useState('');
	const [allTeamsSearchTerm, setAllTeamsSearchTerm] = useState('');
	const [myTeamSearchTermDebounced] = useDebounce(myTeamSearchTerm, 500);
	const [allTeamsSearchTermDebounced] = useDebounce(allTeamsSearchTerm, 500);
	const { data: myTeamResults } = useMyTeams(
		myTeamSearchTermDebounced,
		Boolean(myTeamSearchTermDebounced)
	);
	const { data: allTeamResults } = useAllTeams(
		allTeamsSearchTermDebounced,
		Boolean(allTeamsSearchTermDebounced)
	);
	const [myTeam, setMyTeam] = useState<TeamWithTeamMembersType | undefined>(
		undefined
	);
	const [otherTeam, setOtherTeam] = useState<
		TeamWithTeamMembersType | undefined
	>(undefined);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push(`/login?redirect=${pathname}`);
		}
	}, [isAuthenticated, router, pathname]);

	// Calculate the total average attributes for each team
	const calculateAverage = (team: TeamWithTeamMembersType | undefined) => {
		if (!team) return 0;
		const total = attributes.reduce(
			(acc, attr) =>
				acc + (team.avg_attributes[attr as keyof SuperheroAttributesType] || 0),
			0
		);
		return total / attributes.length;
	};

	const myTeamAverage = useMemo(() => calculateAverage(myTeam), [myTeam]);
	const otherTeamAverage = useMemo(
		() => calculateAverage(otherTeam),
		[otherTeam]
	);

	// Function to determine the winner and reasoning
	const verdict = useMemo(() => {
		if (!myTeam || !otherTeam) return '';
		if (myTeamAverage > otherTeamAverage) {
			return `The winner is ${
				myTeam.name
			} with a higher average score of ${myTeamAverage.toFixed(
				2
			)} compared to ${otherTeam.name}'s score of ${otherTeamAverage.toFixed(
				2
			)}.`;
		} else if (myTeamAverage < otherTeamAverage) {
			return `The winner is ${
				otherTeam.name
			} with a higher average score of ${otherTeamAverage.toFixed(
				2
			)} compared to ${myTeam.name}'s score of ${myTeamAverage.toFixed(2)}.`;
		} else {
			return `It's a tie! Both teams have an equal average score of ${myTeamAverage.toFixed(
				2
			)}.`;
		}
	}, [myTeam, otherTeam, myTeamAverage, otherTeamAverage]);

	const swapTeams = () => {
		setMyTeam(otherTeam);
		setOtherTeam(myTeam);
		setMyTeamSearchTerm('');
		setAllTeamsSearchTerm('');
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold text-center mb-8'>
				Superhero Team Comparison
			</h1>
			<div className='flex flex-col lg:flex-row justify-center items-stretch gap-4'>
				<div className='flex-1'>
					<div className='mb-4'>
						<Input
							type='text'
							placeholder='Search your team...'
							value={myTeamSearchTerm}
							onChange={(e) => setMyTeamSearchTerm(e.target.value)}
							className='w-full'
							aria-label='Search your team'
						/>
					</div>
					{myTeamSearchTermDebounced && (
						<div className='mb-4 max-h-96 overflow-y-auto'>
							{myTeamResults?.map((team) => (
								<TeamCard
									key={team.name}
									team={team}
									onSelect={() => {
										setMyTeam(team);
										setMyTeamSearchTerm('');
									}}
								/>
							))}
						</div>
					)}
					<Card>
						<CardHeader>
							<CardTitle>{myTeam?.name}</CardTitle>
						</CardHeader>
						<CardContent>
							{/* render attributes */}
							{attributes.map((attr) => {
								const myTeamAttributeValue =
									myTeam?.avg_attributes[
										attr as keyof SuperheroAttributesType
									] ?? 0;
								const otherTeamAttributeValue =
									otherTeam?.avg_attributes[
										attr as keyof SuperheroAttributesType
									] ?? 0;

								return (
									<div key={attr} className='mb-4'>
										<div className='flex justify-between mb-1'>
											<span className='text-sm font-medium capitalize'>
												{attr}
											</span>
											<span className='text-sm font-medium'>
												{myTeamAttributeValue}
											</span>
										</div>
										<div className='w-full bg-secondary rounded-full h-2.5'>
											<div
												className={`h-2.5 rounded-full ${
													myTeamAttributeValue > otherTeamAttributeValue
														? 'bg-green-600'
														: myTeamAttributeValue < otherTeamAttributeValue
														? 'bg-red-600'
														: 'bg-yellow-400'
												}`}
												style={{
													width: `${myTeamAttributeValue}%`,
												}}
											></div>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>
				</div>

				<div className='flex flex-col justify-center my-4 lg:my-0'>
					<Button onClick={swapTeams} className='px-2 py-1'>
						<ArrowRightLeft className='mr-2 h-4 w-4' /> Swap Teams
					</Button>
				</div>

				<div className='flex-1'>
					<div className='mb-4'>
						<Input
							type='text'
							placeholder='Search other team...'
							value={allTeamsSearchTerm}
							onChange={(e) => setAllTeamsSearchTerm(e.target.value)}
							className='w-full'
							aria-label='Search other team'
						/>
					</div>
					{allTeamsSearchTermDebounced && (
						<div className='mb-4 max-h-96 overflow-y-auto'>
							{allTeamResults?.map((team) => (
								<TeamCard
									key={team.name}
									team={team}
									onSelect={() => {
										setOtherTeam(team);
										setAllTeamsSearchTerm('');
									}}
								/>
							))}
						</div>
					)}
					<Card>
						<CardHeader>
							<CardTitle>{otherTeam?.name}</CardTitle>
						</CardHeader>
						<CardContent>
							{/* render attributes */}
							{attributes.map((attr) => {
								const myTeamAttributeValue =
									myTeam?.avg_attributes[
										attr as keyof SuperheroAttributesType
									] ?? 0;
								const otherTeamAttributeValue =
									otherTeam?.avg_attributes[
										attr as keyof SuperheroAttributesType
									] ?? 0;

								return (
									<div key={attr} className='mb-4'>
										<div className='flex justify-between mb-1'>
											<span className='text-sm font-medium capitalize'>
												{attr}
											</span>
											<span className='text-sm font-medium'>
												{otherTeamAttributeValue}
											</span>
										</div>
										<div className='w-full bg-secondary rounded-full h-2.5'>
											<div
												className={`h-2.5 rounded-full ${
													otherTeamAttributeValue > myTeamAttributeValue
														? 'bg-green-600'
														: otherTeamAttributeValue < myTeamAttributeValue
														? 'bg-red-600'
														: 'bg-yellow-400'
												}`}
												style={{
													width: `${otherTeamAttributeValue}%`,
												}}
											></div>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>
				</div>
			</div>
			{verdict && (
				<div className='mt-12 text-center text-2xl font-bold'>{verdict}</div>
			)}
		</div>
	);
}
