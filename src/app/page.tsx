'use client';
import InputList from '@/components/input-list';
import { Box, Card, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex min-h-screen h-[100%] flex-col items-center justify-between bg-[#F9F8F4]'>
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
			<Box maxW='960px' mt='65px' w={['100%', '100%', '70%']} mx='auto'>
				<Card my='24px' p='20px' gap={5} display='flex' h='100%' boxShadow='lg'>
					<Box>
						<Text fontSize={30} fontWeight='bold'>
							Simple Healthcare Treatment Entry System
						</Text>
					</Box>
					<Box display='flex' flexDir={['column', 'column', 'row']}>
						<Box
							display={['none', 'none', 'flex']}
							justifyContent='center'
							w={240}
							height='100%'
							p='20px'
							flex={1}
							alignItems='center'>
							<Image
								src='/assets/illustration.png'
								width={240}
								height={240}
								alt='home'
								priority
							/>
						</Box>
						<Box display='flex' flex={1} justifyContent='center'>
							<InputList _onSubmitData={(data) => console.log('data', data)} />
						</Box>
					</Box>
				</Card>
			</Box>
		</main>
	);
}
