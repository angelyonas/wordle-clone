import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LetterBlock } from './LetterBlock';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalInstructions = ({ open, onClose }: Props) => {
  const catWord = 'GATOS';
  const vocalWord = 'VOCAL';
  const singingWord = 'CANTO';

  /**
   * handle on click play button
   */
  const handleClickPlay = () => {
    localStorage.visited = 'true';
    onClose();
  };

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
          <div className="fixed inset-0 bg-[#F3F3F3] dark:bg-gray-800/90  bg-opacity-90 transition-opacity" />
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
                <div className="w-full mx-auto bg-zinc-100 border-black p-10 text-black rounded-2xl  dark:text-white dark:bg-gray-800">
                  <h1 className="text-2xl text-center font-bold mb-6">
                    Cómo jugar
                  </h1>
                  <p className="my-2">
                    Adivina cada palabra oculta en cinco intentos.
                  </p>
                  <p className="my-2">
                    Cada intento debe ser una palabra válida de 5 letras.
                  </p>
                  <p className="my-2">
                    Despúes de cada intento el color de las letras cambia para
                    mostrar que tan cerca estás de acertar la palabra.
                  </p>
                  <p className="mb-2 font-bold">Ejemplos</p>
                  <div className="flex justify-center">
                    {catWord.split('').map((letter, index) => (
                      <LetterBlock
                        key={`${letter}-${index}`}
                        letter={letter}
                        status={letter == 'G' ? 'correct' : 'empty'}
                      />
                    ))}
                  </div>
                  <p className="my-2">
                    La letra <b>G</b> está en la palabra y en la posición
                    correcta.
                  </p>
                  <div className="flex justify-center">
                    {vocalWord.split('').map((letter, index) => (
                      <LetterBlock
                        key={`${letter}-${index}`}
                        letter={letter}
                        status={letter == 'C' ? 'needed' : 'empty'}
                      />
                    ))}
                  </div>
                  <p className="my-2">
                    La letra <b>C</b> está en la palabra pero en la posición
                    incorrecta.
                  </p>
                  <div className="flex justify-center">
                    {singingWord.split('').map((letter, index) => (
                      <LetterBlock
                        key={`${letter}-${index}`}
                        letter={letter}
                        status={letter == 'O' ? 'incorrect' : 'empty'}
                      />
                    ))}
                  </div>
                  <p className="my-2">
                    La letra <b>O</b> no está en la palabra.
                  </p>
                  <p className="my-8">
                    Puede haber letras repetidas. Las pistas son independientes
                    para cada letra.
                  </p>
                  <p className="my-8 text-center">
                    ¡Una palabra nueva cada 5 minutos!
                  </p>
                  <button
                    onClick={handleClickPlay}
                    className="block mx-auto bg-lime-600 text-white font-bold px-16 py-2 rounded-md text-2xl hover:bg-lime-700"
                  >
                    ¡JUGAR!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
