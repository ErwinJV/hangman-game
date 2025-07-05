interface HangmanWordProps {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
}

export default function HangmanWord({
  wordToGuess,
  guessedLetters,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div className="flex gap-2 text-4xl font-bold uppercase my-8 flex-wrap justify-center">
      {wordToGuess.split("").map((letter, index) => (
        <div
          key={index}
          className="border-b-4 border-indigo-700 w-10 h-12 flex justify-center"
        >
          <span
            className={`
              ${
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "invisible"
              }
              ${
                !guessedLetters.includes(letter) && reveal
                  ? "text-red-500"
                  : "text-indigo-700"
              }
            `}
          >
            {letter}
          </span>
        </div>
      ))}
    </div>
  );
}
