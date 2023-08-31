import PropTypes from "prop-types";

function VirtualKeyboard({onKeyClicked}) {
  return (
    <div className="virtual-keyboard mx-auto flex-col">
        <div className="grid grid-cols-12 text-white text-lg">
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(1)}}>1</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(2)}}>2</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(3)}}>3</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(4)}}>4</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(5)}}>5</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(6)}}>6</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(7)}}>7</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(8)}}>8</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(9)}}>9</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75 " onClick={() => {onKeyClicked("back")}}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                    </svg>
                </span>
                </button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-primary keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked(0)}}>0</button>
            </div>
            <div className="col-span-4 p-1">
                <button className="p-4 mx-auto shadow bg-enter keyBtn flex items-center justify-center text-xl rounded hover:opacity-75" onClick={() => {onKeyClicked("enter")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div >
  );
}

VirtualKeyboard.propTypes = {
  onKeyClicked: PropTypes.func.isRequired,
};

export default VirtualKeyboard;
