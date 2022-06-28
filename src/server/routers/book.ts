import z from 'zod';
import { prisma } from 'db/client';
import { bookInputValidator } from 'shared/validators';
import { createRouter } from '../createRouter';

export const bookRouter = createRouter()
    .query('get-all', {
        async resolve() {
            const books = await prisma.book.findMany();
            return books.map(({ createdAt, ...rest }) => ({
                ...rest,
                createdAt: createdAt.toISOString(),
            }));
        },
    })
    .query('get-by-id', {
        input: z.object({ id: z.number() }),
        async resolve({ input }) {
            const book = await prisma.book.findFirst({
                where: {
                    id: input.id,
                },
            });
            if (!book) {
                throw new Error("Book doesn't exist");
            }
            return {
                ...book,
                createdAt: book?.createdAt.toISOString(),
            };
        },
    })
    .mutation('create', {
        input: bookInputValidator,
        async resolve({ input }) {
            return await prisma.book.create({
                data: {
                    ...input,
                },
            });
        },
    })
    .mutation('update', {
        input: bookInputValidator,
        async resolve({ input }) {
            return await prisma.book.update({
                where: {
                    id: input.id,
                },
                data: {
                    ...input,
                },
            });
        },
    })
    .mutation('delete', {
        input: z.object({ id: z.number() }),
        async resolve({ input }) {
            return await prisma.book.delete({
                where: {
                    id: input.id,
                },
            });
        },
    });
