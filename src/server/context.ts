import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
    return { req: opts?.req };
}
