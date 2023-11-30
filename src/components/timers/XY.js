import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";
import { useRunTimers } from "../../utils/useRunTimers.js";
import { useContext, useId } from "react";
import { TimerContext } from "../../utils/timerProvider";
import { useLocation } from "react-router-dom";

const XY = ({ initialMinutes, initialSeconds, initialNumRounds, initialRound }) => {

    const location = useLocation();
    const loadIfAdd = location.pathname.includes("add");

    const { addTimer } = useContext(TimerContext);
    const uniqueId = useId();
    /**
     * extract the returned functions and stated values from the custom hook this way
     * the functions can be called within the onClick prop and the state values can be
     * called in the clockface div
     *
     * also, identify the type of timer and the ids within the timers to
     * properly set the values in the custom hook
     * */
    const {
        timerRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        fastForwardTimer,
        selectedMinute,
        handleMinuteChange,
        selectedSecond,
        handleSecondChange,
        currentRound,
        handleRoundSelect,
        numRounds
    } = useRunTimers({
        timerType: "xy",
        initialMinutes,
        initialSeconds,
        initialNumRounds,
        initialRound
    });

    return (
        <div id={uniqueId} className="countdown">
            <div className="clockface">
                <span style={{ color: !timerRunning ? 'red' : 'green' }}>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
                    :{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
                <br />
                <span>
                    Round: {currentRound} of {numRounds}
                </span>
            </div>
            <div id="button-grid">
                <Button id="xy-start" value="Start" onClick={startTimer} />
                <Button id="xy-pause" value="Pause" onClick={pauseTimer} />
                <Button id="xy-reset" value="Reset" onClick={resetTimer} />
                <Button id="xy-ff" value="FF" onClick={fastForwardTimer} />
            </div>
            <div id="set-times" style={{ display: loadIfAdd ? '' : 'none' }}>
                <SetTimes
                onChangeMin={handleMinuteChange}
                onChangeSec={handleSecondChange}
                />
            </div>
            <div style={{ display: loadIfAdd ? '' : 'none' }}>
                <label htmlFor="rnds"># Rounds: </label>
                <select name="rnds" id={uniqueId + "-xy-rnds"} onChange={handleRoundSelect}>
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
            <div style={{ display: loadIfAdd ? '' : 'none' }}>
                <Button
                    id={"addTimerBtn"}
                    value={"Add Timer"}
                    onClick={() => {
                        addTimer(<XY
                             initialMinutes={selectedMinute}
                             initialSeconds={selectedSecond}
                             initialNumRounds={numRounds}
                             initialRound={currentRound}
                             />, "XY")
                    }} />
            </div>
        </div>
    )
};

export default XY;
