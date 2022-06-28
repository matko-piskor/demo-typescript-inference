type Props = {
    message?: string;
};
export default function ErrorModal({ message }: Props) {
    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-50 flex flex-col justify-center items-center gap-4'>
            <span className='text-6xl'>Error</span>
            <span className='text-3xl'>{message}</span>
        </div>
    );
}
