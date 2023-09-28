import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, placeholder, value, required}) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-1 font-bold text-xs text-primary text-center"
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            <div className="control">
                <input
                    type="text"
                    name={name}
                    className="border border-gray-500 focus:outline-none focus:border-primary p-2 w-full rounded text-center"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool.isRequired
};

export default TextInput;
