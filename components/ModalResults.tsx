/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useMemo, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { WordleContext } from '../context';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalResults = ({ open, onClose }: Props) => {
  const {
    statusGame,
    isFinished,
    secretWord,
    gamesPlayed,
    gamesEarned,
    minutes,
    getStatsFromStorage,
  } = useContext(WordleContext);
  const isLostTheGame = useMemo(
    () => isFinished && statusGame === 'lost',
    [isFinished, statusGame]
  );
  const [timeText, setTimeText] = useState('--:--');

  useEffect(() => {
    let interval: NodeJS.Timer;
    const timer = (duration: number) => {
      let timing = duration;
      interval = setInterval(() => {
        let minutes = `${parseInt(`${timing / 60}`, 10)}`;
        let seconds = `${parseInt(`${timing % 60}`, 10)}`;

        minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes;
        seconds = parseInt(seconds) < 10 ? '0' + seconds : seconds;

        setTimeText(minutes + ':' + seconds);

        if (--timing < 0) {
          timing = duration;
          getStatsFromStorage();
        }
      }, 1000);
    };

    if (isFinished) {
      const remaining = 60 * (5 - minutes);
      timer(remaining);
    }

    return () => interval && clearInterval(interval);
  }, [minutes]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800/90 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#F3F3F3] dark:bg-gray-800 text-left shadow-xl border border-black transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-[#F3F3F3] dark:bg-gray-800 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-center"
                    >
                      Estadísticas
                    </Dialog.Title>
                    <div className="mt-2 flex justify-between w-full">
                      <div className="text-center">
                        <p className="text-3xl font-bold">{gamesPlayed}</p>
                        <p>Jugadas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">{gamesEarned}</p>
                        <p>Victorias</p>
                      </div>
                    </div>
                    {isLostTheGame && (
                      <p className="my-8">
                        La palabra era: <b>{secretWord}</b>
                      </p>
                    )}
                    {isFinished && (
                      <div className="mt-6">
                        <p>SIGUIENTE PALABRA</p>
                        <p className="font-bold text-xl mt-2">{timeText}</p>
                      </div>
                    )}
                    <button
                      onClick={() => onClose()}
                      className="bg-[#6AAA64] w-40 py-1 text-xl text-white font-bold mt-10 rounded"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
