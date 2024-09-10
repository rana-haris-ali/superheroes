'use client';

import { useAuth } from '@/app/context/auth-context';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(50),
});

export default function Login() {
	const { login } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<div className='min-h-screen'>
			<main className='max-w-md mx-auto mt-10 p-8 rounded-lg shadow-2xl dark:shadow-muted'>
				<h2 className='text-3xl font-bold text-center mb-8'>Login</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit((data) => login({ ...data }))}>
						<div className='space-y-4'>
							<FormField
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='email'
												placeholder='Enter email address'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='password'
												placeholder='Enter password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='w-full mt-6'>
							Login
						</Button>
					</form>
				</Form>
				<p className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/signup' className='font-medium underline'>
						Create Account
					</Link>
				</p>
			</main>
		</div>
	);
}
