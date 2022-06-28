// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from '@prisma/client';
import { prisma } from 'db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category | { message: string }>,
) {
    const { id } = req.query;
    if (
        !id ||
        Array.isArray(id) ||
        parseInt(id, 10) < 1 ||
        isNaN(parseInt(id, 10))
    ) {
        res.status(400).send({ message: 'Bad id' });
        return;
    }

    await prisma.category.delete({
        where: {
            id: Number(id),
        },
    });

    res.status(200).json({ message: 'deleted' });
}
