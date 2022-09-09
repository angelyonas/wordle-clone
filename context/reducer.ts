import { WordleState, SpaceLetter, StatusGameTypes } from './Provider';

interface ValidatePayload {
  boxWords: Array<Array<SpaceLetter>>;
  currentRow: number;
  statusGame: StatusGameTypes;
  isFinished: boolean;
  gamesPlayed: number;
  gamesEarned: number;
  minutes: number;
  lettersUsed: Array<SpaceLetter>;
}

interface StatsPayload {
  gamesPlayed: number;
  gamesEarned: number;
  currentTime: Date | null;
  isFinished: boolean;
  boxWords: Array<Array<SpaceLetter>>;
  minutes: number;
  lettersUsed: Array<SpaceLetter>;
}

type WordleActionType =
  | { type: '[keyboard] Add-letter'; payload: Array<Array<SpaceLetter>> }
  | { type: '[keyboard] Remove-letter'; payload: Array<Array<SpaceLetter>> }
  | { type: '[wordle] Add-secret-word'; payload: string }
  | { type: '[wordle] Validate-word'; payload: ValidatePayload }
  | { type: '[wordle] Get-stats'; payload: StatsPayload };

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

    case '[wordle] Validate-word': {
      const { isFinished, gamesPlayed, gamesEarned, boxWords, lettersUsed } =
        action.payload;

      if (isFinished) {
        localStorage.played = gamesPlayed;
        localStorage.earned = gamesEarned;
        localStorage.isFinished = true;
        localStorage.currentTime = new Date().getTime();
        localStorage.box = JSON.stringify(boxWords);
        localStorage.lettersUsed = JSON.stringify(lettersUsed);
      }

      return {
        ...state,
        ...action.payload,
      };
    }

    case '[wordle] Get-stats':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
