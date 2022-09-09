import { ReactElement, useReducer } from 'react';
import { wordleReducer } from './reducer';
import { WordleContext } from './Context';
import { StatusTypes } from '../utils';

export interface SpaceLetter {
  letter: string;
  status: StatusTypes;
}

export type StatusGameTypes = 'earned' | 'lost' | 'playing';

export interface WordleState {
  secretWord: string;
  boxWords: Array<Array<SpaceLetter>>;
  currentRow: number;
  isFinished: boolean;
  statusGame: StatusGameTypes;
  gamesPlayed: number;
  gamesEarned: number;
  currentTime: Date | null;
  minutes: number;
  lettersUsed: Array<SpaceLetter>;
}

export interface Props {
  children: ReactElement;
}

/**
 * Get array structure to box spaces for letters
 * @returns array[][]
 */
const initBoxSpaces = (): Array<Array<SpaceLetter>> =>
  Array(5)
    .fill(5)
    .map(() =>
      Array(5)
        .fill(5)
        .map(() => ({ letter: '', status: 'empty' }))
    );

const INITIAL_STATE: WordleState = {
  secretWord: '',
  boxWords: initBoxSpaces(),
  currentRow: 0,
  isFinished: false,
  statusGame: 'playing',
  gamesEarned: 0,
  gamesPlayed: 0,
  currentTime: null,
  minutes: 0,
  lettersUsed: [],
};

