import React, { useContext } from "react";
import styled from "styled-components";
import './addPage.css'
import Button from "../components/generic/Button";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import { TimerContext } from "../utils/timerProvider";

const Timers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TimerContainer = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  height: 310px;
  width: 310px;
  border-radius: 360px;
  border: 2.5px solid #696969;
  box-shadow: 3px 2px 11px 5px rgba(0,0,0,0.15);
  padding: 10px;
  margin: 5px;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
`;

const TimerTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  text-decoration: underline solid black;
`;

const AddPage = () => {
  const { addTimer } = useContext(TimerContext);

  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
  ];

  return (
      <Timers>
        {timers.map((timer) => (
          <>
            <TimerContainer key={`timer-${timer.title}`}>
              <Timer>
                <TimerTitle>{timer.title}</TimerTitle>
                {timer.C}
              </Timer>
              <Button
                id={"addTimerBtn"}
                value={"Add Timer"}
                onClick={() => addTimer(timer.C, timer.title)} />
            </TimerContainer>
          </>
        ))}
      </Timers>
  );
};

export default AddPage;
