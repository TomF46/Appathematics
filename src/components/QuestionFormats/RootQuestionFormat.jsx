import PropTypes from 'prop-types';

const RootQuestionFormat = ({ question }) => {
  return (
    <p className='text-center text-xl text-primary'>
      {question.secondNumber > 2 && <sup>{question.secondNumber}</sup>}
      <span>&#8730;</span>
      {question.firstNumber}
    </p>
  );
};

RootQuestionFormat.propTypes = {
  question: PropTypes.object.isRequired,
};

export default RootQuestionFormat;
