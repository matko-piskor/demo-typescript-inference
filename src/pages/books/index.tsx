import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { booksValidator } from 'utils/validators';

const Books: NextPage = () => {
    const router = useRouter();

    const books = useQuery('books', () => {
        return fetch('/api/books')
            .then((res) => res.json())
            .then(booksValidator.parse);
    });

    const deleteBook = useMutation('delete-book', async (id: number) => {
        fetch(`/api/books/${id}/delete`, {
            method: 'DELETE',
        }).then(() => books.refetch());
    });

    if (books.isError) {
        return <div>Error</div>;
    }

    if (books.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Books</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='min-h-screen m-3'>
                <h3 className='cursor-pointer' onClick={() => router.push('/')}>
                    Back
                </h3>
                <h1 className='text-3xl mb-7'>Books</h1>
                <button
                    className='mb-7 cursor-pointer'
                    onClick={() => {
                        router.push(`/books/new`);
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
                        <div className='w-full px-2 pz-4 capitalize'>
                            author
                        </div>
                        <div className='w-full px-2 pz-4 capitalize'>
                            createdAt
                        </div>
                        <div className='w-full px-2 pz-4 capitalize'>
                            categoryId
                        </div>
                        <div className='w-full px-2 pz-4 capitalize'>Edit</div>
                        <div className='w-full px-2 pz-4 capitalize'>
                            Delete
                        </div>
                    </div>
                    {books &&
                        books.data?.map((book) => (
                            <div
                                key={book.id}
                                className='bg-slate-200 flex border-slate-800'
                            >
                                <div className='w-full px-2 pz-4 capitalize mx-auto'>
                                    {book.id}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    {book.title}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    {book.author}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    {new Date(
                                        book.createdAt.toString(),
                                    ).toLocaleDateString()}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    {book.categoryId}
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    <button
                                        onClick={() => {
                                            router.push(`/books/${book.id}`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className='w-full px-2 pz-4 capitalize'>
                                    <button
                                        onClick={() =>
                                            deleteBook.mutate(book.id)
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

export default Books;
