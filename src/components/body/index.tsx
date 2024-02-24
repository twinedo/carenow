'use client';
import React from 'react';
import addData from '@/services/api';
import { Box, Card, Text } from '@chakra-ui/react';
import Image from 'next/image';
import InputList, { IFormField } from '@/components/input-list';

function Body() {
	const _onSubmit = async (values: IFormField) => {
		try {
			const response = await addData(values);
			if (response.result) {
				alert('Add Patients data is succeeded');
			}
		} catch (error) {
			// console.error('error', error);
			alert(error?.toString());
		}
	};
	return (
		<Box maxW='960px' mt='65px' w='80%' mx='auto'>
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
						flexDir='column'
						alignItems='center'>
						<Image
							src='/assets/illustration.png'
							width={240}
							height={240}
							alt='home'
							priority
						/>
						<Image
							src='https://www.carenow.id/carenow-logo-raspberry-black.png'
							width={80}
							height={35}
							alt='logo'
							priority
						/>
					</Box>
					<Box display='flex' flex={1} justifyContent='center'>
						<InputList _onSubmitData={(data) => _onSubmit(data)} />
					</Box>
				</Box>
			</Card>
		</Box>
	);
}

export default Body;
