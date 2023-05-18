import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Modals from '@/components/common/Modals';

import AlarmRoot from '@/components/common/AlarmRoot';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AlarmRoot />
          <Modals />
          <Component {...pageProps} />{' '}
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
