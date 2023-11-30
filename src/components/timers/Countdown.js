import Button from "../generic/Button.js"
import SetTimes from "../generic/SetTimes.js";
import { useRunTimers } from "../../utils/useRunTimers.js";
import { useContext, useId } from "react";
import { TimerContext } from "../../utils/timerProvider.js";
import { useLocation } from "react-router-dom";

const Countdown = ({ initialSeconds, initialMinutes }) => {
    // get the location and check if the user is on the add timer page
    const location = useLocation();
    const loadIfAdd = location.pathname.includes("add");

    // generate a unique id
    const uniqueId = useId();

    const { addTimer } = useContext(TimerContext);

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
        initialSeconds,
        initialMinutes
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
            <div id="set-times" style={{ display: loadIfAdd ? '' : 'none' }}>
                <SetTimes
                    onChangeMin={handleMinuteChange}
                    onChangeSec={handleSecondChange}
                />
            </div>
            <div style={{ display: loadIfAdd ? '' : 'none' }}>
                <Button
                    id={"addTimerBtn"}
                    value={"Add Timer"}
                    onClick={() => {
                        addTimer(<Countdown initialMinutes={selectedMinute} initialSeconds={selectedSecond}/>, "Countdown")} }/>
            </div>
        </div>
    )
};

export default Countdown;
