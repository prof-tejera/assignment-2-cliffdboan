import { useState, useEffect } from "react";

export function useRunTimers({ timerType, minuteId, secondId }) {
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSecond, setSelectedSecond] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [numRounds, setNumRounds] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    // set the minute and second values to the values set by the select menus
    const minSecValues = () => {
        setSelectedMinute(parseInt(document.getElementById(minuteId).value));
        setSelectedSecond(parseInt(document.getElementById(secondId).value));
    };

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
            minSecValues();
        } else if (timerType === "countup") {
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
        } else if (timerType === "countup") {
            minSecValues();
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
        const minCeiling = parseInt(document.getElementById(minuteId).value);
        const secCeiling = parseInt(document.getElementById(secondId).value);

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
                        minSecValues();
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
                } else if (selectedMinute < minCeiling) {
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
        } else if (timerType === "countup") {
            if (timerRunning && (selectedMinute < minCeiling || selectedSecond < secCeiling)) {
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

    }, [timerRunning, selectedMinute, selectedSecond, numRounds, currentRound, minuteId, secondId, timerType]);

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
