import { useState } from "react";

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
  // const back = () => {
  //   if (history.length > 1) {
  //     const newHistory = [...history];
  //     newHistory.pop();
  //     setMode(newHistory[newHistory.length - 1]);
  //     setHistory(newHistory);
  //   }
  // };

  // function transition(newMode, replace = false) {
  //   const historyCopy = [...history];

  //   if (replace) {
  //     // historyCopy.pop();
  //     // historyCopy.push(newMode);
  //     setHistory((prev) => {
  //       prev[prev.length - 1] = newMode;
  //       return prev;
  //     });
  //     // setHistory(historyCopy);
  //     // setMode(newMode);
  //   } else {
  //     //Good alternative to using push --> setHistory([...history, newMode])
  //     historyCopy.push(newMode);
  //     setHistory(historyCopy);
  //     setMode(newMode);
  //   }
  // }

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      //Good alternative to using pop --> history.slice(0, history.length -1)
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return { mode, transition, back };
}
