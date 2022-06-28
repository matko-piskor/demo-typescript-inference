// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Book } from '@prisma/client';
import { prisma } from 'db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Book | { message: string }>,
) {
    const { title, author, isRead: isBookRead, categoryId } = req.body;
    if (
        !categoryId ||
        parseInt(categoryId, 10) < 1 ||
        isNaN(parseInt(categoryId, 10))
    ) {
        res.status(400).send({ message: 'Bad category id' });
        return;
    }
    if (!title) {
        res.status(400).send({ message: 'Bad title' });
        return;
    }
    if (!author) {
        res.status(400).send({ message: 'Bad author' });
        return;
    }

    const isRead = isBookRead ?? false;

    const book = await prisma.book.create({
        data: {
            title,
            author,
            isRead,
            category: { connect: { id: Number(categoryId) } },
        },
    });

    if (!book) {
        res.status(400).send({ message: 'Book not created' });
        return;
    }
    res.status(200).json(book);
}
