import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WordleProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WordleProvider>
      <Component {...pageProps} />
    </WordleProvider>
  );
}

export default MyApp
