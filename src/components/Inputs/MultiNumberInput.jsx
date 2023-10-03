import PropTypes from "prop-types";
import NumberInput from "./NumberInput";
import { useState } from "react";

function MultiNumberInput({numbers, label, onNumberAdded}) {
    const [number, setNumber] = useState(null);

    function onChange(event){
        const { value } = event.target;
        setNumber(value);
    }


  return (
    <div>
        <p>{label}: {numbers.map((number, i) => <span key={i}>
            {i > 0 && ", "} {number}
        </span>)}
        </p>
        <div className="grid grid-cols-12">
            <div className="col-span-10">
                <NumberInput
                    name="number"
                    label="Number"
                    onChange={onChange}
                    value={number}
                />
            </div>
            <div className="col-span-2">
                <button type="button" onClick={() => {onNumberAdded(number)}} className="px-8 py-2 bg-primary rounded-full text-2xl text-white text-center">Add</button>
            </div>
        </div>
    </div>
  );
}

MultiNumberInput.propTypes = {
  numbers: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onNumberAdded: PropTypes.func.isRequired
};

export default MultiNumberInput;
