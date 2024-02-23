// app/fonts.ts
import { Lato } from 'next/font/google';

const lato = Lato({
	subsets: ['latin'],
	variable: '--font-rubik',
	weight: ['100', '300', '400', '700', '900'],
});

export const fonts = {
	lato,
};
