import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    const historyCopy = [...history];
    historyCopy.push(newMode);
    setHistory(historyCopy);
    setMode(newMode);
  }

  function back() {
    const historyCopy = [...history];
    historyCopy.pop();
    setHistory(historyCopy);
    setMode(historyCopy[historyCopy.length - 1]);
  }

  return { mode, transition, back };
}
