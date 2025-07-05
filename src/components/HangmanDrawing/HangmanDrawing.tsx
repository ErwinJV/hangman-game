type HangmanDrawingProps = {
  numberOfGuesses: number;
};

const BODY_PARTS = [
  <div
    key="head"
    className="w-12 h-12 rounded-full border-4 border-indigo-700 absolute top-10 right-[-20px]"
  />,
  <div
    key="body"
    className="w-1 h-20 bg-indigo-700 absolute top-[60px] right-0"
  />,
  <div
    key="right-arm"
    className="w-16 h-1 bg-indigo-700 absolute top-[80px] right-[-16px] rotate-[-30deg] origin-bottom-left"
  />,
  <div
    key="left-arm"
    className="w-16 h-1 bg-indigo-700 absolute top-[80px] right-[1px] rotate-[30deg] origin-bottom-right"
  />,
  <div
    key="right-leg"
    className="w-16 h-1 bg-indigo-700 absolute top-[140px] right-[-15px] rotate-[60deg] origin-bottom-left"
  />,
  <div
    key="left-leg"
    className="w-16 h-1 bg-indigo-700 absolute top-[140px] right-[1px] rotate-[-60deg] origin-bottom-right"
  />,
];

export default function HangmanDrawing({
  numberOfGuesses,
}: HangmanDrawingProps) {
  return (
    <div className="relative" style={{ height: "250px", width: "200px" }}>
      {/* Base */}
      <div className="h-2 w-32 bg-gray-800 ml-4" />

      {/* Poste vertical */}
      <div className="h-40 w-2 bg-gray-800 ml-4" />

      {/* Poste horizontal */}
      <div className="h-2 w-24 bg-gray-800 ml-4" />

      {/* Cuerda */}
      <div className="h-8 w-1 bg-gray-400 absolute top-0 right-0" />

      {/* Partes del cuerpo */}
      {BODY_PARTS.slice(0, numberOfGuesses)}

      {/* Contador de intentos */}
      <div className="absolute bottom-[-40px] left-0 right-0 text-center text-gray-700 font-medium">
        Intentos restantes: {6 - numberOfGuesses}
      </div>
    </div>
  );
}
