import z from 'zod';

export const bookValidator = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    isRead: z.boolean(),
    createdAt: z.string(),
    categoryId: z.number(),
});

export type BookValidator = z.infer<typeof bookValidator>;

export const booksValidator = z.array(bookValidator);

export const bookInputValidator = z.object({
    id: z.number().optional(),
    title: z.string(),
    author: z.string(),
    isRead: z.boolean().optional(),
    createdAt: z.string().optional(),
    categoryId: z.number(),
});

export const categoryValidator = z.object({
    id: z.number(),
    name: z.string(),
});

export type CategoryValidator = z.infer<typeof categoryValidator>;

export const categoriesValidator = z.array(categoryValidator);

export const categoryInputValidator = z.object({
    id: z.number().optional(),
    name: z.string(),
});
