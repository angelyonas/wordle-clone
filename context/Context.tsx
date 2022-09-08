import { createContext } from 'react';
import { SpaceLetter } from './Provider'

interface ContextProps {
  boxWords: Array<Array<SpaceLetter>>;
  addLetter: (letter: string) => void;
  addSecretWord: (word: string) => void;
  removeLetter: () => void;
  validateWord: () => void;
}

export const WordleContext = createContext({} as ContextProps);
