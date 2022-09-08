import { useMemo, useContext } from 'react';
import { getStylesByStatus, StatusTypes } from '../utils';
import { WordleContext } from '../context';

interface Props {
  letter: string;
  status?: StatusTypes;
}

const isSpecialKey = (letter: string) =>
  letter === 'ENTER' || letter === '⌫' ? 'w-2/12' : 'w-1/12';

export const Key = ({ letter, status = 'empty' }: Props) => {
  const { addLetter, removeLetter, validateWord } = useContext(WordleContext);
  const blockStyles = useMemo(() => getStylesByStatus(status), [status]);
  const specialKey = useMemo(() => isSpecialKey(letter), [letter]);

  const handleClickKey = () => {
    if (letter === '⌫') {
      removeLetter();
    } else if (letter === 'ENTER') {
      validateWord();
    } else {
      addLetter(letter);
    }
  };

  return (
    <button
      onClick={handleClickKey}
      className={`${blockStyles} m-1 h-12 font-bold text-gray-600 hover:bg-gray-400 ${specialKey} `}
    >
      {letter}
    </button>
  );
};
