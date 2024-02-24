import Body from '@/components/body';
import Toolbar from '@/components/toolbar';

export default function Home() {
	return (
		<main className='flex min-h-screen h-[100%] flex-col items-center justify-between bg-[#F9F8F4]'>
			<Toolbar />
			<Body />
		</main>
	);
}
