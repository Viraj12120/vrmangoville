import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
		],
		unoptimized: true,
	},
};

export default nextConfig;
