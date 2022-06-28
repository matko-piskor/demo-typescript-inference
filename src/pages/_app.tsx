import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from 'server/routers/app';
import * as portals from 'react-reverse-portal';
import range from 'utils/range';
import React from 'react';
import ErrorModal from 'components/ErrorModal';
import { NextPage } from 'next';

const portalNode =
    typeof window !== 'undefined' ? portals.createHtmlPortalNode() : null;

type CustomPageProps = { portalNode: portals.HtmlPortalNode } & NextPage;

export type CustomPage = NextPage<CustomPageProps>;

const MyApp: AppType = ({ Component, pageProps }) => {
    const [nodes, setNodes] = React.useState<any>();

    React.useEffect(() => {
        portalNode && setNodes(portalNode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portalNode]);
    return (
        <>
            {nodes && (
                <portals.InPortal node={nodes}>
                    <ErrorModal />
                </portals.InPortal>
            )}
            <Component {...pageProps} portalNode={portalNode} />
        </>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : 'http://localhost:3000/api/trpc';

        return {
            url,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(MyApp);
