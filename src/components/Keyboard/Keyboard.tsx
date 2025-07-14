import { useCallback } from "react";

interface KeyboardProps {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
}

const KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div className=" grid grid-cols-7 sm:grid-cols-9 gap-2 ">
      {KEYS.map((key) => (
        <Letter
          addGuessedLetter={addGuessedLetter}
          disabled={disabled}
          isActive={activeLetters.includes(key)}
          isInactive={inactiveLetters.includes(key)}
          letter={key}
          key={key}
        />
      ))}
    </div>
  );
}

interface LetterProps
  extends Omit<KeyboardProps, "activeLetters" | "inactiveLetters"> {
  disabled: boolean;
  isActive: boolean;
  isInactive: boolean;
  letter: string;
}

function Letter({
  addGuessedLetter,
  letter,
  isActive,
  isInactive,
  disabled,
}: LetterProps) {
  const handleAddGuessedLetter = useCallback(() => {
    addGuessedLetter(letter);
  }, [addGuessedLetter, letter]);
  return (
    <button
      onClick={handleAddGuessedLetter}
      className={`
    w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 border-2 border-gray-300 rounded-md font-bold text-lg 
    flex items-center justify-center cursor-pointer select-none
    ${isActive ? "bg-indigo-100 border-indigo-500 text-indigo-700" : ""}
    ${
      isInactive
        ? "opacity-30 cursor-not-allowed"
        : "hover:bg-gray-100 active:scale-95"
    }
    ${disabled && "opacity-50 cursor-not-allowed"}
  `}
      disabled={isInactive || isActive || disabled}
    >
      {letter}
    </button>
  );
}
