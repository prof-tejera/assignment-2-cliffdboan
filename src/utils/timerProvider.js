import React, { useEffect } from "react";
import { useState } from "react";
import { makeId } from "./helpers"
// import { useRunTimers } from "./useRunTimers";

export const TimerContext = React.createContext({});

export const TimerProvider = ({ children }) => {
    const [timerQueue, setTimerQueue] = useState([]);
    // const [runQueue, setRunQueue] = useState(false);
    // const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

    // const {
    //     timerRunning,
    //     startTimer,
    //     pauseTimer,
    //     resetTimer,
    //     fastForwardTimer,
    // } = useRunTimers({});


    // add a new timer to the queue with its title
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

    // remove the last timer from the queue
    const removeTimer = () => {
        setTimerQueue((prevQueue) => prevQueue.slice(0, -1));
    };

    // // begin running the timers
    // const runTimerQueue = () => {
    //     if (!runQueue) { setRunQueue(true) }
    //     console.log("hey");
    // };

    // // pause the timers in the queue
    // const pauseTimerQueue = () => {
    //     setRunQueue(false);
    //     console.log("bye");
    // };

    // useEffect(() => {
    //     if (runQueue) {
    //         if (currentTimerIndex < timerQueue.length) {
    //             console.log("running");
    //             setCurrentTimerIndex((prevIndex) => prevIndex + 1);
    //         } else {
    //             setRunQueue(false);
    //             setCurrentTimerIndex(0);
    //         }
    //     }
    // }
    //     , [runQueue, currentTimerIndex]);

    return (
        <TimerContext.Provider
            value={{
                addTimer,
                removeTimer,
                timerQueue,
                // runTimerQueue,
                // pauseTimerQueue,
                // startTimer,
                // pauseTimer,
                // resetTimer,
                // fastForwardTimer,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerProvider;
