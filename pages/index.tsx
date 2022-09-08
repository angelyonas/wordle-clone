import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Layout, Game, Indications } from '../components';

const Home: NextPage = () => {
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    localStorage.theme = 'ligth';

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsVisited(Boolean(localStorage.visited));
  }, []);

  /**
   * Handle on click in button play of indications
   */
  const handleOnPlay = () => setIsVisited(true);

  return (
    <Layout>
      {isVisited ? <Game /> : <Indications onPlay={handleOnPlay} />}
    </Layout>
  );
};

export default Home;
