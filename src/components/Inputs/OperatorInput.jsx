import PropTypes from 'prop-types';
import NumberInput from './NumberInput';
import { useState, useEffect, useCallback } from 'react';
import {
  handleAdditionChanceChange,
  handleDivisionChanceChange,
  handleMultiplicationChanceChange,
  handlePowerChanceChange,
  handleRootChanceChange,
  handleSubtractionChanceChange,
  isLegacySet,
} from '../../services/customSetsService';
import MultiplyIcon from '../../assets/multiply.svg';
import DivideIcon from '../../assets/divide.svg';
import PlusIcon from '../../assets/plus.svg';
import SubtractIcon from '../../assets/subtract.svg';
import PowerIcon from '../../assets/power.svg';
import RootIcon from '../../assets/root.svg';
function OperatorInput({ set, onOperatorsChanged }) {
  const [operands, setOperarands] = useState(null);

  const formatOperators = useCallback(() => {
    let isLegacy = isLegacySet(set.operands);
    return {
      multiplication: {
        chance: formatChance(set.operands.multiplication.chance, isLegacy),
      },
      division: {
        chance: formatChance(set.operands.division.chance, isLegacy),
      },
      addition: {
        chance: formatChance(set.operands.addition.chance, isLegacy),
      },
      subtraction: {
        chance: formatChance(set.operands.subtraction.chance, isLegacy),
      },
      power: {
        chance: formatChance(set.operands.power.chance, isLegacy),
      },
      root: {
        chance: formatChance(set.operands.root.chance, isLegacy),
      },
    };
  }, [set]);

  function formatChance(chance, isLegacy) {
    return isLegacy ? Math.round(chance * 100) : chance;
  }

  useEffect(() => {
    setOperarands(formatOperators());
  }, [set, formatOperators]);

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
