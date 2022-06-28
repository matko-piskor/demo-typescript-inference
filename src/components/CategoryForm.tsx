import { Category } from 'utils/models';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type Props = {
    data?: Category;
    onSubmit: (data: Category) => void;
};

export default function CategoryForm({ data, onSubmit }: Props) {
    const router = useRouter();
    const form = useForm<Category>({ defaultValues: data });

    return (
        <div>
            <div className='min-h-screen m-3 bg-slate-400'>
                <h1
                    className='text-3xl mb-7 cursor-pointer'
                    onClick={() => router.push('/categories')}
                >
                    Categories
                </h1>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3 m-4'>
                        <label className='w-full px-2 pz-4 capitalize'>
                            Name
                        </label>
                        <input
                            className='w-full px-2 pz-4'
                            {...form.register('name', { required: true })}
                        />
                        <input type='submit' className='mb-7 cursor-pointer' />
                    </div>
                </form>
            </div>
        </div>
    );
}