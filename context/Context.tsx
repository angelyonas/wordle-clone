import { createContext } from 'react';
import { SpaceLetter, StatusGameTypes } from './Provider';

interface ContextProps {
  boxWords: Array<Array<SpaceLetter>>;
  statusGame: StatusGameTypes;
  isFinished: boolean;
  secretWord:string;
  addLetter: (letter: string) => void;
  addSecretWord: (word: string) => void;
  removeLetter: () => void;
  validateWord: () => void;
}

export const WordleContext = createContext({} as ContextProps);
