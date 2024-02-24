import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

function Toolbar() {
	return (
		<Box
			w='100%'
			px='24px'
			h={65}
			display='flex'
			justifyItems='center'
			alignItems='center'
			position='fixed'
			pb={[0, '12px']}
			zIndex={11}
			borderBottom='1px solid #e2e8f0'
			background='white'>
			<Image
				src='https://www.carenow.id/carenow-logo-raspberry-black.png'
				width={130}
				height={35}
				alt='logo'
				priority
			/>
		</Box>
	);
}

export default Toolbar;
