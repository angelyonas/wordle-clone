import { useContext, useState, useEffect } from 'react';
import { Keyboard } from './Keyboard';
import { LetterBlock } from './LetterBlock';
import { WordleContext } from '../context';
import { ModalResults } from './ModalResults';

export const Game = () => {
  const { boxWords, isFinished } = useContext(WordleContext);
  const [isOpenModalResults, setIsOpenModalResults] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setIsOpenModalResults(true)
    }
  }, [isFinished])

  return (
    <div className="flex justify-center w-2/4 mx-auto flex-col">
      <div className="flex items-center w-full bg-zinc-200 px-2 py-3 justify-between rounded-md">
        <button className="w-8 h-8 bg-neutral-500 rounded-full text-white font-bold">
          ?
        </button>
        <h1 className="text-3xl font-bold tracking-widest">WORDLE</h1>
        <div className="flex">
          <button onClick={() => setIsOpenModalResults(true)} className="w-10 h-8 bg-neutral-500 rounded relative text-white">
            | | |
          </button>
        </div>
      </div>

      <div className="m-auto mt-10">
        {boxWords.map((row, index) => (
          <div key={`row-${index}`} className="flex flex-wrap">
            {row.map(({ letter, status }, index) => (
              <LetterBlock
                key={`letter-${index}`}
                letter={letter}
                status={status}
              />
            ))}
          </div>
        ))}
      </div>

      <Keyboard />

      <ModalResults open={isOpenModalResults} onClose={() => setIsOpenModalResults(false)} />
    </div>
  );
};
