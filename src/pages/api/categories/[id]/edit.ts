// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from '@prisma/client';
import { prisma } from 'db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category | { message: string }>,
) {
    const { id, name } = req.body;

    if (
        !id ||
        Array.isArray(id) ||
        parseInt(id, 10) < 1 ||
        isNaN(parseInt(id, 10))
    ) {
        res.status(400).send({ message: 'Bad id' });
        return;
    }

    if (!name) {
        res.status(400).send({ message: 'Bad name' });
        return;
    }

    const category = await prisma.category.update({
        data: {
            name,
        },
        where: {
            id: Number(id),
        },
    });

    if (!category) {
        res.status(400).send({ message: 'Category not created' });
        return;
    }
    res.status(200).json(category);
}
