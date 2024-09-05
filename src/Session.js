const Session = ({ sessionLength, handleClick }) => {
    return (
        <div id='session'>
            <span id="session-label">Session Length</span>
            <div className="btn-container">
                <button
                    id="session-increment"
                    onClick={(e) => handleClick(e)}>
                    <i className='session-increment fa-solid fa-arrow-up'></i>
                </button>
                <span id='session-length'>{sessionLength}</span>
                <button
                    id="session-decrement"
                    onClick={(e) => handleClick(e)}>
                    <i className='session-decrement fa-solid fa-arrow-down'></i>
                </button>
            </div>
        </div>
    )
}

export default Session
