import { useState } from "react"

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //if not ERROR mode set the history
  const transition = (mode, replace = false) => {
    if (!replace) setHistory((prev) => [...prev, mode]); 
    else {
      setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode] );
    }
    setMode(mode);    
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