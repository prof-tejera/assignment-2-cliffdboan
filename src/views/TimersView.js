import React from "react";
import styled from "styled-components";
import './timersView.css'

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Timer = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 360px;
  border: 2.5px solid #696969;
  box-shadow: 3px 2px 11px 5px rgba(0,0,0,0.15);
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
`;

const TimerTitle = styled.div`
  font-size: 28px;
  font-weight: bolder;
  text-decoration: underline solid black;
`;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
  ];

  return (
    <Timers>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.title}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.C}
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
