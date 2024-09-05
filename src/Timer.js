const Timer = ({ timerType, handleStartStop, handleReset, formatTime, seconds, running }) => {
    return (
        <div id='timer'>
            <h2 id="timer-label">{timerType} Time Left</h2>
            <span id="time-left">{formatTime(seconds)}</span>
            <audio
                id="beep"
                src={require('./assets/alarm-beep.mp3')}
                type="audio/mp3">
            </audio>
            <div className="btn-container">
                <button
                    id="start_stop"
                    onClick={handleStartStop}>
                    {!running ?
                        <i className="fa-solid fa-play"></i> :
                        <i className="fa-solid fa-pause"></i>}
                </button>
                <button
                    id="reset"
                    onClick={handleReset}>
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Timer
