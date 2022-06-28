import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { categoriesValidator } from 'utils/validators';

const Categories: NextPage = () => {
    const router = useRouter();

    const categories = useQuery('categories', () => {
        return fetch('/api/categories')
            .then((res) => res.json())
            .then(categoriesValidator.parse);
    });

    const deleteCategory = useMutation(
        'delete-category',
        async (id: number) => {
            fetch(`/api/categories/${id}/delete`, {
                method: 'categories',
            }).then(() => categories.refetch());
        },
    );

    if (categories.isError) {
        return <div>Error</div>;
    }

    if (categories.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Categories</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='min-h-screen m-3'>
                <h3 className='cursor-pointer' onClick={() => router.push('/')}>
                    Back
                </h3>
                <h1 className='text-3xl mb-7'>Categories</h1>
                <button
                    className='mb-7 cursor-pointer'
                    onClick={() => {
                        router.push(`/categories/new`);
                    }}
                >
                    New
                </button>
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
                        categories.data?.map((category) => (
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
                                    <button
                                        onClick={() => {
                                            router.push(
                                                `/categories/${category.id}`,
                                            );
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    <button
                                        onClick={() =>
                                            deleteCategory.mutate(category.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
