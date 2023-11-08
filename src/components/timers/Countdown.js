import Button from "../generic/Button.js"
import SetTimes from "../generic/SetTimes.js";
import { useRunTimers } from "../../utils/mainHook.js";

const Countdown = () => {
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
        selectedSecond } = useRunTimers("countdown", "cd-min", "cd-sec", "cd-start", "cd-pause");

    return (
        <div className="countdown">
            <div id="clockface">
                <span>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
                    :{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
            </div>
            <div id="button-grid">
                <Button id="cd-start" value="Start" onClick={startTimer} />
                <Button id="cd-pause" value="Pause" onClick={pauseTimer} />
                <Button id="cd-reset" value="Reset" onClick={resetTimer} />
            </div>
            <div id="set-times">
                <SetTimes minId="cd-min" secId="cd-sec" />
            </div>
        </div>
    )
};

export default Countdown;
