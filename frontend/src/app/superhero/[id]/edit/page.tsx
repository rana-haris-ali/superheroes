'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/app/context/auth-context';
import {
	useSingleSuperhero,
	useUpdateSuperhero,
} from '@/lib/react-query-hooks';
import Image from 'next/image';
import { useEffect } from 'react';
import { JwtPayload as OriginalJwtPayload, jwtDecode } from 'jwt-decode';
import { attributes } from '@/lib/superhero-attributes';
import { useRouter } from 'next/navigation';
import SingleSuperheroSkeleton from '@/components/single-superhero-skeleton';

// Extend the JwtPayload type
interface JwtPayload extends OriginalJwtPayload {
	is_admin?: boolean; // Add `is_admin` property to the JwtPayload type
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 3 characters.',
	}),
	intelligence: z.number().min(0).max(100),
	strength: z.number().min(0).max(100),
	speed: z.number().min(0).max(100),
	durability: z.number().min(0).max(100),
	power: z.number().min(0).max(100),
	combat: z.number().min(0).max(100),
});

export default function EditSuperhero({ params }: { params: { id: string } }) {
	const superheroId = parseInt(params.id);
	const { token } = useAuth();
	const router = useRouter();
	const { data: superhero, isLoading } = useSingleSuperhero({
		id: superheroId,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			intelligence: 50,
			strength: 50,
			speed: 50,
			durability: 50,
			power: 50,
			combat: 50,
		},
	});

	const useUpdateSuperheroMutation = useUpdateSuperhero(superheroId, {
		...form.getValues(),
	});

	// Update form default values once superhero data is available
	useEffect(() => {
		if (superhero) {
			form.reset({
				name: superhero.name,
				intelligence: superhero.intelligence as number,
				strength: superhero.strength as number,
				speed: superhero.speed as number,
				durability: superhero.durability as number,
				power: superhero.power as number,
				combat: superhero.combat as number,
			});
		}
	}, [superhero, form]);

	useEffect(() => {
		if (!token) return;

		const decodedToken = jwtDecode<JwtPayload>(token);

		if (!decodedToken.is_admin) {
			toast('Only admins can access this page', { type: 'error' });
			router.push(`/login`);
		}
	}, [token, router]);

	function onSubmit() {
		useUpdateSuperheroMutation.mutate(undefined, {
			onSuccess: () => {
				toast('Superhero updated successfully!', { type: 'success' });
			},
			onError: (error) => {
				toast(error.message ?? 'Something went wrong!', { type: 'error' });
			},
		});
	}

	if (isLoading) return <SingleSuperheroSkeleton />;

	return (
		<Card className='w-full max-w-2xl mx-auto my-10'>
			<CardHeader className='flex items-center justify-center'>
				<Image
					src={superhero?.image_url ?? '/superhero-avatar.jpg'}
					alt={superhero?.name ?? 'Superhero Avatar'}
					className='w-48 h-48 rounded-full'
					height={40}
					width={40}
				/>
				<CardTitle>Edit Superhero</CardTitle>
				<CardDescription>
					Modify the attributes of your superhero.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder={`${superhero?.name}`} {...field} />
									</FormControl>
									<FormDescription>
										This is the public name of your superhero.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{attributes.map((attribute) => (
							<FormField
								key={attribute}
								control={form.control}
								name={attribute as keyof z.infer<typeof formSchema>}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='capitalize'>{attribute}</FormLabel>
										<FormControl>
											<Slider
												min={0}
												max={100}
												step={1}
												value={[field.value as number]}
												onValueChange={(value) => field.onChange(value[0])}
											/>
										</FormControl>
										<FormDescription className='text-right'>
											{field.value}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
						<Button type='submit'>Update Superhero</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
