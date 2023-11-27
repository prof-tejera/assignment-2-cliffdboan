import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";
import { useRunTimers } from "../../utils/mainHook.js";
import { useId } from "react";

const XY = () => {
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
        minuteId: `${uniqueId}-xy-min`,
        secondId: `${uniqueId}-xy-sec`,
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
            <div id="set-times">
                <SetTimes
                minId={uniqueId + "-xy-min"}
                onChangeMin={handleMinuteChange}
                secId={uniqueId + "-xy-sec"}
                onChangeSec={handleSecondChange}
                />
            </div>
            <div>
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
        </div>
    )
};

export default XY;
