/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.superherodb.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
