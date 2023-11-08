import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";
import { useRunTimers } from "../../utils/mainHook.js";

const XY = () => {
    /**
     * extract the returned functions and stated values from the custom hook this way
     * the functions can be called within the onClick prop and the state values can be
     * called in the clockface div
     *
     * also, identify the type of timer and the ids within the timers to
     * properly set the values in the custom hook
     * */
    const {
        startTimer,
        pauseTimer,
        resetTimer,
        selectedMinute,
        selectedSecond,
        currentRound
         } = useRunTimers("xy", "xy-min", "xy-sec", "xy-start", "xy-pause", "xy-rnds");

    return (
        <div className="countdown">
            <div id="clockface">
                <span>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
                    :{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
                <br />
                <span>
                    Round: {currentRound}
                </span>
            </div>
            <div id="button-grid">
                <Button id="xy-start" value="Start" onClick={startTimer} />
                <Button id="xy-pause" value="Pause" onClick={pauseTimer} />
                <Button id="xy-reset" value="Reset" onClick={resetTimer} />
            </div>
            <div id="set-times">
                <SetTimes minId="xy-min" secId="xy-sec" />
            </div>
            <div>
                <label htmlFor="rnds"># Rounds: </label>
                <select name="rnds" id="xy-rnds">
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
