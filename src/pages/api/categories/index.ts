// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db/client';
import { Category } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category[]>,
) {
    const allBooks = await prisma.category.findMany();
    res.status(200).json(allBooks);
}