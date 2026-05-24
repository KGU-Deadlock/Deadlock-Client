import { motion } from "motion/react";
import { useEffect, useState } from "react";

const TERMINAL_LINE = "hello!";

export function LoginTerminalHello() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i <= TERMINAL_LINE.length; i++) {
          if (cancelled) return;
          setDisplay(TERMINAL_LINE.slice(0, i));
          await new Promise((r) => setTimeout(r, 95));
        }
        await new Promise((r) => setTimeout(r, 1600));
        for (let i = TERMINAL_LINE.length; i >= 0; i--) {
          if (cancelled) return;
          setDisplay(TERMINAL_LINE.slice(0, i));
          await new Promise((r) => setTimeout(r, 42));
        }
        await new Promise((r) => setTimeout(r, 700));
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="h-fit w-max max-w-[min(92vw,240px)] px-3 py-1 font-mono text-sm"
      aria-hidden
    >
      <div className="text-blue-004 flex min-h-5 items-center gap-0.5 whitespace-nowrap">
        <span className="text-blue-003 mr-1 shrink-0 select-none">{"$"}</span>
        <span className="h-[1.5em] shrink-0 text-lg">{display}</span>
        <motion.span
          className="bg-blue-004 inline-block h-[1.5em] w-1 shrink-0"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            duration: 0.85,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
