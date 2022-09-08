import { ReactElement, useReducer } from "react";
import { wordleReducer } from './reducer'
import { WordleContext } from "./Context";
import { StatusTypes } from '../utils'

export interface SpaceLetter {
  letter: string;
  status: StatusTypes
}

export interface WordleState {
  secretWord:string;
  boxWords: Array<Array<SpaceLetter>>;
  currentRow:number;
}

export interface Props {
  children: ReactElement
}

const INITIAL_STATE: WordleState = {
  secretWord: "ANGEL",
  boxWords: Array(5)
    .fill(5)
    .map(() =>
      Array(5)
        .fill(5)
        .map(() => ({ letter: '', status: 'empty'}))
    ),
  currentRow: 0
}; 

export const WordleProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(wordleReducer, INITIAL_STATE);

  /**
   * Action to add secret word for dicover
   * @param word
   */
  const addSecretWord = (word: string) => {
    localStorage.sw = word;
    dispatch({ type: "[wordle] Add-secret-word", payload: word });
  };

  /**
   * Action to add letter to box of words
   * @param letter
   */
  const addLetter = (letter: string) => {
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

    dispatch({ type: "[keyboard] Add-letter", payload: boxWordsUpdated });
  };

  /**
   * Action to remove letter in row
   * @returns 
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

    dispatch({ type: "[keyboard] Remove-letter", payload: boxWordsUpdated });
  };

  const validateWord = () => {
    if (!state.boxWords[state.currentRow].every(space => space.letter)) {
      return false
    }

    const rowUpdated: Array<SpaceLetter> = state.boxWords[state.currentRow].map((space, index) => {
      const indexWord = state.secretWord.indexOf(space.letter);
      if (indexWord === -1) {
        return {
          ...space,
          status: 'incorrect'
        }
      }

      if (indexWord === index ) {
        return {
          ...space,
          status: 'correct'
        }
      }

      if (indexWord !== index) {
        return {
          ...space,
          status: 'needed'
        }
      }

      return space;

    });

    const boxWordsUpdated = state.boxWords.map((row, index) => {
      if (index === state.currentRow) {
        return rowUpdated;
      }
      return row;
    });

    const payload = {
      boxWords: boxWordsUpdated,
      currentRow: state.currentRow + 1,
    };

    dispatch({ type: '[wordle] Validate-word', payload })

  }

  return (
    <WordleContext.Provider
      value={{
        ...state,
        // Actions
        addLetter,
        addSecretWord,
        removeLetter,
        validateWord,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
}