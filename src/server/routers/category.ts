import z from 'zod';
import { prisma } from 'db/client';
import { categoryInputValidator } from 'shared/validators';
import { createRouter } from '../createRouter';

export const categoryRouter = createRouter()
    .query('get-all', {
        async resolve() {
            return await prisma.category.findMany();
        },
    })
    .query('get-by-id', {
        input: z.object({ id: z.number() }),
        async resolve({ input }) {
            const category = await prisma.category.findFirst({
                where: {
                    id: input.id,
                },
            });
            if (!category) {
                throw new Error("Category doesn't exist");
            }
            return category;
        },
    })
    .mutation('create', {
        input: categoryInputValidator,
        async resolve({ input }) {
            return await prisma.category.create({
                data: {
                    ...input,
                },
            });
        },
    })
    .mutation('update', {
        input: categoryInputValidator,
        async resolve({ input }) {
            return await prisma.category.update({
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
            return await prisma.category.delete({
                where: {
                    id: input.id,
                },
            });
        },
    });
