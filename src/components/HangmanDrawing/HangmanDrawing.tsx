import { useRef, useEffect } from "react";

interface HangmanCanvasProps {
  numberOfGuesses: number;
}

export default function HangmanDrawing({
  numberOfGuesses,
}: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 2;

    // Dibujar la horca base
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(90, 190);
    ctx.moveTo(50, 190);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();

    // Dibujar partes del ahorcado según los intentos
    if (numberOfGuesses > 0) {
      // Cabeza
      ctx.beginPath();
      ctx.arc(120, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (numberOfGuesses > 1) {
      // Cuerpo
      ctx.beginPath();
      ctx.moveTo(120, 80);
      ctx.lineTo(120, 140);
      ctx.stroke();
    }

    if (numberOfGuesses > 2) {
      // Brazo izquierdo
      ctx.beginPath();
      ctx.moveTo(120, 90);
      ctx.lineTo(90, 110);
      ctx.stroke();
    }

    if (numberOfGuesses > 3) {
      // Brazo derecho
      ctx.beginPath();
      ctx.moveTo(120, 90);
      ctx.lineTo(150, 110);
      ctx.stroke();
    }

    if (numberOfGuesses > 4) {
      // Pierna izquierda
      ctx.beginPath();
      ctx.moveTo(120, 140);
      ctx.lineTo(90, 170);
      ctx.stroke();
    }

    if (numberOfGuesses > 5) {
      // Pierna derecha
      ctx.beginPath();
      ctx.moveTo(120, 140);
      ctx.lineTo(150, 170);
      ctx.stroke();

      // Ojos tristes (opcional)
      ctx.beginPath();
      ctx.moveTo(112, 55);
      ctx.quadraticCurveTo(120, 65, 128, 55);
      ctx.stroke();
    } else {
      // Ojos normales (antes de perder)
      ctx.beginPath();
      ctx.arc(112, 55, 3, 0, Math.PI * 2);
      ctx.arc(128, 55, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [numberOfGuesses]);

  return <canvas ref={canvasRef} width={200} height={200} />;
}
