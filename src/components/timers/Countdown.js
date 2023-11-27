import Button from "../generic/Button.js"
import SetTimes from "../generic/SetTimes.js";
import { useRunTimers } from "../../utils/mainHook.js";
import { useId } from "react";


const Countdown = () => {
    // generate a unique id
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
        handleSecondChange
    } = useRunTimers({
        timerType: "countdown",
        minuteId: `${uniqueId}-cd-min`,
        secondId: `${uniqueId}-cd-sec`,
    });

    // return the countdown timer. if the timer is running, the numbers are green,
    // otherwise, they stay red while not running.
    return (
        <div id={uniqueId} className="countdown">
            <div className="clockface">
                <span style={{ color: timerRunning ? 'green' : 'red' }}>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
                    :{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
            </div>
            <div id="button-grid">
                <Button id="cd-start" value="Start" onClick={startTimer} />
                <Button id="cd-pause" value="Pause" onClick={pauseTimer} />
                <Button id="cd-reset" value="Reset" onClick={resetTimer} />
                <Button id="cd-ff" value="FF" onClick={fastForwardTimer} />
            </div>
            <div id="set-times">
                <SetTimes
                    minId={uniqueId + "-cd-min"}
                    onChangeMin={handleMinuteChange}
                    secId={uniqueId + "-cd-sec"}
                    onChangeSec={handleSecondChange}
                />
            </div>
        </div>
    )
};

export default Countdown;
