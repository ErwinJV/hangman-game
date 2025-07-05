import { useCallback, useEffect, useState } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

const WORDS = [
  "NARUTO",
  "GOKU",
  "LIGHT",
  "SAITAMA",
  "LEVI",
  "EREN",
  "TANJIRO",
  "NEZUKO",
  "LUFY",
  "ZORO",
  "SAKURA",
  "HINATA",
  "DEKU",
  "BAKUGO",
  "TODOROKI",
  "KAKASHI",
  "ITACHI",
  "MADARA",
  "ONEPIECE",
  "DRAGONBALL",
  "ATTACKONTITAN",
  "DEATHNOTE",
  "DEMONSLAYER",
  "MYHEROACADEMIA",
  "NARUTOSHIPPUDEN",
  "TOKYOGHOUL",
  "JUJUTSUKAISEN",
  "HUNTERXHUNTER",
  "BLEACH",
  "FULLMETALALCHEMIST",

  // Tecnología (20 palabras)
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "ANGULAR",
  "PYTHON",
  "JAVA",
  "KOTLIN",
  "SWIFT",
  "ALGORITMO",
  "FIREBASE",
  "POSTGRESQL",
  "MONGODB",
  "MICROSERVICIOS",
  "BLOCKCHAIN",
  "INTELIGENCIAARTIFICIAL",
  "REALIDADAUMENTADA",
  "CLOUDCOMPUTING",
  "INTERNETOFTHINGS",
  "CYBERSECURITY",
  "DEVOPS",

  // Cocina Árabe (10 palabras)
  "HUMMUS",
  "FALAFEL",
  "SHAWARMA",
  "TABULE",
  "KEBAB",
  "BAKLAVA",
  "MOUSSAKA",
  "PITA",
  "TAHINI",
  "DOLMA",

  // Cocina Oriental (10 palabras)
  "SUSHI",
  "RAMEN",
  "DIMSUM",
  "PADTHAI",
  "TERIYAKI",
  "TEMPURA",
  "UDON",
  "WASABI",
  "MISO",
  "GYOZA",

  // Cocina Francesa (10 palabras)
  "CROISSANT",
  "BOEUFBOURGUIGNON",
  "RATATOUILLE",
  "QUICHE",
  "CREPE",
  "MACARON",
  "PROVENCE",
  "BOUILLABAISSE",
  "FOIEGRAS",
  "SOUFFLE",

  // Cocina Italiana (10 palabras)
  "PIZZA",
  "PASTA",
  "LASAGNA",
  "RISOTTO",
  "TIRAMISU",
  "CARBONARA",
  "PESTO",
  "BRUSCHETTA",
  "PANNACOTTA",
  "GNOCCHI",

  // Cocina Venezolana (10 palabras)
  "AREAPA",
  "CACHAPA",
  "PABELLON",
  "HALLACA",
  "ASADONEGRO",
  "TIZANA",
  "MANDOCA",
  "CHICHA",
  "QUESILLO",
  "TELITA",
];
export default function App() {
  const [wordToGuess, setWordToGuess] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
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
          {isWinner && (
            <div className="text-2xl font-bold text-green-600 animate-bounce">
              ¡Ganaste! 🎉
            </div>
          )}
          {isLoser && (
            <div className="text-2xl font-bold text-red-600">
              ¡Perdiste! 😢 La palabra era: {wordToGuess}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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
            className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
            onClick={restartGame}
          >
            Jugar de nuevo
          </button>
        )}
      </div>
    </div>
  );
}
