import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from './fonts';

export const metadata: Metadata = {
	title: 'CareNow Indonesia',
	description: 'Dapatkan perawatan yang kamu perlukan, sekarang.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={fonts.lato.variable}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
