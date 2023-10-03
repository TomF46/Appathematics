import PropTypes from "prop-types";

const NumberInput = ({ name, label, onChange, placeholder, value}) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-1 font-bold text-xs text-primary"
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            <div className="control">
                <input
                    type="number"
                    name={name}
                    className="border border-gray-500 focus:outline-none focus:border-primary p-2 w-full bg-backgroundOffset2 rounded"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
};

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.number
};

export default NumberInput;
