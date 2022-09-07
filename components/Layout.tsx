import { ReactNode } from 'react'
import Head from "next/head";

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <main className="bg-zinc-100/90 dark:bg-gray-800/90 py-20 min-h-screen" >
      <Head>
        <title>Worlde - clone</title>
      </Head>
      {children}
    </main>
  );
}
