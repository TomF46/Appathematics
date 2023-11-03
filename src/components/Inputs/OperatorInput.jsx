import PropTypes from 'prop-types';
import NumberInput from './NumberInput';
import { useState, useEffect } from 'react';
import {
  handleAdditionChanceChange,
  handleDivisionChanceChange,
  handleMultiplicationChanceChange,
  handlePowerChanceChange,
  handleRootChanceChange,
  handleSubtractionChanceChange,
} from '../../services/customSetsService';
import MultiplyIcon from '../../assets/multiply.svg';
import DivideIcon from '../../assets/divide.svg';
import PlusIcon from '../../assets/plus.svg';
import SubtractIcon from '../../assets/subtract.svg';
import PowerIcon from '../../assets/power.svg';
import RootIcon from '../../assets/root.svg';
function OperatorInput({ set, onOperatorsChanged }) {
  const [operands, setOperarands] = useState(null);

  useEffect(() => {
    setOperarands(formatOperators());
  }, [set]);

  function formatOperators() {
    return {
      multiplication: {
        chance: Math.round(set.operands.multiplication.chance * 100),
      },
      division: {
        chance: Math.round(set.operands.division.chance * 100),
      },
      addition: {
        chance: Math.round(set.operands.addition.chance * 100),
      },
      subtraction: {
        chance: Math.round(set.operands.subtraction.chance * 100),
      },
      power: {
        chance: Math.round(set.operands.power.chance * 100),
      },
      root: {
        chance: Math.round(set.operands.root.chance * 100),
      },
    };
  }

  return (
    <div>
      <h2 className='text-xl text-primary'>Operators:</h2>
      {operands && (
        <div className='grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={MultiplyIcon} className='mx-auto w-20 mb-2' alt='Multiply icon' />
            <NumberInput
              name='multiplicationChance'
              label='Multiplication chance(%)'
              value={operands.multiplication.chance}
              onChange={(event) => {
                onOperatorsChanged(handleMultiplicationChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={DivideIcon} className='mx-auto w-20 mb-2' alt='Divide icon' />
            <NumberInput
              name='divisionChance'
              label='Division chance(%)'
              value={operands.division.chance}
              onChange={(event) => {
                onOperatorsChanged(handleDivisionChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={PlusIcon} className='mx-auto w-20 mb-2' alt='Plus icon' />
            <NumberInput
              name='additionChance'
              label='Addition chance(%)'
              value={operands.addition.chance}
              onChange={(event) => {
                onOperatorsChanged(handleAdditionChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={SubtractIcon} className='mx-auto w-20 mb-2' alt='Subtract icon' />
            <NumberInput
              name='subtractionChance'
              label='Subtraction chance(%)'
              value={operands.subtraction.chance}
              onChange={(event) => {
                onOperatorsChanged(handleSubtractionChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={PowerIcon} className='mx-auto w-20 mb-2' alt='Power icon' />
            <NumberInput
              name='powerChance'
              label='Power chance(%)'
              value={operands.power.chance}
              onChange={(event) => {
                onOperatorsChanged(handlePowerChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
          <div className='col-span-12 md:col-span-2 px-4 mb-2'>
            <img src={RootIcon} className='mx-auto w-20 mb-2' alt='Root icon' />
            <NumberInput
              name='rootChance'
              label='Root chance(%)'
              value={operands.root.chance}
              onChange={(event) => {
                onOperatorsChanged(handleRootChanceChange(event, set));
              }}
              required
              max={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}

OperatorInput.propTypes = {
  set: PropTypes.object.isRequired,
  onOperatorsChanged: PropTypes.func.isRequired,
};

export default OperatorInput;
