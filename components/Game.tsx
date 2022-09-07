import { useState } from "react"
import { LetterBlock } from "./LetterBlock"

const initRows = () => Array(5).fill(5).map(() => Array(5).fill(5).map(() => '') )

export const Game = () => {

  const [letterRows, setLetterRows] = useState(initRows())

  return (
    <div className="flex justify-center w-2/4 mx-auto flex-col" >

      <div className="flex items-center w-full bg-zinc-200 px-2 py-3 justify-between rounded-md" >
        <button className="w-8 h-8 bg-neutral-500 rounded-full text-white font-bold" >
          ?
        </button>
        <h1 className="text-3xl font-bold tracking-widest" >WORDLE</h1>
        <div className="flex" >
          <button className="w-10 h-8 bg-neutral-500 rounded relative text-white" >
            | | |
          </button>
        </div>
      </div>

      <div className="m-auto mt-10" >
        {letterRows.map((row,index) => (
          <div key={`row-${index}`} className="flex flex-wrap" >
            {row.map((letter,index) => <LetterBlock key={`letter-${index}`} letter={letter} />)}
          </div>
        ))}
      </div>

    </div>
  )
}
