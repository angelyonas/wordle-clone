import type { AppProps } from 'next/app';
import { WordleProvider } from '../context';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WordleProvider>
      <Component {...pageProps} />
    </WordleProvider>
  );
}

export default MyApp;
