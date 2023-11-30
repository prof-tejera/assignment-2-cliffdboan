import Button from "../generic/Button";
import SetTimes from "../generic/SetTimes";
import { useRunTimers } from "../../utils/useRunTimers.js";
import { useContext, useId } from "react";
import { TimerContext } from "../../utils/timerProvider";
import { useLocation } from "react-router-dom";

const Stopwatch = ({ initialMinutes, initialSeconds }) => {

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
        selectedSecond,
    } = useRunTimers({
        timerType: "stopwatch",
        initialMinutes,
        initialSeconds
    });

    return (
        <div id={uniqueId} className="stopwatch">
            <div className="clockface">
                <span style={{ color: !timerRunning ? 'red' : 'green' }}>
                    {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}:{selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond}
                </span>
            </div>
            <div id="button-grid">
                <Button id="sw-start" value="Start" onClick={startTimer} />
                <Button id="sw-pause" value="Pause" onClick={pauseTimer} />
                <Button id="sw-reset" value="Reset" onClick={resetTimer} />
                <Button id="sw-ff" value="FF" onClick={fastForwardTimer} />
            </div>
            <div id="set-times" style={{ display: loadIfAdd ? '' : 'none' }}>
                <SetTimes
                    minId={uniqueId + "-sw-min"}
                    secId={uniqueId + "-sw-sec"}
                />
            </div>
            <div style={{display: loadIfAdd ? '' : 'none'}}>
                <Button
                    id={"addTimerBtn"}
                    value={"Add Timer"}
                    onClick={() => {
                        // get the value from the select box,
                        // then set the initial values of the timers 'end state'
                        let min = parseInt(document.getElementById(uniqueId + "-sw-min").value);
                        let sec = parseInt(document.getElementById(uniqueId + "-sw-sec").value);
                        addTimer(<Stopwatch initialMinutes={min} initialSeconds={sec} />, "Stopwatch")
                    }} />
            </div>
        </div>
    );
};

export default Stopwatch;
