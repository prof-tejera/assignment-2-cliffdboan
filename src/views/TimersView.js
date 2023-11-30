import React, { useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../utils/timerProvider";
import Button from "../components/generic/Button";
import { useRunTimers } from "../utils/useRunTimers";

const TimersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TimersView = () => {
    const { timerQueue, removeTimer, runTimerQueue, pauseTimerQueue, startTimer } = useContext(TimerContext);


    return (
        <TimersContainer>
            <h2>Timer Queue</h2>
            {/* <div id="button-grid">
                <Button id="queue-start" value="Start" onClick={runTimerQueue} />
                <Button id="queue-pause" value="Pause" onClick={pauseTimerQueue} />
                <Button id="timer-reset" value="Reset" onClick={null} />
                <Button id="timer-ff" value="FF" onClick={null} />
            </div> */}
            <div>
                {timerQueue.map((timer) => (
                    <div key={timer.id}>
                        <b>{timer.title}</b>
                        {timer.C}
                    </div>

                ))}
            </div>
            <button onClick={removeTimer}>Remove Last Timer</button>
        </TimersContainer>
    );
};

export default TimersView
