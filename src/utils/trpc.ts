import { createReactQueryHooks } from '@trpc/react';
import * as trpcServer from '@trpc/server';
import type { AppRouter } from 'server/routers/app';

export const trpc = createReactQueryHooks<AppRouter>();

export type TQuery = keyof AppRouter['_def']['queries'];

export type InferQueryOutput<TRouteKey extends TQuery> =
    trpcServer.inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
