import z from 'zod';

export const bookInputValidator = z.object({
    id: z.number().optional(),
    title: z.string(),
    author: z.string(),
    isRead: z.boolean().optional(),
    createdAt: z.string().optional(),
    categoryId: z.number().min(0),
});

export type BookInputValidatorType = z.infer<typeof bookInputValidator>;

export const categoryInputValidator = z.object({
    id: z.number().optional(),
    name: z.string(),
});

export type CategoryInputValidatorType = z.infer<typeof categoryInputValidator>;
