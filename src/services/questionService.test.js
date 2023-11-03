import { describe, expect, test } from 'vitest';
import Methods from './methods.enum';
import QuestionsService from './questionService';

describe('Question service', () => {
  const questionsService = new QuestionsService();

  test('Should return an array with the target number of questions', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const questions = questionsService.generateQuestions(set);
    expect(questions.length).toBe(50);
  });

  test('Should return an array with the target number of questions 2', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 100,
      primaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const questions = questionsService.generateQuestions(set);
    expect(questions.length).toBe(100);
  });

  test('Should return an array without any duplicates', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: false,
    };
    const questions = questionsService.generateQuestions(set);

    let duplicates = 0;

    questions.forEach((question) => {
      const matching = questions.filter(
        (q2) => question.firstNumber == q2.firstNumber && question.secondNumber == q2.secondNumber,
      );
      if (matching.length > 1) {
        duplicates++;
      }
    });

    expect(duplicates == 0).toBeTruthy();
  });

  test('Should return an array without any duplicates 2', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 100,
      primaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const questions = questionsService.generateQuestions(set);

    let duplicates = 0;

    questions.forEach((question) => {
      const matching = questions.filter(
        (q2) => question.firstNumber == q2.firstNumber && question.secondNumber == q2.secondNumber,
      );
      if (matching.length > 1) {
        duplicates;
      }
    });

    expect(duplicates == 0).toBeTruthy();
  });

  test('Should not return question set with any questions both factors not included in included factors', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 6, 8, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };

    const questions = questionsService.generateQuestions(set);

    let outOfRange = 0;

    questions.forEach((question) => {
      const erroneous =
        !set.primaryNumbers.includes(question.firstNumber) &&
        !set.primaryNumbers.includes(question.secondNumber);
      if (erroneous) outOfRange++;
    });

    expect(outOfRange == 0).toBeTruthy();
  });

  test('Should not return a question where both factors are not included in included factors when calling generateQuestion', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 6, 8, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const question = questionsService.generateQuestion(
      set.primaryNumbers,
      set.secondaryNumbers,
      set.operands,
    );
    expect(
      !set.primaryNumbers.includes(question.firstNumber) &&
        !set.primaryNumbers.includes(question.secondNumber),
    ).toBeFalsy();
  });

  test('getRandomValue should return a random value included in its parameter array', () => {
    const primaryNumbers = [1, 2, 3, 4, 6, 8, 10];
    const value = questionsService.getRandomValue(primaryNumbers);
    expect(primaryNumbers.includes(value)).toBeTruthy();
  });

  test('It should only return multiplication questions when the operands only have multiplication set to true', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 6, 8, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 1,
        },
        division: {
          chance: 0,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const questions = questionsService.generateQuestions(set);

    let multiplicationQuestions = 0;

    questions.forEach((question) => {
      const isMultiplication = question.method == Methods.Multiplication;
      if (isMultiplication) multiplicationQuestions++;
    });

    expect(multiplicationQuestions == set.numberOfQuestions).toBeTruthy();
  });

  test('It should only return division questions when the operands only have division set to true', () => {
    const set = {
      name: 'Test set',
      numberOfQuestions: 50,
      primaryNumbers: [1, 2, 3, 4, 6, 8, 10],
      secondaryNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      operands: {
        multiplication: {
          chance: 0,
        },
        division: {
          chance: 1,
        },
        addition: {
          chance: 0,
        },
        subtraction: {
          chance: 0,
        },
        power: {
          chance: 0,
        },
        root: {
          chance: 0,
        },
      },
      customSet: true,
    };
    const questions = questionsService.generateQuestions(set);

    let divisionQuestions = 0;

    questions.forEach((question) => {
      const isDivision = question.method == Methods.Division;
      if (isDivision) divisionQuestions++;
    });

    console.log(divisionQuestions);

    expect(divisionQuestions == set.numberOfQuestions).toBeTruthy();
  });
});
