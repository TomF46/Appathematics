import PropTypes from 'prop-types';
import NumberInput from './NumberInput';
import { useState } from 'react';

function MultiNumberInput({ numbers, label, onNumberAdded, onNumberRemoved }) {
  const [number, setNumber] = useState(null);

  function onChange(event) {
    const { value } = event.target;
    setNumber(value);
  }

  return (
    <div>
      <p className='text-primary'>{label}: &#40;Click number to remove&#41;</p>
      <div className='grid grid-cols-12'>
        <div className='col-span-10'>
          <NumberInput name='number' label='' onChange={onChange} value={number} />
        </div>
        <div className='col-span-2 flex flex-col items-center justify-center px-1'>
          <button
            type='button'
            onClick={() => {
              onNumberAdded(number);
            }}
            className='w-full py-1 bg-primary align-bottom rounded-full text-2xl text-white text-center'
          >
            Add
          </button>
        </div>
      </div>
      <div className='grid grid-cols-12'>
        {numbers.map((number, i) => (
          <div className='col-span-1 mr-2 my-1' key={i}>
            <button
              type='button'
              onClick={() => {
                onNumberRemoved(number);
              }}
              className='bg-primary w-full rounded-full text-lg text-white text-center'
            >
              {number}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

MultiNumberInput.propTypes = {
  numbers: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onNumberAdded: PropTypes.func.isRequired,
  onNumberRemoved: PropTypes.func.isRequired,
};

export default MultiNumberInput;
