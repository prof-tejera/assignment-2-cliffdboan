import { useState, useEffect } from "react";

export function useRunTimers({ timerType, initialMinutes, initialSeconds, initialNumRounds, initialRound }) {
    /**
     * set the values of minutes, seconds, and rounds with the timer 'off'
     * if the timer has an initial value (like when in its array), use that value as 'initial,'
     * otherwise, set the timer to 00:00. If the timer counts up from 0, begin it at 00:00 rather than the initial values
     */
    const [selectedMinute, setSelectedMinute] = useState(timerType === 'stopwatch' ? 0 : initialMinutes || 0);
    const [selectedSecond, setSelectedSecond] = useState(timerType === 'stopwatch' ? 0 : initialSeconds || 0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [numRounds, setNumRounds] = useState(initialNumRounds || 1);
    const [currentRound, setCurrentRound] = useState(initialRound || 1);

    // functions to set the timer to running or not based on the button
    const startTimer = () => {
        if (!timerRunning) setTimerRunning(true);
    };

    const pauseTimer = () => {
        if (timerRunning) setTimerRunning(false);
    };

    // reset the timer to its proper position based on the timer type
    const resetTimer = () => {
        if (timerRunning) {
            setTimerRunning(false);
        };
        if (timerType === "countdown" || timerType === "xy") {
            setSelectedMinute(initialMinutes);
            setSelectedSecond(initialSeconds);
        } else if (timerType === "stopwatch") {
            setSelectedMinute(0);
            setSelectedSecond(0);
        };
        setCurrentRound(1);
    };

    // set the min and sec on the timer to its "end position"
    const fastForwardTimer = () => {
        setTimerRunning(false);
        if (timerType === "countdown" || timerType === "xy") {
            setSelectedMinute(0);
            setSelectedSecond(0);
            if (timerType === "xy") {
                setCurrentRound(numRounds);
            };
        } else if (timerType === "stopwatch") {
            setSelectedMinute(initialMinutes);
            setSelectedSecond(initialSeconds);
        }
    };

    const handleMinuteChange = (e) => {
        const newMin = parseInt(e.target.value);
        setSelectedMinute(newMin);
    };

    const handleSecondChange = (e) => {
        const newSec = parseInt(e.target.value);
        setSelectedSecond(newSec);
    };

    const handleRoundSelect = (e) => {
        const newRoundNum = parseInt(e.target.value);
        if (newRoundNum < currentRound) {
            setCurrentRound(newRoundNum);
        }
        setNumRounds(newRoundNum);
    };

    useEffect(() => {
        let intervalId;

        const runCountdownTimer = () => {
            intervalId = setInterval(() => {
                if (selectedSecond > 0) {
                    setSelectedSecond(selectedSecond - 1);
                } else if (selectedMinute > 0) {
                    setSelectedMinute(selectedMinute - 1);
                    setSelectedSecond(59);
                } else {
                    setTimerRunning(false);
                    clearInterval(intervalId);
                }
            }, 1000);
        };

        const runXyTimer = () => {
            if (currentRound < numRounds) {
                if (selectedMinute === 0 && selectedSecond === 1) {
                    intervalId = setInterval(() => {
                        setCurrentRound(currentRound + 1);
                        setSelectedMinute(initialMinutes);
                        setSelectedSecond(initialSeconds);
                    }, 1000);

                    return () => {
                        clearInterval(intervalId)
                    }
                }
            };

            intervalId = setInterval(() => {
                if (selectedSecond >= 1) {
                    setSelectedSecond(selectedSecond - 1);
                } else if (selectedMinute > 0) {
                    setSelectedMinute(selectedMinute - 1);
                    setSelectedSecond(59);
                } else {
                    setTimerRunning(false);
                    clearInterval(intervalId);
                }
            }, 1000);
        };

        const runCountUpTimer = () => {
            intervalId = setInterval(() => {
                if (selectedSecond < 59) {
                    setSelectedSecond(selectedSecond + 1);
                } else if (selectedMinute < initialMinutes) {
                    setSelectedMinute(selectedMinute + 1);
                    setSelectedSecond(0);
                } else {
                    setTimerRunning(false);
                    clearInterval(intervalId);
                }
            }, 1000);
        };

        if (timerType === "countdown") {
            if (timerRunning && (selectedMinute > 0 || selectedSecond > 0)) {
                runCountdownTimer();
            } else {
                setTimerRunning(false);
                clearInterval(intervalId);
            }

            return () => {
                clearInterval(intervalId);
            };
        } else if (timerType === "stopwatch") {
            if (timerRunning && (selectedMinute < initialMinutes || selectedSecond < initialSeconds)) {
                runCountUpTimer();
            } else {
                setTimerRunning(false);
                clearInterval(intervalId);
            }

            return () => {
                clearInterval(intervalId);
            };
        } else if (timerType === "xy") {
            if (timerRunning) {
                runXyTimer();
            } else {
                setTimerRunning(false);
                clearInterval(intervalId);
            }

            return () => {
                clearInterval(intervalId);
            };
        };

    }, [timerRunning, selectedMinute, selectedSecond, numRounds, currentRound, initialMinutes, initialSeconds, timerType]);

    return {
        timerRunning: timerRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        fastForwardTimer,
        selectedMinute: selectedMinute,
        handleMinuteChange,
        selectedSecond: selectedSecond,
        handleSecondChange,
        currentRound: currentRound,
        handleRoundSelect,
        numRounds: numRounds
    };
};
