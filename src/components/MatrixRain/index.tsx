import React, { useEffect, useRef, useState } from "react";
import styles from "./MatrixRain.module.css";

interface MatrixRainProps {
  onDismiss: () => void;
  showClock?: boolean;
  caption?: string;
}

const GLYPHS =
  "アァカサタナハマヤャラワン0123456789ABCDEFXYZ<>/{}[];=+-*アリャナイル";

const MatrixRain: React.FC<MatrixRainProps> = ({
  onDismiss,
  showClock = false,
  caption,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    if (!showClock) return;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [showClock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let animationFrame = 0;
    let lastFrame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth ?? window.innerWidth;
      canvas.height = parent?.clientHeight ?? window.innerHeight;
      columns = Math.ceil(canvas.width / fontSize);
      drops = Array.from(
        { length: columns },
        () => -Math.floor((Math.random() * canvas.height) / fontSize)
      );
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (timestamp: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (timestamp - lastFrame < 50) return;
      lastFrame = timestamp;

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "#9dff9d";
        ctx.fillText(glyph, x, y);
        ctx.fillStyle = "rgba(0, 255, 70, 0.75)";
        ctx.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          x,
          y - fontSize
        );

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const dismissEvents: Array<keyof WindowEventMap> = [
      "keydown",
      "mousedown",
      "touchstart",
      "wheel",
    ];
    // Defer subscription a tick so the triggering event doesn't immediately
    // dismiss the overlay.
    const timer = setTimeout(() => {
      dismissEvents.forEach(event => window.addEventListener(event, onDismiss));
    }, 400);

    return () => {
      clearTimeout(timer);
      dismissEvents.forEach(event =>
        window.removeEventListener(event, onDismiss)
      );
    };
  }, [onDismiss]);

  return (
    <div className={styles.overlay} role="presentation">
      <canvas ref={canvasRef} className={styles.canvas} />
      {showClock && (
        <div className={styles.clock}>
          <span className={styles.clockTime}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className={styles.clockDate}>
            {time.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      )}
      <span className={styles.caption}>
        {caption ?? "move the mouse or press any key to exit"}
      </span>
    </div>
  );
};

export default MatrixRain;
