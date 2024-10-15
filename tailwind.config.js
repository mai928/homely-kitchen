/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			colors: {
				primary_Color_Light: "#FF9653",
				primary_Color_Meduim: "#E96D1F",
				primary_Color_dark: "#E96D1F",
				dark_gray: "#666666",
				light_gray:"#f0f0f0",
				meduim_gray:"#666",
			},
		},
	},
	plugins: [],
};
