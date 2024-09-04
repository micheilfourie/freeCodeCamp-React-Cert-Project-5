import './App.css';
import Break from './Break.js';
import Session from './Session.js';
import Timer from './Timer.js';
import { useState, useEffect, useRef } from 'react';

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState("Session");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(sessionLength * 60);

  useEffect(() => {
    let intervalId;
    if (running) {
      if (seconds === 0) {
        setTimerType(timerType === "Session" ? "Break" : "Session");
        setSeconds(timerType === "Session" ? breakLength * 60 : sessionLength * 60);
      }
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [running, seconds, timerType]);

  const handleStartStop = () => {
    const btn = document.getElementById("start_stop");
    running ? btn.innerHTML = "Start" : btn.innerHTML = "Stop";
    setRunning(!running);
  };

  const handleIncrement = (e) => {

    const classLst = e.target.className.split(' ');

    if (e.target.id === 'break-increment' || classLst.includes('break-increment')) {
      if (breakLength < 60) {
        setBreakLength(breakLength + 1);
        if (timerType === "Break") {
          setSeconds((breakLength + 1) * 60);
        }
      }
    } else if (e.target.id === 'session-increment' || classLst.includes('session-increment')) {
      if (sessionLength < 60) {
        setSessionLength(sessionLength + 1);
        if (timerType === "Session") {
          setSeconds((sessionLength + 1) * 60);
        }
      }
    }
  }

  const handleDecrement = (e) => {

    const classLst = e.target.className.split(' ');

    if (e.target.id === 'break-decrement' || classLst.includes('break-decrement')) {
      if (breakLength > 1) {
        setBreakLength(breakLength - 1);
        if (timerType === "Break") {
          setSeconds((breakLength - 1) * 60);
        }
      }
    } else if (e.target.id === 'session-decrement' || classLst.includes('session-decrement')) {
      if (sessionLength > 1) {
        setSessionLength(sessionLength - 1);
        if (timerType === "Session") {
          setSeconds((sessionLength - 1) * 60);
        }
      }
    }
  }

  const handleReset = () => {
    document.getElementById("start_stop").innerHTML = "Start";
    setRunning(false);
    setTimerType("Session");
    setBreakLength(5);
    setSessionLength(25)
    setSeconds(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <Timer
        timerType={timerType}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
        formatTime={formatTime}
        seconds={seconds}
      />
      <div id="controls">
        <Break
          breakLength={breakLength}
          setBreakLength={setBreakLength}
          setSeconds={setSeconds}
          timerType={timerType}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <Session
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          setSeconds={setSeconds}
          timerType={timerType}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
    </div>
  );
}

export default App;
