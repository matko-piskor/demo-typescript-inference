import BookForm from 'components/BooksForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
    bookInputValidator,
    BookValidator,
    bookValidator,
} from 'utils/validators';
type Props = {
    id: string;
};

function Book({ id }: Props) {
    const book = useQuery(['book', id], () => {
        return fetch(`/api/books/${id}`)
            .then((res) => res.json())
            .then(bookValidator.parse);
    });

    const onSubmit = useMutation(
        ['update-book', id],
        async (data: BookValidator) => {
            try {
                bookInputValidator.parse(data);
            } catch (err) {
                console.error(data);
                return;
            }
            fetch(`/api/books/${id}/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(bookValidator.parse);
        },
    );

    if (!book.data) {
        return null;
    }
    return <BookForm data={book.data} onSubmit={onSubmit.mutate} />;
}

function NewBook() {
    const router = useRouter();

    const onSubmit = useMutation(
        ['create-book'],
        async (data: BookValidator) => {
            try {
                bookInputValidator.parse(data);
            } catch (err) {
                console.error(data);
                return;
            }
            fetch(`/api/books/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((res) => bookValidator.parse(res))
                .then((res) => {
                    router.push(`/books/${res.id}`);
                });
        },
    );

    return <BookForm onSubmit={onSubmit.mutate} />;
}

const BookWrapper: NextPage = () => {
    const router = useRouter();

    const { id } = router.query;

    if (Array.isArray(id)) {
        if (typeof window !== 'undefined') {
            router.push('/404');
        }
    }

    if (!id) {
        return null;
    }

    if (id === 'new') {
        return <NewBook />;
    }

    return <Book id={id as string} />;
};

export default BookWrapper;
