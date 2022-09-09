import { useContext, useEffect, useState } from 'react';
import { Key } from './Key';
import { StatusTypes } from '../utils';
import { WordleContext } from '../context';

interface RowInterface {
  letter: string;
  status: StatusTypes;
}

export const Keyboard = () => {
  const { lettersUsed } = useContext(WordleContext);

  const [keyboardRowOne, setKeyboardRowOne] = useState<Array<RowInterface>>([
    { letter: 'Q', status: 'empty' },
    { letter: 'W', status: 'empty' },
    { letter: 'E', status: 'empty' },
    { letter: 'R', status: 'empty' },
    { letter: 'T', status: 'empty' },
    { letter: 'Y', status: 'empty' },
    { letter: 'U', status: 'empty' },
    { letter: 'I', status: 'empty' },
    { letter: 'O', status: 'empty' },
    { letter: 'P', status: 'empty' },
  ]);

  const [keyboardRowTwo, setKeyboardRowTwo] = useState<Array<RowInterface>>([
    { letter: 'A', status: 'empty' },
    { letter: 'S', status: 'empty' },
    { letter: 'D', status: 'empty' },
    { letter: 'F', status: 'empty' },
    { letter: 'G', status: 'empty' },
    { letter: 'H', status: 'empty' },
    { letter: 'J', status: 'empty' },
    { letter: 'K', status: 'empty' },
    { letter: 'L', status: 'empty' },
    { letter: 'Ñ', status: 'empty' },
  ]);

  const [keyboardRowThree, setKeyboardRowThree] = useState<Array<RowInterface>>(
    [
      { letter: 'ENTER', status: 'empty' },
      { letter: 'Z', status: 'empty' },
      { letter: 'X', status: 'empty' },
      { letter: 'C', status: 'empty' },
      { letter: 'V', status: 'empty' },
      { letter: 'B', status: 'empty' },
      { letter: 'N', status: 'empty' },
      { letter: 'M', status: 'empty' },
      { letter: '⌫', status: 'empty' },
    ]
  );

  /**
   * Evaluate changes with letters used to set new status
   * @param keyboardRow list of rows
   * @returns array
   */
  const evaluateLetterUsed = (keyboardRow: Array<RowInterface>) => {
    return keyboardRow.map((spaceRow) => {
      const letterUsed = lettersUsed.find(
        (space) => space.letter === spaceRow.letter
      );
      if (letterUsed && spaceRow.status !== letterUsed.status) {
        return letterUsed;
      }
      return spaceRow;
    });
  };

  /**
   * Reset to default row data
   * @param keyboardRow list of rows
   * @returns array
   */
  const resetKeys = (keyboardRow: Array<RowInterface>): Array<RowInterface> =>
    keyboardRow.map((space) => ({ ...space, status: 'empty' }));

  useEffect(() => {
    if (lettersUsed.length) {
      setKeyboardRowOne(evaluateLetterUsed(keyboardRowOne));
      setKeyboardRowTwo(evaluateLetterUsed(keyboardRowTwo));
      setKeyboardRowThree(evaluateLetterUsed(keyboardRowThree));
    } else {
      setKeyboardRowOne(resetKeys(keyboardRowOne));
      setKeyboardRowTwo(resetKeys(keyboardRowTwo));
      setKeyboardRowThree(resetKeys(keyboardRowThree));
    }
  }, [lettersUsed]);

  return (
    <div className="w-full mt-10 p-3 bg-gray-300/50 rounded-xl dark:bg-gray-700">
      <div className="flex w-10/12 mx-auto">
        {keyboardRowOne.map(({ letter, status }) => (
          <Key key={letter} letter={letter} status={status} />
        ))}
      </div>
      <div className="flex w-10/12 ml-20">
        {keyboardRowTwo.map(({ letter, status }) => (
          <Key key={letter} letter={letter} status={status} />
        ))}
      </div>
      <div className="flex w-10/12">
        {keyboardRowThree.map(({ letter, status }) => (
          <Key key={letter} letter={letter} status={status} />
        ))}
      </div>
    </div>
  );
};
