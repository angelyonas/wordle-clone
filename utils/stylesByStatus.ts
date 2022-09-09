export type StatusTypes =
  | 'correct'
  | 'needed'
  | 'incorrect'
  | 'writing'
  | 'empty';

/**
 * Get styles in reference to status in letter
 * @param status
 * @param elementName
 * @returns string
 */
export const getStylesByStatus = (status: StatusTypes, elementName = '') => {
  const initialStyles = 'rounded-md flex items-center justify-center';

  if (status && status == 'correct') {
    return `${initialStyles} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600`;
  }

  if (status && status == 'needed') {
    return `${initialStyles} bg-yellow-500 border-yellow-500 dark:bg-yellow-500 dark:border-yellow-500`;
  }

  if (status && status == 'incorrect') {
    return `${initialStyles} bg-gray-400 border-gray-400 dark:bg-gray-400/60 dark:border-gray-400/60`;
  }

  if (status && status == 'writing') {
    return `${initialStyles} bg-white`;
  }

  const bgColors =
    elementName == 'keyboard'
      ? 'bg-gray-400/30 border-gray-300 dark:bg-[#565F7E]'
      : 'bg-gray-300 border-gray-300 dark:bg-gray-700 dark:border-gray-700';

  return `${initialStyles} ${bgColors}`;
};
