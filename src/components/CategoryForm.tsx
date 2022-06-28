import { Category } from 'utils/models';
import { useForm } from 'react-hook-form';

type Props = {
    data?: Category;
    onSubmit: (data: Category) => void;
};

export default function CategoryForm({ data, onSubmit }: Props) {
    const form = useForm<Category>({ defaultValues: data });

    return (
        <div>
            <div className='min-h-screen m-3'>
                <h1 className='text-3xl mb-7'>Categories</h1>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <label className='w-full px-2 pz-4 capitalize'>
                            Name
                        </label>
                        <input
                            className='w-full px-2 pz-4'
                            {...form.register('name', { required: true })}
                        />
                        <input type='submit' className='mb-7 cursor-pointer'>
                            Save
                        </input>
                    </div>
                </form>
            </div>
        </div>
    );
}
