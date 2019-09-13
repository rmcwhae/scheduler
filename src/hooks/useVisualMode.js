import { useState } from 'react';

export default function useVisualMode(initial) {
	const [ mode, setMode ] = useState(initial);
	const [ history, setHistory ] = useState([ initial ]);
	const historyCopy = [ ...history ];

	function transition(mode, replace = false) {
		if (replace) {
			historyCopy.pop();
			setHistory(historyCopy);
		}
		setMode(mode);
		setHistory((prev) => [ ...prev, mode ]);
	}

	function back() {
		if (history.length > 1) {
			historyCopy.pop();
			setHistory(historyCopy);
			setMode(historyCopy.slice(-1)[0]);
		} else {
			setMode(history[0]);
		}
	}

	return { mode, transition, back };
}
