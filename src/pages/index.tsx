import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Demo</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='text-3xl'>Hello</div>
        </div>
    );
};

export default Home;
