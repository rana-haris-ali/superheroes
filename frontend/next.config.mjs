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
	experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
