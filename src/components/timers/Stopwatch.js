import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";
import { useRunTimers } from "../../utils/mainHook.js";

const Stopwatch = () => {
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
        // endTimer
    } = useRunTimers("countup", "sw-min", "sw-sec", "sw-start", "sw-pause", "sw-reset");

    return (
        <div className="stopwatch">
            <div id="clockface">
                <span>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
                    :{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
            </div>
            <div id="button-grid">
                <Button id="sw-start" value="Start" onClick={startTimer} />
                <Button id="sw-pause" value="Pause" onClick={pauseTimer} />
                <Button id="sw-reset" value="Reset" onClick={resetTimer} />
                {/* <Button id="sw-ff" value="Finish" onClick={endTimer} /> */}
            </div>
            <div id="set-times">
                <SetTimes
                    minId="sw-min"
                    secId="sw-sec"
                />
            </div>
        </div>

    );
};

export default Stopwatch;
