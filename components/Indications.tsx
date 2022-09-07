import { LetterBlock } from "./LetterBlock";

interface Props {
  onPlay: () => void;
}

export const Indications = ({ onPlay }: Props) => {
  const catWord = "GATOS";
  const vocalWord = "VOCAL";
  const singingWord = "CANTO";

  /**
   * handle on click play button
   */
  const handleClickPlay = () => {
    localStorage.visited = "true";
    onPlay();
  };

  return (
    <div className="w-1/3 mx-auto border-2 bg-zinc-100 border-black p-10 text-black rounded-2xl dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl text-center font-bold mb-6">Cómo jugar</h1>
      <p className="my-2">Adivina cada palabra oculta en cinco intentos.</p>
      <p className="my-2">
        Cada intento debe ser una palabra válida de 5 letras.
      </p>
      <p className="my-2">
        Despúes de cada intento el color de las letras cambia para mostrar que
        tan cerca estás de acertar la palabra.
      </p>
      <p className="mb-2 font-bold">Ejemplos</p>
      <div className="flex justify-center">
        {catWord.split("").map((letter, index) => (
          <LetterBlock
            key={`${letter}-${index}`}
            letter={letter}
            status={letter == "G" ? "correct" : "writing"}
          />
        ))}
      </div>
      <p className="my-2">
        La letra <b>G</b> está en la palabra y en la posición correcta.
      </p>
      <div className="flex justify-center">
        {vocalWord.split("").map((letter, index) => (
          <LetterBlock
            key={`${letter}-${index}`}
            letter={letter}
            status={letter == "C" ? "needed" : "writing"}
          />
        ))}
      </div>
      <p className="my-2">
        La letra <b>C</b> está en la palabra pero en la posición incorrecta.
      </p>
      <div className="flex justify-center">
        {singingWord.split("").map((letter, index) => (
          <LetterBlock
            key={`${letter}-${index}`}
            letter={letter}
            status={letter == "O" ? "incorrect" : "writing"}
          />
        ))}
      </div>
      <p className="my-2">
        La letra <b>O</b> no está en la palabra.
      </p>
      <p className="my-8">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>
      <p className="my-8 text-center">¡Una palabra nueva cada 5 minutos!</p>
      <button
        onClick={handleClickPlay}
        className="block mx-auto bg-lime-600 text-white font-bold px-16 py-2 rounded-md text-2xl hover:bg-lime-700"
      >
        ¡JUGAR!
      </button>
    </div>
  );
};
