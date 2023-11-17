import Methods from './methods.enum';

class QuestionsService {
  constructor() {
    this.numberOfQuestions = null;
    this.primaryUnits = null;
    this.secondaryUnits = null;
    this.operands = {};
    this.isCustomSet = false;
  }

  generateQuestions(set) {
    this.primaryUnits = set.primaryNumbers;
    this.secondaryUnits = set.secondaryNumbers;
    this.numberOfQuestions = set.numberOfQuestions;
    this.operands = set.operands;
    this.isCustomSet = set.customSet;

    return this.generateSet();
  }

  generateSet() {
    let questions = [];
    for (let i = 0; i < this.numberOfQuestions; i++) {
      const question = this.generateQuestion(this.primaryUnits, this.secondaryUnits, this.operands);
      questions.push(question);
    }

    if (this.isCustomSet) {
      return questions;
    } else {
      return this.ensureNoDuplicates(questions);
    }
  }

  generateQuestion(primaryUnits, secondaryUnits, operands) {
    const method = this.getMethod(operands);

    let question = {
      firstNumber: this.getRandomValue(primaryUnits),
      secondNumber: this.getRandomValue(secondaryUnits),
      method: method,
    };

    if (question.method == Methods.Division) {
      question = this.formatDivision(question);
      return question;
    }

    if (question.method == Methods.Root) {
      question = this.formatRoot(question);
      return question;
    }

    // Never flip subtraction/ root or power units
    if (
      question.method == Methods.Subtraction ||
      question.method == Methods.Power ||
      question.method == Methods.Root
    )
      return question;

    //50% chance of flipping factors
    if (this.shouldRandomise())
      return this.flipFactors(question.firstNumber, question.secondNumber, method);
    return question;
  }

  getMethod(operands) {
    const methods = [
      operands.multiplication,
      operands.division,
      operands.addition,
      operands.subtraction,
      operands.power,
      operands.root,
    ];

    const method = this.getMethodUsingOdds(methods);
    if (method == operands.multiplication) return Methods.Multiplication;
    if (method == operands.addition) return Methods.Addition;
    if (method == operands.subtraction) return Methods.Subtraction;
    if (method == operands.power) return Methods.Power;
    if (method == operands.root) return Methods.Root;

    return Methods.Division;
  }

  getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  formatDivision(question) {
    const firstValue = question.firstNumber * question.secondNumber;
    question.firstNumber = firstValue;
    return question;
  }

  formatRoot(question) {
    const firstValue = Math.pow(question.firstNumber, question.secondNumber);
    question.firstNumber = firstValue;
    return question;
  }

  ensureNoDuplicates(questions) {
    let requiresCheck = true;

    while (requiresCheck) {
      let duplicateCount = 0;

      questions.forEach((question, index) => {
        const matching = questions.filter(
          (comparand) =>
            question.firstNumber == comparand.firstNumber &&
            question.secondNumber == comparand.secondNumber,
        );
        if (matching.length > 1) {
          duplicateCount++;
          questions.splice(index, 1);
          questions.push(
            this.generateQuestion(this.primaryUnits, this.secondaryUnits, this.operands),
          );
        }
      });
      if (duplicateCount == 0) requiresCheck = false;
    }
    return questions;
  }

  shouldRandomise() {
    return Math.random() >= 0.5;
  }

  flipFactors(firstNumber, secondNumber, method) {
    return {
      firstNumber: secondNumber,
      secondNumber: firstNumber,
      method: method,
    };
  }

  // Legacy support for when custom sets used decimals instead of percentages for chance.
  getMethodUsingOdds(methods) {
    let isLegacy = methods.every((method) => method.chance <= 1);
    let sum = 0;
    for (let i = 0; i < methods.length; i++) {
      sum += methods[i].chance;
    }
    if (isLegacy) sum = sum * 100;
    const rnd = Math.floor(Math.random() * sum);
    let counter = 0;
    for (let i = 0; i < methods.length; i++) {
      counter += isLegacy ? methods[i].chance * 100 : methods[i].chance;
      if (counter > rnd) {
        return methods[i];
      }
    }
  }
}

export default QuestionsService;
