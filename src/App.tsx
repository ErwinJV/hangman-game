import { useCallback, useEffect, useState } from "react";
import { IoGameController } from "react-icons/io5";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

import { HANGMAN_WORDS, WORDS, type HangWord } from "./utils/words";

export default function App() {
  const [wordToGuess, setWordToGuess] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  const hintWord = HANGMAN_WORDS.find(
    (hangmanWord) => hangmanWord.word === wordToGuess
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const restartGame = useCallback(() => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWordToGuess(newWord);
    setGuessedLetters([]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (!key.match(/^[A-ZÑ]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">
          Juego del Ahorcado
        </h1>

        <div className="mb-6">
          <h3 className="text-2xl">PISTA: {hintWord?.hint}</h3>
        </div>
        <div className="mb-6">
          {isWinner && (
            <div className="text-2xl font-bold text-green-600 animate-bounce transition-all duration-300 ease-in-out">
              ¡Ganaste! 🎉
            </div>
          )}
          {isLoser && (
            <div className="text-2xl font-bold text-red-600 transition-all duration-300 ease-in-out">
              ¡Perdiste! 😢 La palabra era: {wordToGuess}
            </div>
          )}
          {!isLoser && !isWinner && <div className="h-[32px]"></div>}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            <HangmanWord
              wordToGuess={wordToGuess}
              guessedLetters={guessedLetters}
              reveal={isLoser}
            />

            <div className="mt-12 w-full max-w-xl">
              <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={guessedLetters.filter((letter) =>
                  wordToGuess.includes(letter)
                )}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />
            </div>
          </div>
        </div>

        {(isWinner || isLoser) && (
          <button
            className="cursor-pointer mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
            onClick={restartGame}
          >
            <div className="flex items-center">
              <IoGameController size={32} />
              <div className="w-[20px]"></div>{" "}
              <span className="text-xl">Play Again</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
