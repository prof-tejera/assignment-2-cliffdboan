import React from "react";
import { useState, useContext } from "react";
import { makeId } from "./helpers"

export const TimerContext = React.createContext({});

export const useTimerContext = () => {
    return useContext(TimerContext);
};

export const TimerProvider = ({ children }) => {
    const [timerQueue, setTimerQueue] = useState([]);

    const addTimer = (timerComponent, title, minVal, secVal) => {
        setTimerQueue((prevQueue) => [
            ...prevQueue,
            {
                id: makeId(),
                C: timerComponent,
                title: title,
                min: minVal,
                sec: secVal
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
                timerQueue
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerProvider;
