import React from "react";
import { useState, useContext, useEffect, useId } from "react";
import { makeId } from "./helpers"
// import { useRunTimers } from "./mainHook";

export const TimerContext = React.createContext({});

export const TimerProvider = ({ children }) => {
    const [timerQueue, setTimerQueue] = useState([]);

    const addTimer = (timerComponent, title) => {
        const newTimerId = makeId();

        setTimerQueue((prevQueue) => [
            ...prevQueue,
            {
                id: newTimerId,
                C: timerComponent,
                title: title,
            }
        ]);
    };

    const removeTimer = () => {
        setTimerQueue((prevQueue) => prevQueue.slice(0, -1));
    };

    return (
        <TimerContext.Provider
            value={{
                addTimer,
                removeTimer,
                timerQueue,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerProvider;
