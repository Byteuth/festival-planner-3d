/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "wow.zamimg.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "render.worldofwarcraft.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "static.wikia.nocookie.net",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "assets.rpglogs.com",
				pathname: "/**",
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	async redirects() {
		return [
			{
				source: "/planner", 
				destination: "/planner/wow/all", 
				permanent: false,
			},
			{
				source: "/planner/", 
				destination: "/planner/wow/all", 
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
