const Timer = ({ timerType, handleStartStop, handleReset, formatTime, seconds }) => {

    return (
        <div id='timer'>
            <span id="timer-label">{timerType}</span>
            <span id="time-left">{formatTime(seconds)}</span>
            <div className="btn-container">
                <button id="start_stop" onClick={handleStartStop}>Start</button>
                <button id="reset" onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Timer
