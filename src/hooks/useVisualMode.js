import { useState } from "react"

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //if not ERROR mode set the history
  const transition = (val, replace = false) => {
    if (!replace) setHistory((prev) => [...prev, val]); 
    else {
      setHistory((prev) => prev.slice(0, -1));
      setHistory((prev) => [...prev, mode]);
    }
    setMode(val);    
  }
  // if history is not empty, set previous mode from the history array
  const back = () => {
    if (history.length > 1) { 
    setHistory(history.slice(0, -1));
    setMode(history[history.length-2]);
    }
  }

  return {mode, transition, back};
}