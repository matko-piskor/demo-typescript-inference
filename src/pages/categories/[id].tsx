import CategoryForm from 'components/CategoryForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { trpc } from 'utils/trpc';
type Props = {
    id: string;
};

function Category({ id }: Props) {
    const category = trpc.useQuery([
        'category.get-by-id',
        { id: parseInt(id, 10) },
    ]);

    const onSubmit = trpc.useMutation(['category.update']);

    if (category.isError) {
        return <div>Error</div>;
    }

    if (!category.data) {
        return null;
    }

    return <CategoryForm data={category.data} onSubmit={onSubmit.mutate} />;
}

function NewCategory() {
    const router = useRouter();

    const onSubmit = trpc.useMutation(['category.create'], {
        onSuccess: () => router.push('/categories'),
    });

    return <CategoryForm onSubmit={onSubmit.mutate} />;
}

const CategoryWrapper: NextPage = () => {
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
        return <NewCategory />;
    }

    return <Category id={id as string} />;
};

export default CategoryWrapper;
