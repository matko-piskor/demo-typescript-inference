import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Demo</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='flex flex-col gap-5 justify-center items-center min-h-screen'>
                <h1 className='text-3xl'>Organize your books</h1>
                <div className='flex gap-3'>
                    <Link href='/books'>
                        <span className='cursor-pointer'>Books</span>
                    </Link>
                    <span>|</span>
                    <Link href='/categories'>
                        <span className='cursor-pointer'>Categories</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
