import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Modals from '@/components/common/Modals';

import AlarmRoot from '@/components/common/AlarmRoot';
import Head from 'next/head';

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
      <Head>
        <title>Churest</title>
        <meta
          name="description"
          content="
Our website allows you to create memories and plant them as seeds in the ground. By watering them yourself or having others explore those memories, you can earn points and watch the seeds grow into beautiful trees. With these growing trees, you can cultivate your own personal forest. You'll have your own avatar and even a pet bird. All of these features and mechanics are implemented in 3D, with avatar movement and physics engine applied, resembling a game-like experience. Additionally, you can chat and engage in simple games at the plaza."
        />
      </Head>
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
