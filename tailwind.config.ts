import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#10b981",
				"light-hover": "#f5f5f5",
				"primary-hover": "#09a870",
				dark: "#1f2937",
				"dark-hover": "#2f3a48",
			},
		},
	},
	plugins: [],
};
export default config;
