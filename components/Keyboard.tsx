import React from 'react';
import { Key } from './Key';

export const Keyboard = () => {
  const keyboardRowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keyboardRowTwo = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  const keyboardRowThree = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

  return (
    <div className="w-full mt-10 p-3 bg-gray-200 rounded-xl">
      <div className="flex w-10/12 mx-auto">
        {keyboardRowOne.map((letter) => (
          <Key key={letter} letter={letter} />
        ))}
      </div>
      <div className="flex w-10/12 ml-20">
        {keyboardRowTwo.map((letter) => (
          <Key key={letter} letter={letter} />
        ))}
      </div>
      <div className="flex w-10/12">
        {keyboardRowThree.map((letter) => (
          <Key key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
};
