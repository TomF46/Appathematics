import PropTypes from "prop-types";

function VirtualKeyboard({onKeyClicked}) {
  return (
    <div className="virtual-keyboard mx-auto">
        <div className="grid grid-cols-12">
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(1)}}>1</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(2)}}>2</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(3)}}>3</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(4)}}>4</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(5)}}>5</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(6)}}>6</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(7)}}>7</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(8)}}>8</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(9)}}>9</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked("back")}}>Back</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked(0)}}>0</button>
            </div>
            <div className="col-span-4 justify-self-center">
                <button className="m-2 p-8 bg-primary keyBtn flex items-center justify-center" onClick={() => {onKeyClicked("enter")}}>Enter</button>
            </div>
        </div>
    </div >
  );
}

VirtualKeyboard.propTypes = {
  onKeyClicked: PropTypes.func.isRequired,
};

export default VirtualKeyboard;
