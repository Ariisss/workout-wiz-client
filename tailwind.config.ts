import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: 'var(--background)',
					darker: 'var(--background-darker)',
					darkest: 'var(--background-darkest)'
				},
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					light: 'var(--primary-light)',
					DEFAULT: 'var(--primary)',
					dark: 'var(--primary-dark)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				bramham: ['var(--font-bramham-serif)'],
				sans: ['var(--font-poppins)', 'sans-serif'],
				sora: ['var(--font-sora)', 'sans-serif'],
				roboto: ['var(--font-roboto)', 'sans-serif']
			},
			dropShadow: {
				glow: "0px 0px 12px var(--primary-light)"
			},
			textShadow: { // defaults to {}
				'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
				'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
			},
			animation: {
				'fade-left-lock': 'fade-left 1s cubic-bezier(0.4, 1, 1, 0.2)',
				'fade-up-lock': 'fade-up 1s cubic-bezier(0.42, 0, 0.58, 1)',
				'fade-lock': 'fade 1s ease-out'
			},
			keyframes: {
				'fade-left': {
					'0%': {
						transform: 'translateX(200px)',
						opacity: '0',
					},
					'20%': {
						transform: 'translateX(0)',
					},
					'80%': {
						transform: 'translateX(-50px)',
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1',
					},
				},
				'fade-up': {
					'0%': {
						transform: 'translateY(200px)',
						opacity: '0',
					},
					'20%': {
						transform: 'translateY(0)',
					},
					'80%': {
						transform: 'translateY(-50px)',
					},
					'90%': {
						transform: 'translateY(0)',
						opacity: '1',
					},
				},
				'fade': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '0.9',
					}
				}
			},
		}
	},
	plugins: [
		require("tailwindcss-animated"),
		require("@tailwindcss/typography")
	],
} satisfies Config;
