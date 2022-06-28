import BookForm from 'components/BooksForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import {
    bookInputValidator,
    BookValidator,
    bookValidator,
} from 'utils/validators';
type Props = {
    id: string;
};

function Book({ id }: Props) {
    const [book, setBook] = React.useState<BookValidator>();

    React.useEffect(() => {
        fetch(`/api/books/${id}`)
            .then((res) => res.json())
            .then((res) => bookValidator.parse(res))
            .then(setBook)
            .catch(console.error);
    }, [id]);

    const onSubmit = (data: BookValidator) => {
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
            .then((res) => bookValidator.parse(res))
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

    const onSubmit = (data: BookValidator) => {
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
