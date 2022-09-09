import { useContext, useEffect, useState } from 'react';
import { WordleContext } from '../context';
import { ModalInstructions, ModalResults, SwitchMode } from './';
import { Keyboard } from './Keyboard';
import { LetterBlock } from './LetterBlock';

export const Game = () => {
  const { boxWords, isFinished } = useContext(WordleContext);
  const [isOpenModalResults, setIsOpenModalResults] = useState(false);
  const [openModalInstructions, setOpenModalInstructions] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setIsOpenModalResults(true);
    }
  }, [isFinished]);

  useEffect(() => {
    if (!localStorage.visited) {
      setOpenModalInstructions(true);
    }
  }, []);

  return (
    <div className="flex justify-center w-2/4 mx-auto flex-col">
      <div className="flex items-center w-full bg-gray-300/50 dark:bg-gray-700 px-2 py-3 justify-between rounded-md">
        <div className="w-2/12">
          <button
            onClick={() => setOpenModalInstructions(true)}
            className="w-8 h-8 bg-neutral-500 dark:bg-gray-100 rounded-full text-white dark:text-gray-700 font-bold"
          >
            ?
          </button>
        </div>
        <h1 className="w-10/12 text-center text-3xl font-bold tracking-widest dark:text-gray-300">
          WORDLE
        </h1>
        <div className="flex items-center w-2/12">
          <button
            onClick={() => setIsOpenModalResults(true)}
            className="flex items-center justify-center w-8 h-6 bg-neutral-500 dark:bg-gray-100 rounded relative text-white dark:text-gray-700"
          >
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" stroke-white dark:stroke-gray-700"
            >
              <path
                d="M1.16132 4L1.16132 13"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.74194 7V13"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3226 1V13"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <SwitchMode />
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

      <ModalResults
        open={isOpenModalResults}
        onClose={() => setIsOpenModalResults(false)}
      />
      <ModalInstructions
        open={openModalInstructions}
        onClose={() => setOpenModalInstructions(false)}
      />
    </div>
  );
};
