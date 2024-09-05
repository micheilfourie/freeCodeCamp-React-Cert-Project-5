import './App.css';
import Break from './Break.js';
import Session from './Session.js';
import Timer from './Timer.js';
import { useState, useEffect } from 'react';

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState("Session");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);

  useEffect(() => {
    let intervalId;
    if (running) {
      if (seconds === 0) {
        setRunning(false);
        handleAudio(true);
        setTimeout(() => {
          handleAudio(false);
          setRunning(true);
          setTimerType(timerType === "Session" ? "Break" : "Session");
          setSeconds(timerType === "Session" ? breakLength * 60 : sessionLength * 60);
        }, 10000)
      }
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [running, seconds, timerType, breakLength, sessionLength]);

  const handleAudio = (toggle) => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    if (toggle) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleClick = (e) => {
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
    } else if (e.target.id === 'break-decrement' || classLst.includes('break-decrement')) {
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
    handleAudio(false);
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
      <h1>25 + 5 Clock</h1>
      <Timer
        timerType={timerType}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
        formatTime={formatTime}
        seconds={seconds}
        running={running}
      />
      <div id="controls">
        <Break
          breakLength={breakLength}
          handleClick={handleClick}
        />
        <Session
          sessionLength={sessionLength}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
