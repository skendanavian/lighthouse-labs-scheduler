import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const historyCopy = [...history];

    if (replace) {
      historyCopy.pop();
      historyCopy.push(newMode);
      setHistory(historyCopy);
      setMode(newMode);
    } else {
      historyCopy.push(newMode);
      setHistory(historyCopy);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return { mode, transition, back };
}
