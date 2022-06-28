import BookForm from 'components/BooksForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { Book } from 'utils/models';
type Props = {
    id: string;
};

function Book({ id }: Props) {
    const [book, setBook] = React.useState<Book>();

    React.useEffect(() => {
        fetch(`/api/books/${id}`)
            .then((res) => res.json())
            .then(setBook)
            .catch(console.error);
    }, [id]);

    const onSubmit = (data: Book) => {
        fetch(`/api/books/${id}/edit`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(setBook)
            .catch(console.error);
    };

    if (!book) {
        return null;
    }
    return <BookForm data={book} onSubmit={onSubmit} />;
}

function NewBook() {
    const router = useRouter();

    const onSubmit = (data: Book) => {
        console.log(data);
        fetch(`/api/books/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                router.push(`/books/${res.id}`);
            })
            .catch(console.error);
    };

    return <BookForm onSubmit={onSubmit} />;
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
