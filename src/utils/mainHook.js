import { useState, useEffect } from "react";

export function useRunTimers(timerType, minuteId, secondId, startId, pauseId, roundId) {
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSecond, setSelectedSecond] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [numRounds, setNumRounds] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    const startTimer = () => {
        if (!timerRunning) setTimerRunning(true);
    };

    const pauseTimer = () => {
        if (timerRunning) setTimerRunning(false);
    };

    const resetTimer = () => {
        if (timerRunning) {
            setTimerRunning(false);
        };
        if (timerType === "countdown" || timerType === "xy") {
            setSelectedMinute(parseInt(document.getElementById(minuteId).value));
            setSelectedSecond(parseInt(document.getElementById(secondId).value));
        } else if (timerType === "countup") {
            setSelectedMinute(0);
            setSelectedSecond(0);
        };
        setCurrentRound(1);
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
                if (selectedMinute === 0 && selectedSecond === 0) {
                    intervalId = setInterval(() => {
                        setCurrentRound(currentRound + 1);
                        setSelectedMinute(minCeiling);
                        setSelectedSecond(secCeiling);
                    }, 1000);

                    return () => {
                        clearInterval(intervalId)
                    }
                }
            };

            intervalId = setInterval(() => {
                if (selectedSecond > 0) {
                    setSelectedSecond(selectedSecond - 1);
                } else if (selectedMinute > 0) {
                    setSelectedMinute(selectedMinute - 1);
                    setSelectedSecond(59);
                }
            }, 1000);
        };

        const runCountUpTimer = () => {
            intervalId = setInterval(() => {
                if (selectedSecond < secCeiling) {
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

    useEffect(() => {
        const setMin = document.getElementById(minuteId);
        const setSec = document.getElementById(secondId);
        const setRnds = document.getElementById(roundId);
        const startBtn = document.getElementById(startId);
        const pauseBtn = document.getElementById(pauseId);

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
            setNumRounds(newRoundNum);
        };

        if (timerType === "countdown" || timerType === "xy") {
            setMin.addEventListener("change", handleMinuteChange);
            setSec.addEventListener("change", handleSecondChange);
            if (roundId) {
                setRnds.addEventListener("change", handleRoundSelect);
            };
        };
        startBtn.addEventListener("click", startTimer);
        pauseBtn.addEventListener("click", pauseTimer);

        return () => {
            if (timerType === "countdown" || timerType === "xy") {
                setMin.removeEventListener("change", handleMinuteChange);
                setSec.removeEventListener("change", handleSecondChange);
                if (roundId) {
                    setRnds.removeEventListener("change", handleRoundSelect);
                }
            };
            startBtn.removeEventListener("click", startTimer);
            pauseBtn.removeEventListener("click", pauseTimer);
        }
    });

    return {
        startTimer,
        pauseTimer,
        resetTimer,
        selectedMinute: selectedMinute,
        selectedSecond: selectedSecond,
        currentRound: currentRound
    };
};
