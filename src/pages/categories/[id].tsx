import CategoryForm from 'components/CategoryForm';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from 'utils/trpc';
import * as portals from 'react-reverse-portal';
import { CustomPage } from 'pages/_app';

type Props = {
    id: string;
    portalNode: portals.HtmlPortalNode;
};

function Category(props: Props) {
    const category = trpc.useQuery(
        ['category.get-by-id', { id: parseInt(props.id, 10) }],
        {
            retry: false,
        },
    );

    const onSubmit = trpc.useMutation(['category.update']);

    return (
        <>
            {category.isError && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={category.error?.message}
                />
            )}
            {onSubmit.error && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={onSubmit.error?.message}
                />
            )}
            <CategoryForm data={category.data} onSubmit={onSubmit.mutate} />
        </>
    );
}

function NewCategory(props: Omit<Props, 'id'>) {
    const router = useRouter();

    const onSubmit = trpc.useMutation(['category.create'], {
        onSuccess: () => router.push('/categories'),
    });

    return (
        <>
            {onSubmit.error && (
                <portals.OutPortal
                    node={props.portalNode}
                    message={onSubmit.error?.message}
                />
            )}
            <CategoryForm onSubmit={onSubmit.mutate} />
        </>
    );
}

const CategoryWrapper: CustomPage = (props) => {
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
        return <NewCategory portalNode={props.portalNode} />;
    }

    return <Category id={id as string} portalNode={props.portalNode} />;
};

export default CategoryWrapper;
