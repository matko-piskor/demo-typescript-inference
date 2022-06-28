import Head from 'next/head';
import { NextPage } from 'next/types';
import React from 'react';
import { Category } from 'utils/models';

const Categories: NextPage = () => {
    const [categories, setCategories] = React.useState<Category[]>();

    React.useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    return (
        <div>
            <Head>
                <title>Categories</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='min-h-screen m-3'>
                <h1 className='text-3xl mb-7'>Categories</h1>
                <button className='mb-7 cursor-pointer'>New</button>
                <div className='flex flex-col w-100'>
                    <div className='bg-slate-400 flex border-slate-800'>
                        <div className='w-full px-2 pz-4 capitalize mx-auto'>
                            Id
                        </div>
                        <div className='w-full px-2 pz-4 capitalize'>title</div>
                        <div className='w-full px-2 pz-4 capitalize'>Name</div>
                        <div className='w-full px-2 pz-4 capitalize'>Edit</div>
                        <div className='w-full px-2 pz-4 capitalize'>
                            Delete
                        </div>
                    </div>
                    {categories &&
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className='bg-slate-200 flex border-slate-800'
                            >
                                <div className='w-full px-2 pz-4 capitalize mx-auto'>
                                    {category.id}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    {category.name}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    <button>Edit</button>
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    <button>Delete</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
