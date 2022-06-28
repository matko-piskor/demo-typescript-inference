import { useForm } from 'react-hook-form';
import { Book } from 'utils/models';

type Props = {
    data?: Book;
    onSubmit: (data: Book) => void;
};

export default function BookForm({ data, onSubmit }: Props) {
    const form = useForm<Book>({ defaultValues: data });

    return (
        <div>
            <div className='min-h-screen m-3'>
                <h1 className='text-3xl mb-7'>Categories</h1>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <label className='w-full px-2 pz-4 capitalize'>
                            Title
                        </label>
                        <input
                            className='w-full px-2 pz-4'
                            {...form.register('title', { required: true })}
                        />
                        <label className='w-full px-2 pz-4 capitalize'>
                            Author
                        </label>
                        <input
                            className='w-full px-2 pz-4'
                            {...form.register('author', { required: true })}
                        />
                        <label className='w-full px-2 pz-4 capitalize'>
                            CategoryId
                        </label>
                        <input
                            className='w-full px-2 pz-4'
                            type='number'
                            {...form.register('categoryId', { required: true })}
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
