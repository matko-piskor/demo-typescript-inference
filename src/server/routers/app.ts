import { createRouter } from '../createRouter';
import { bookRouter } from './book';
import { categoryRouter } from './category';

export const appRouter = createRouter()
    .merge('book.', bookRouter)
    .merge('category.', categoryRouter);

export type AppRouter = typeof appRouter;
