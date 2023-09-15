import Methods from "./methods.enum";

class QuestionsService {
  constructor() {
    this.numberOfQuestions = null;
    this.includedUnits = null;
    this.secondaryUnits = null;
    this.operands = {};
  }

  generateQuestions(
    numberOfQuestions,
    includedUnits,
    secondaryUnits,
    operands
  ) {
    this.includedUnits = includedUnits;
    this.secondaryUnits = secondaryUnits;
    this.numberOfQuestions = numberOfQuestions;
    this.operands = operands;
    return this.generateSet(
      numberOfQuestions,
      includedUnits,
      secondaryUnits,
      operands
    );
  }

  generateSet(numberOfQuestions, includedUnits, secondaryUnits, operands) {
    let questions = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const question = this.generateQuestion(
        includedUnits,
        secondaryUnits,
        operands
      );
      questions.push(question);
    }
    return this.ensureNoDuplicates(questions);
  }

  generateQuestion(includedUnits, secondaryUnits, operands) {
    const method = this.getMethod(operands);

    let question = {
      firstNumber: this.getRandomValue(includedUnits),
      secondNumber: this.getRandomValue(secondaryUnits),
      method: method
    };

    if (question.method == Methods.Division) {
      question = this.formatDivision(question);
      return question;
    }

    if (question.method == Methods.Subtraction) {
      question = this.formatSubtraction(question);
      return question;
    }

    if (question.method == Methods.Root) {
      question = this.formatRoot(question);
      return question;
    }

    // Never flip subtraction/ root or power units
    if(question.method == Methods.Subtraction || question.method == Methods.Power || question.method == Methods.Root) return question;

    //50% chance of flipping factors
    if (this.shouldRandomise())
      return this.flipFactors(
        question.firstNumber,
        question.secondNumber,
        method
      );
    return question;
  }

  getMethod(operands) {
    const methods = [
      operands.multiplication,
      operands.division,
      operands.addition,
      operands.subtraction,
      operands.power,
      operands.root
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

  formatSubtraction(question) {
    if (question.firstNumber >= question.secondNumber) return question;
    const tempN1 = question.firstNumber;
    question.firstNumber = question.secondNumber;
    question.secondNumber = tempN1;
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
          comparand =>
            question.firstNumber == comparand.firstNumber &&
            question.secondNumber == comparand.secondNumber
        );
        if (matching.length > 1) {
          duplicateCount++;
          questions.splice(index, 1);
          questions.push(
            this.generateQuestion(
              this.includedUnits,
              this.secondaryUnits,
              this.operands
            )
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
      method: method
    };
  }

  getMethodUsingOdds(methods) {
    let sum = 0;
    for (let i = 0; i < methods.length; i++) {
      sum += methods[i].chance;
    }
    const rnd = Math.floor(Math.random() * (sum * 100));
    let counter = 0;
    for (let i = 0; i < methods.length; i++) {
      counter += methods[i].chance * 100;
      if (counter > rnd) {
        return methods[i];
      }
    }
  }
}

export default QuestionsService;
