import z from 'zod';

const maxValidator = z.number().min(0).int();

type MaxParam = z.infer<typeof maxValidator>;

export default function range<T>(max: MaxParam, node: () => T) {
    return Array.from(rangeGen(max, node));
}

function* rangeGen<T>(max: MaxParam, node: () => T) {
    for (let i = 0; i < max; i++) {
        yield node();
    }
}
