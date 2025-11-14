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
					indigo: '#264337',
					charcoal: '#2A1D19',
					gold: '#C8A968',
					gray: '#F7F3ED',
					holiday: '#7A2E2F',
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


