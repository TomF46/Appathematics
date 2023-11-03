import PropTypes from 'prop-types';

const PowerQuestionFormat = ({ question }) => {
  return (
    <p className='text-center text-xl text-primary'>
      {question.firstNumber}
      <sup>{question.secondNumber}</sup>
    </p>
  );
};

PowerQuestionFormat.propTypes = {
  question: PropTypes.object.isRequired,
};

export default PowerQuestionFormat;
