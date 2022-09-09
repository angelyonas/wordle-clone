import { createContext } from 'react';
import { SpaceLetter, StatusGameTypes } from './Provider';

interface ContextProps {
  boxWords: Array<Array<SpaceLetter>>;
  statusGame: StatusGameTypes;
  isFinished: boolean;
  secretWord: string;
  gamesPlayed: number;
  gamesEarned: number;
  minutes: number;
  currentRow: number;
  lettersUsed: Array<SpaceLetter>;
  addLetter: (letter: string) => void;
  addSecretWord: () => Promise<boolean>;
  removeLetter: () => void;
  validateWord: () => void;
  getStatsFromStorage: () => void;
}

export const WordleContext = createContext({} as ContextProps);
