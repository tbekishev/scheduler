import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (val, replace = false) => {
    setMode(val);    
    if (!replace) history.push(mode);
    setHistory(history)
    return mode;
  }
  
  const back = () => {
    if (history.length > 1)
    return setMode(history.pop());
    return mode;
  }
  return {mode, transition, back};
}