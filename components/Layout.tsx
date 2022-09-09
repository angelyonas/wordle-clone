import { ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <main className="bg-[#E5E5E5] dark:bg-gray-800 py-20 min-h-screen">
      <Head>
        <title>Worlde - clone</title>
      </Head>
      {children}
    </main>
  );
};
