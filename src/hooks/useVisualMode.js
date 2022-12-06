import { useState } from "react"

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (val, replace = false) => {
    if (!replace) setHistory((prev) => [...prev, val]); 
    else {
      setHistory((prev) => prev.slice(0, -1));
      setHistory((prev) => [...prev, mode]);
    }
    setMode(val);    
  }
  
  const back = () => {
    if (history.length > 1) { 
    setHistory(history.slice(0, -1));
    setMode(history[history.length-2]);
    }
  }

  return {mode, transition, back};
}