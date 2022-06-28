import BookForm from 'components/BooksForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { trpc } from 'utils/trpc';
type Props = {
    id: string;
};

function Book({ id }: Props) {
    const book = trpc.useQuery(['book.get-by-id', { id: parseInt(id, 10) }]);

    const onSubmit = trpc.useMutation(['book.update']);

    if (book.isError) {
        return <div>Error</div>;
    }

    if (!book.data) {
        return null;
    }
    return <BookForm data={book.data} onSubmit={onSubmit.mutate} />;
}

function NewBook() {
    const router = useRouter();

    const onSubmit = trpc.useMutation(['book.create'], {
        onSuccess: () => router.push('/books'),
    });

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