export const WordleProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(wordleReducer, INITIAL_STATE);

  /**
   * Get words used from localStorage
   * @returns array
   */
  const getWordsUsed = (): Array<string> => {
    const wordsUsed = localStorage.wu;
    const wordsList = wordsUsed ? JSON.parse(localStorage.wu) : [];
    return wordsList;
  };

  /**
   * Get random number
   * @param max
   * @returns number
   */
  const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

  /**
   * Get words gallery
   * @returns array
   */
  const getWordsGallery = async () => {
    const response = await fetch('words.txt');
    const txtData = await response.text();
    const data = txtData.split('\n');
    return data;
  };

  /**
   * Verify unic and word with 5 letters
   * @param word
   * @returns boolean
   */
  const isValidWord = (word = '') => {
    const wordsUsed = getWordsUsed();
    const alreadyExists = wordsUsed.some((value) => word === value);
    const isCorrectLength = word.length === 5;
    return !alreadyExists && isCorrectLength;
  };

  /**
   * Action to add new secret word
   */
  const addSecretWord = async () => {
    if (localStorage.ws) {
      dispatch({
        type: '[wordle] Add-secret-word',
        payload: localStorage.getItem('ws')?.toUpperCase() || '',
      });
      return true;
    }

    const data = await getWordsGallery();
    let wordSelected = '';
    do {
      const randomIndex = getRandomIndex(data.length);
      const randomWord = data[randomIndex];
      wordSelected = randomWord;
    } while (!isValidWord(wordSelected));
    const wordCleaned = wordSelected
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    localStorage.ws = wordCleaned;
    const wordsUsed = getWordsUsed();
    wordsUsed.push(wordCleaned);
    localStorage.wu = JSON.stringify(wordsUsed);
    dispatch({
      type: '[wordle] Add-secret-word',
      payload: wordCleaned.toUpperCase(),
    });
    return true;
  };

  /**
   * Action to add letter to box of words
   * @param letter
   */
  const addLetter = (letter: string) => {
    if (state.isFinished) {
      return false;
    }

    if (!state.boxWords[state.currentRow].some((space) => !space.letter)) {
      return false;
    }

    let isInserted = false;
    const rowUpdated = state.boxWords[state.currentRow].map((space) => {
      if (!space.letter && !isInserted) {
        isInserted = true;
        return { ...space, letter };
      }
      return space;
    });

    const boxWordsUpdated = state.boxWords.map((row, index) => {
      if (index === state.currentRow) {
        return rowUpdated;
      }
      return row;
    });

    dispatch({ type: '[keyboard] Add-letter', payload: boxWordsUpdated });
  };

  /**
   * Action to remove letter in row
   */
  const removeLetter = () => {
    if (state.boxWords[state.currentRow].every((space) => !space)) {
      return false;
    }

    const boxReverse = state.boxWords[state.currentRow].reverse();

    let isCleaned = false;
    const arrayCleaned = boxReverse.map((space) => {
      if (space.letter && !isCleaned) {
        isCleaned = true;
        return { ...space, letter: '' };
      }
      return space;
    });
    const rowUpdated = arrayCleaned.reverse();

    const boxWordsUpdated = state.boxWords.map((row, index) => {
      if (index === state.currentRow) {
        return rowUpdated;
      }
      return row;
    });

    dispatch({ type: '[keyboard] Remove-letter', payload: boxWordsUpdated });
  };

  /**
   * Get status game
   */
  const getStatusGame = (isWinner: boolean, isFinished: boolean) => {
    if (isWinner) {
      return 'earned';
    }
    if (isFinished) {
      return 'lost';
    }
    return 'playing';
  };

  /**
   * Validate word typed in row
   */
  const validateWord = () => {
    if (!state.boxWords[state.currentRow].every((space) => space.letter)) {
      return false;
    }

    let lettersUsedUpdated: Array<SpaceLetter> = JSON.parse(
      JSON.stringify(state.lettersUsed)
    );
    const rowUpdated: Array<SpaceLetter> = state.boxWords[state.currentRow].map(
      (space, index) => {
        const secretWordLetters = state.secretWord.split('');
        const letterIndexes: Array<number> = [];
        const letterUsedExists = lettersUsedUpdated.some(
          (letterUsed) => letterUsed.letter === space.letter
        );

        secretWordLetters.forEach((letter, index) => {
          if (letter === space.letter) {
            letterIndexes.push(index);
          }
        });

        let status: StatusTypes = 'writing';

        if (!letterIndexes.length) {
          status = 'incorrect';
        }

        if (letterIndexes.length) {
          status = 'needed';
        }

        if (letterIndexes.some((value) => value === index)) {
          status = 'correct';
        }

        if (!letterUsedExists) {
          lettersUsedUpdated.push({ ...space, status });
        } else {
          const validateStatus = lettersUsedUpdated.map((spaceLetterUsed) => {
            if (
              space.letter === spaceLetterUsed.letter &&
              status !== spaceLetterUsed.status
            ) {
              return {
                ...spaceLetterUsed,
                status,
              };
            }
            return spaceLetterUsed;
          });
          lettersUsedUpdated = validateStatus;
        }

        return {
          ...space,
          status,
        };
      }
    );

    const isWinner = rowUpdated.every((space) => space.status === 'correct');
    const currentRowUpdated = state.currentRow + 1;
    let isFinished = currentRowUpdated > 4;
    let gamesEarned = state.gamesEarned;
    let minutes = 0;

    const statusGame: StatusGameTypes = getStatusGame(isWinner, isFinished);
    if (statusGame == 'earned') {
      isFinished = true;
      gamesEarned += 1;
      minutes = 5;
    }

    if (statusGame == 'lost') {
      minutes = 5;
    }

    const gamesPlayed = isFinished ? state.gamesPlayed + 1 : state.gamesPlayed;

    const boxWordsUpdated = state.boxWords.map((row, index) => {
      if (index === state.currentRow) {
        return rowUpdated;
      }
      return row;
    });

    const payload = {
      boxWords: boxWordsUpdated,
      currentRow: currentRowUpdated,
      statusGame,
      isFinished,
      gamesPlayed,
      gamesEarned,
      minutes,
      lettersUsed: lettersUsedUpdated,
    };

    dispatch({ type: '[wordle] Validate-word', payload });
  };

  /**
   * Get game status from localStorage
   */
  const getStatsFromStorage = () => {
    const currentTime = localStorage.currentTime;
    let minutes = 5;
    if (currentTime) {
      const finshedDate: number = new Date(parseInt(currentTime, 10)).getTime();
      const today: number = new Date().getTime();
      const timeBetween = today - finshedDate;
      minutes = Math.round(((timeBetween % 86400000) % 3600000) / 60000);
      if (minutes >= 5) {
        localStorage.isFinished = '';
        localStorage.box = '';
        localStorage.currentTime = '';
        localStorage.ws = '';
        localStorage.lettersUsed = '';
        minutes = 5;
        addSecretWord();
      }
    }

    const payload = {
      gamesEarned: parseInt(localStorage.played, 10) || 0,
      gamesPlayed: parseInt(localStorage.earned, 10) || 0,
      currentTime: localStorage.currentTime || null,
      isFinished: localStorage.isFinished || false,
      boxWords: localStorage.box
        ? JSON.parse(localStorage.box)
        : initBoxSpaces(),
      lettersUsed: localStorage.lettersUsed
        ? JSON.parse(localStorage.lettersUsed)
        : [],
      minutes,
    };
    dispatch({ type: '[wordle] Get-stats', payload });
  };

  return (
    <WordleContext.Provider
      value={{
        ...state,
        // Actions
        addLetter,
        addSecretWord,
        removeLetter,
        validateWord,
        getStatsFromStorage,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
