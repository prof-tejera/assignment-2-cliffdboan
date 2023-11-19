import { useState, createContext, useContext } from "react";

export const TimerContext = createContext({});

export const useTimerContext = () => {
};

export const TimerProvider = ({ children }) => {
    const [timerQueue, setTimerQueue] = useState([]);

    return (
        <TimerContext.Provider
            value={{ }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerProvider;
