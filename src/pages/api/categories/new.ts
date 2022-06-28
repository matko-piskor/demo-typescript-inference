// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from '@prisma/client';
import { prisma } from 'db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category | { message: string }>,
) {
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: 'Bad name' });
        return;
    }

    const category = await prisma.category.create({
        data: {
            name,
        },
    });

    if (!category) {
        res.status(400).send({ message: 'Category not created' });
        return;
    }
    res.status(200).json(category);
}
