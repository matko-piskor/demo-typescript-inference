import CategoryForm from 'components/CategoryForm';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';
import { Category } from 'utils/models';
type Props = {
    id: string;
};

function Category({ id }: Props) {
    const [category, setCategory] = React.useState<Category>();

    React.useEffect(() => {
        fetch(`/api/categories/${id}`)
            .then((res) => res.json())
            .then(setCategory)
            .catch(console.error);
    }, [id]);

    const onSubmit = (data: Category) => {
        console.log(data);
        fetch(`/api/categories/${id}/edit`, {
            method: category ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(setCategory)
            .catch(console.error);
    };

    if (!category) {
        return null;
    }
    return <CategoryForm data={category} onSubmit={onSubmit} />;
}

function NewCategory() {
    const router = useRouter();

    const onSubmit = (data: Category) => {
        console.log(data);
        fetch(`/api/categories/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                router.push(`/categories/${res.id}`);
            })
            .catch(console.error);
    };

    return <CategoryForm onSubmit={onSubmit} />;
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
