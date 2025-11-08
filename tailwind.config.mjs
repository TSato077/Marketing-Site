import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				lg: '3rem',
				'2xl': '5rem',
			},
		},
		extend: {
			colors: {
				brand: {
					indigo: '#2A3E67',
					charcoal: '#1B1B1B',
					gold: '#DAA520',
					gray: '#F6F7F9',
					holiday: '#B22222',
				},
			},
			fontFamily: {
				heading: ['"Playfair Display"', '"Libre Baskerville"', ...fontFamily.serif],
				body: ['Inter', ...fontFamily.sans],
			},
			boxShadow: {
				subtle: '0 10px 30px -20px rgba(42, 62, 103, 0.4)',
			},
			transitionTimingFunction: {
				soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
};


