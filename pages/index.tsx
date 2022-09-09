import { useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { Layout, Game } from '../components';
import { WordleContext } from '../context';

const Home: NextPage = () => {
  const { addSecretWord, getStatsFromStorage } = useContext(WordleContext);

  useEffect(() => {
    addSecretWord();
    getStatsFromStorage();
  }, []);

  return (
    <Layout>
      <Game />
    </Layout>
  );
};

export default Home;
