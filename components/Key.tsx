import { useMemo, useContext } from 'react';
import { getStylesByStatus, StatusTypes } from '../utils';
import { WordleContext } from '../context';

interface Props {
  letter: string;
  status: StatusTypes;
}

/**
 * Evaluate if letter is a special key to alter width
 * @param letter special letter
 * @returns string
 */
const isSpecialKey = (letter: string) =>
  letter === 'ENTER' || letter === '⌫' ? 'w-2/12' : 'w-1/12';

export const Key = ({ letter, status }: Props) => {
  const { addLetter, removeLetter, validateWord } = useContext(WordleContext);
  const blockStyles = useMemo(
    () => getStylesByStatus(status, 'keyboard'),
    [status]
  );
  const specialKey = useMemo(() => isSpecialKey(letter), [letter]);

  /**
   * Handler on click in button key
   */
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
      className={`${blockStyles} m-1 h-12 font-bold text-gray-600 dark:text-white hover:bg-gray-400 dark:hover:bg-slate-600 ${specialKey}`}
    >
      {letter}
    </button>
  );
};
