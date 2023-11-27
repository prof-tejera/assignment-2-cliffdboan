import React from "react";
import styled from "styled-components";
import { useTimerContext } from "../utils/timerProvider";

const TimersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;


const TimersView = () => {
    const { timerQueue, removeTimer } = useTimerContext();

    return (
        <TimersContainer>
            <h2>Timer Queue</h2>
            <div>
                {timerQueue.map((timer) => (
                    <div key={timer.id}>
                        {timer.title}
                        {timer.C}
                    </div>

                ))}
            </div>
            <button onClick={removeTimer}>Remove Last Timer</button>
        </TimersContainer>
    );
};

export default TimersView
