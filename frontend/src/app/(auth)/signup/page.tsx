'use client';

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
import { userSignup } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const formSchema = z
	.object({
		name: z.string().min(3).max(50),
		email: z.string().email(),
		password: z.string().min(6).max(50),
		confirmPassword: z.string().min(6).max(50),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['confirmPassword'],
			});
		}
	});

export default function Signup() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const handleSignup = async (formData: z.infer<typeof formSchema>) => {
		try {
			await userSignup({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});
			toast('Welcome to the platform! Please login to explore', {
				type: 'success',
			});
			router.push('/login');
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				// Checking if the error is AxiosError and has a `response` property
				toast(error.response.data.detail ?? 'Something went wrong!', {
					type: 'error',
				});
			} else {
				// If error doesn't have a response or isn't an Axios error
				toast('An unexpected error occurred!', {
					type: 'error',
				});
			}
		}
	};

	return (
		<div className='min-h-screen mb-12'>
			<main className='max-w-md mx-auto mt-10 p-8 rounded-lg shadow-2xl dark:shadow-muted'>
				<h2 className='text-3xl font-bold text-center mb-8'>Create Account</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit((data) => handleSignup(data))}>
						<div className='space-y-4'>
							<FormField
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='text'
												placeholder='Enter your name'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='password'
												placeholder='Enter password again'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='w-full mt-6'>
							Create Account
						</Button>
					</form>
				</Form>
				<p className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/login' className='font-medium underline'>
						Login
					</Link>
				</p>
			</main>
		</div>
	);
}
