export type StatusTypes =
  | 'correct'
  | 'needed'
  | 'incorrect'
  | 'writing'
  | 'empty';

export const getStylesByStatus = (status: StatusTypes) => {
  const initialStyles =
    'rounded-md border-2 border-black flex items-center justify-center dark:bg-gray-800 dark:border-white';

  if (status && status == 'correct') {
    return `${initialStyles} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600`;
  }

  if (status && status == 'needed') {
    return `${initialStyles} bg-yellow-500 border-yellow-500 dark:bg-yellow-500 dark:border-yellow-500`;
  }

  if (status && status == 'incorrect') {
    return `${initialStyles} bg-gray-400 border-gray-400 dark:bg-gray-400 dark:border-gray-400`;
  }

  if (status && status == 'writing') {
    return `${initialStyles} bg-white`;
  }

  return `${initialStyles} bg-gray-300 border-gray-300`;
};
