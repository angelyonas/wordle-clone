import { WordleState, SpaceLetter, StatusGameTypes } from './Provider';

interface ValidatePayload {
  boxWords: Array<Array<SpaceLetter>>;
  currentRow: number;
  statusGame: StatusGameTypes;
  isFinished: boolean;
}

type WordleActionType =
  | { type: '[keyboard] Add-letter'; payload: Array<Array<SpaceLetter>> }
  | { type: '[keyboard] Remove-letter'; payload: Array<Array<SpaceLetter>> }
  | { type: '[wordle] Add-secret-word'; payload: string }
  | { type: '[wordle] Validate-word'; payload: ValidatePayload };

export const wordleReducer = (
  state: WordleState,
  action: WordleActionType
): WordleState => {
  switch (action.type) {
    case '[wordle] Add-secret-word':
      return {
        ...state,
        secretWord: action.payload,
      };

    case '[keyboard] Add-letter':
      return {
        ...state,
        boxWords: action.payload,
      };

    case '[keyboard] Remove-letter':
      return {
        ...state,
        boxWords: action.payload,
      };

    case '[wordle] Validate-word':
      return {
        ...state,
        currentRow: action.payload.currentRow,
        boxWords: action.payload.boxWords,
        statusGame: action.payload.statusGame,
        isFinished: action.payload.isFinished
      };

    default:
      return state;
  }
};
