import { useEffect, useState } from "react";
import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";


const Tabata = () => {
    const [timerRunning, setTimerRunning] = useState(false);
    const [rounds, setRounds] = useState(1);
    const [numRounds, setNumRounds] = useState(1)
    const [workTime, setWorkTime] = useState(0);
    const [restTime, setRestTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(workTime);
    const [isRestPhase, setIsRestPhase] = useState(false);

    const startTimer = () => {
        if (!timerRunning) {
            setTimerRunning(true);
        };
    };

    const pauseTimer = () => {
        if (timerRunning) {
            setTimerRunning(false);
        };
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setCurrentTime(workTime);
        setRounds(numRounds);
    };

    const fastForwardTimer = () => {
        setTimerRunning(false);
        setCurrentTime(0);
        setRounds(0);
    };

    const handleWorkSelect = (e) => {
        const newWork = (parseInt(e.target.value));
        setWorkTime(newWork);
        setCurrentTime(newWork);
        console.log("changed");
        console.log(currentTime);
    };

    const handleRestSelect = (e) => {
        setRestTime(parseInt(e.target.value));
    };

    const handleRoundSelect = (e) => {
        setRounds(parseInt(e.target.value));
        setNumRounds(parseInt(e.target.value));
    };

    useEffect(() => {
        let intervalId;

        if (timerRunning && rounds > 0) {
            intervalId = setInterval(() => {
                if (currentTime > 1) {
                    setCurrentTime(currentTime - 1);
                } else {
                    if (isRestPhase) {
                        setCurrentTime(workTime);
                        setIsRestPhase(false);
                        if (rounds > 0) {
                            setRounds((prevRounds) => {
                                const newRound = prevRounds - 1;
                                if (newRound === 0) setTimerRunning(false);
                                return newRound;
                            });
                        }
                    } else {
                        if (rounds > 0) {
                            setCurrentTime(restTime);
                            setIsRestPhase(true);
                        } else {
                            setIsRestPhase(false);
                            setCurrentTime(workTime);
                            setTimerRunning(false);
                        }
                    }
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timerRunning, rounds, currentTime, workTime, restTime, isRestPhase]);

    return (
        <div className="countdown">
            <div id="clockface">
                <span style={{ color: timerRunning ? (isRestPhase ? '#9B7EC9' : 'green') : 'red' }}>
                    {currentTime < 10 ? `0${currentTime}` : currentTime}
                </span>
                <br />
                Sets Remaining: {rounds}
            </div>
            <div id="button-grid">
                <Button id="tab-start" value="Start" onClick={startTimer} />
                <Button id="tab-pause" value="Pause" onClick={pauseTimer} />
                <Button id="tab-reset" value="Reset" onClick={resetTimer} />
                <Button id="tab-ff" value="FF" onClick={fastForwardTimer} />
            </div>
            <div id="set-times">
                <SetTimes secId="work-sec" hideMins={true} work={true} onChangeSec={handleWorkSelect} />
                <SetTimes secId="rest-sec" hideMins={true} rest={true} onChangeSec={handleRestSelect} />
                <label htmlFor="rounds"># Rounds: </label>
                <select name="rounds" id="rounds" onChange={handleRoundSelect}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    )
};

export default Tabata;
