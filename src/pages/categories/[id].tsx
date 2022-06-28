import CategoryForm from 'components/CategoryForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
    categoryInputValidator,
    CategoryValidator,
    categoryValidator,
} from 'utils/validators';
type Props = {
    id: string;
};

function Category({ id }: Props) {
    const category = useQuery(['categories', id], () => {
        fetch(`/api/categories/${id}`)
            .then((res) => res.json())
            .then((res) => categoryValidator.parse(res));
    });

    const onSubmit = useMutation(
        ['update-category', id],
        async (data: CategoryValidator) => {
            try {
                categoryInputValidator.parse(data);
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
                .then((res) => categoryValidator.parse(res));
        },
    );

    if (!category) {
        return null;
    }
    return <CategoryForm data={category} onSubmit={onSubmit.mutate} />;
}

function NewCategory() {
    const router = useRouter();

    const onSubmit = useMutation(
        ['create-category'],
        async (data: CategoryValidator) => {
            try {
                categoryInputValidator.parse(data);
            } catch (err) {
                console.error(data);
                return;
            }
            fetch(`/api/categories/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(categoryValidator.parse)
                .then((res) => {
                    router.push(`/categories/${res.id}`);
                });
        },
    );

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
