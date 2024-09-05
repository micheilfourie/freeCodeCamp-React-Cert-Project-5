const Break = ({ breakLength, handleClick }) => {
    return (
        <div id="break">
            <span id="break-label">Break Length</span>
            <div className="btn-container">
                <button
                    id="break-increment"
                    onClick={(e) => handleClick(e)}>
                    <i className='break-increment fa-solid fa-arrow-up'></i>
                </button>
                <span id='break-length' >{breakLength}</span>
                <button
                    id="break-decrement"
                    onClick={(e) => handleClick(e)}>
                    <i className='break-decrement fa-solid fa-arrow-down'></i>
                </button>
            </div>
        </div>
    )
}

export default Break
