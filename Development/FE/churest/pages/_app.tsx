import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Modals from '@/components/common/Modals';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          {/* <Navbar /> */}
          <Modals />
          <Component {...pageProps} />{' '}
          <style jsx global>
            {``}
          </style>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
