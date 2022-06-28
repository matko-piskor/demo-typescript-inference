import BookForm from 'components/BooksForm';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from 'utils/trpc';
import * as portals from 'react-reverse-portal';
import { CustomPage } from 'pages/_app';

type Props = {
    id: string;
    portalNode: portals.HtmlPortalNode;
};

const Book: React.FC<Props> = (props) => {
    const book = trpc.useQuery(
        ['book.get-by-id', { id: parseInt(props.id, 10) }],
        {
            retry: false,
        },
    );

    const onSubmit = trpc.useMutation(['book.update']);

    return (
        <>
            {book.isError && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={book.error?.message}
                />
            )}
            {onSubmit.isError && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={onSubmit.error?.message}
                />
            )}
            <BookForm data={book.data} onSubmit={onSubmit.mutate} />
        </>
    );
};

function NewBook(props: Omit<Props, 'id'>) {
    const router = useRouter();

    const onSubmit = trpc.useMutation(['book.create'], {
        onSuccess: () => router.push('/books'),
    });

    return (
        <>
            {onSubmit.isError && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={onSubmit.error?.message}
                />
            )}
            <BookForm onSubmit={onSubmit.mutate} />
        </>
    );
}

const BookWrapper: CustomPage = (props) => {
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
        return <NewBook portalNode={props.portalNode} />;
    }

    return <Book id={id as string} portalNode={props.portalNode} />;
};

export default BookWrapper;
