import { useState } from "react";

/* This Hook manages all the varying modes of the Appointment Item  */

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        prev[prev.length - 1] = mode;
        return prev;
      });
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    setMode(mode);
  };

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
