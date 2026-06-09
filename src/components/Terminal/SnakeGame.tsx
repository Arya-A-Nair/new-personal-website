import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { unlock } from "../../utils/achievements";

interface SnakeGameProps {
  onExit: (score: number) => void;
}

const COLS = 26;
const ROWS = 14;
const TICK_MS = 130;

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
  return food;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onExit }) => {
  const [board, setBoard] = useState<string>("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const snakeRef = useRef<Point[]>([
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ]);
  const directionRef = useRef<Direction>("right");
  const pendingDirection = useRef<Direction>("right");
  const foodRef = useRef<Point>(randomFood(snakeRef.current));
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);

  const render = useCallback(() => {
    const snake = snakeRef.current;
    const food = foodRef.current;
    const grid: string[][] = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => " ")
    );
    grid[food.y][food.x] = "◆";
    snake.forEach((seg, i) => {
      grid[seg.y][seg.x] = i === 0 ? "█" : "▓";
    });

    const top = `╔${"═".repeat(COLS)}╗`;
    const bottom = `╚${"═".repeat(COLS)}╝`;
    const rows = grid.map(row => `║${row.join("")}║`);
    setBoard([top, ...rows, bottom].join("\n"));
  }, []);

  const changeDirection = useCallback((next: Direction) => {
    if (OPPOSITE[next] !== directionRef.current) {
      pendingDirection.current = next;
    }
  }, []);

  const endGame = useCallback(() => {
    if (gameOverRef.current) return;
    gameOverRef.current = true;
    setGameOver(true);
    if (scoreRef.current >= 10) {
      unlock("snake");
    }
    setTimeout(() => onExit(scoreRef.current), 1400);
  }, [onExit]);

  useEffect(() => {
    render();
    const interval = setInterval(() => {
      if (gameOverRef.current) return;

      directionRef.current = pendingDirection.current;
      const snake = snakeRef.current;
      const head = snake[0];
      const delta: Record<Direction, Point> = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };
      const move = delta[directionRef.current];
      const next: Point = { x: head.x + move.x, y: head.y + move.y };

      const hitWall =
        next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS;
      const hitSelf = snake.some(seg => seg.x === next.x && seg.y === next.y);
      if (hitWall || hitSelf) {
        endGame();
        return;
      }

      const ateFood =
        next.x === foodRef.current.x && next.y === foodRef.current.y;
      snakeRef.current = [next, ...snake.slice(0, ateFood ? snake.length : -1)];
      if (ateFood) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        foodRef.current = randomFood(snakeRef.current);
      }
      render();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [render, endGame]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          event.preventDefault();
          changeDirection("up");
          break;
        case "ArrowDown":
        case "s":
          event.preventDefault();
          changeDirection("down");
          break;
        case "ArrowLeft":
        case "a":
          event.preventDefault();
          changeDirection("left");
          break;
        case "ArrowRight":
        case "d":
          event.preventDefault();
          changeDirection("right");
          break;
        case "Escape":
        case "q":
          endGame();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, endGame]);

  return (
    <div className={styles.snakeWrapper}>
      <div className={styles.snakeHud}>
        <span>
          SNAKE — score: <span className={styles.highlight}>{score}</span>
        </span>
        <span className={styles.dim}>arrows/wasd to steer · q to quit</span>
      </div>
      <pre className={styles.snakeBoard}>{board}</pre>
      {gameOver && (
        <div className={styles.snakeGameOver}>
          GAME OVER — score {score}
          {score >= 10 ? " 🏆" : ""}
        </div>
      )}
      <div className={styles.snakeControls}>
        <button onClick={() => changeDirection("up")} aria-label="Up">
          ▲
        </button>
        <div>
          <button onClick={() => changeDirection("left")} aria-label="Left">
            ◀
          </button>
          <button onClick={() => endGame()} aria-label="Quit">
            ✕
          </button>
          <button onClick={() => changeDirection("right")} aria-label="Right">
            ▶
          </button>
        </div>
        <button onClick={() => changeDirection("down")} aria-label="Down">
          ▼
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
