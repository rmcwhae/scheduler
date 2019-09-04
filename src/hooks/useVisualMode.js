import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(newMode) {
    return setMode(newMode);
  }
  
  return { mode, transition };
}