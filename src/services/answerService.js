import Methods from "./methods.enum";

class AnswersService {
  constructor() {}

  checkIfCorrect(userAnswer, firstNumber, secondNumber, method) {
    if (method == Methods.Division)
      return this.checkDivision(userAnswer, firstNumber, secondNumber);
    if (method == Methods.Addition)
      return this.checkAddition(userAnswer, firstNumber, secondNumber);
    if (method == Methods.Subtraction)
      return this.checkSubtraction(userAnswer, firstNumber, secondNumber);
    if (method == Methods.Power)
      return this.checkPower(userAnswer, firstNumber, secondNumber);
    if (method == Methods.Root)
      return this.checkRoot(userAnswer, firstNumber, secondNumber);
    return this.checkMultiplication(userAnswer, firstNumber, secondNumber);
  }

  checkDivision(userAnswer, firstNumber, secondNumber) {
    const answer = firstNumber / secondNumber;
    return userAnswer == answer;
  }

  checkMultiplication(userAnswer, firstNumber, secondNumber) {
    const answer = firstNumber * secondNumber;
    return userAnswer == answer;
  }

  checkAddition(userAnswer, firstNumber, secondNumber) {
    const answer = Number(firstNumber) + Number(secondNumber);
    return userAnswer == answer;
  }

  checkSubtraction(userAnswer, firstNumber, secondNumber) {
    const answer = firstNumber - secondNumber;
    return userAnswer == answer;
  }

  checkPower(userAnswer, firstNumber, secondNumber) {
    const answer = Math.pow(firstNumber, secondNumber);
    return userAnswer == answer;
  }

  checkRoot(userAnswer, firstNumber, secondNumber) {
    const answer = Math.pow(firstNumber, 1/secondNumber);
    return userAnswer == Math.round(answer);
  }
}

export default AnswersService;
