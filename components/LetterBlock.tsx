import { useMemo } from 'react';
import { getStylesByStatus, StatusTypes } from '../utils';

interface Props {
  letter?: string;
  status?: StatusTypes;
}

export const LetterBlock = ({ letter, status = 'empty' }: Props) => {
  const blockStyles = useMemo(() => getStylesByStatus(status), [status]);

  return (
    <div className={`w-16 h-16 m-2 ${blockStyles} dark:text-white`}>
      <p className="text-3xl font-bold">{letter}</p>
    </div>
  );
};
