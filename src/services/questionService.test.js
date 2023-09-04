import { describe, expect, test } from 'vitest'
import Methods from './methods.enum';
import QuestionsService from './questionService';

describe('Question service', () => {
    const questionsService = new QuestionsService();

    test("Should return an array with the target number of questions", () => {
        const numberOfQuestions = 50;
        const includedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
        expect(questions.length).toBe(50);
      });
    
      test("Should return an array with the target number of questions 2", () => {
        const numberOfQuestions = 100;
        const includedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
        expect(questions.length).toBe(100);
      });
    
      test("Should return an array without any duplicates", () => {
        const numberOfQuestions = 50;
        const includedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
    
        let duplicates = 0;
    
        questions.forEach((question) => {
          const matching = questions.filter(
            q2 =>
              question.firstNumber == q2.firstNumber &&
              question.secondNumber == q2.secondNumber
          );
          if (matching.length > 1) {
            duplicates++;
          }
        });
    
        expect(duplicates == 0).toBeTruthy();
      });
    
      test("Should return an array without any duplicates 2", () => {
        const numberOfQuestions = 100;
        const includedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
    
        let duplicates = 0;
    
        questions.forEach(question => {
          const matching = questions.filter(
            q2 =>
              question.firstNumber == q2.firstNumber &&
              question.secondNumber == q2.secondNumber
          );
          if (matching.length > 1) {
            duplicates;
          }
        });
    
        expect(duplicates == 0).toBeTruthy();
      });
    
      test("Should not return question set with any questions both factors not included in included factors", () => {
        const numberOfQuestions = 50;
        const includedNumbers = [1, 2, 3, 4, 6, 8, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
    
        let outOfRange = 0;
    
        questions.forEach(question => {
          const erroneous =
            !includedNumbers.includes(question.firstNumber) &&
            !includedNumbers.includes(question.secondNumber);
          if (erroneous) outOfRange++;
        });
    
        expect(outOfRange == 0).toBeTruthy();
      });
    
      test("Should not return a question where both factors are not included in included factors when calling generateQuestion", () => {
        const includedNumbers = [1, 2, 3, 4, 6, 8, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const question = questionsService.generateQuestion(
          includedNumbers,
          secondaryNumbers,
          operands
        );
        expect(
          !includedNumbers.includes(question.firstNumber) &&
            !includedNumbers.includes(question.secondNumber)
        ).toBeFalsy();
      });
    
      test("getRandomValue should return a random value included in its parameter array", () => {
        const includedNumbers = [1, 2, 3, 4, 6, 8, 10];
        const value = questionsService.getRandomValue(includedNumbers);
        expect(includedNumbers.includes(value)).toBeTruthy();
      });
    
      test("It should only return multiplication questions when the operands only have multiplication set to true", () => {
        const numberOfQuestions = 50;
        const includedNumbers = [1, 2, 3, 4, 6, 8, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 1
          },
          division: {
            chance: 0
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
    
        let multiplicationQuestions = 0;
    
        questions.forEach(question => {
          const isMultiplication = question.method == Methods.Multiplication;
          if (isMultiplication) multiplicationQuestions++;
        });
    
        expect(multiplicationQuestions == numberOfQuestions).toBeTruthy();
      });
    
      test("It should only return division questions when the operands only have division set to true", () => {
        const numberOfQuestions = 50;
        const includedNumbers = [1, 2, 3, 4, 6, 8, 10];
        const secondaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const operands = {
          multiplication: {
            chance: 0
          },
          division: {
            chance: 1
          },
          addition: {
            chance: 0
          },
          subtraction: {
            chance: 0
          }
        };
        const questions = questionsService.generateQuestions(
          numberOfQuestions,
          includedNumbers,
          secondaryNumbers,
          operands
        );
    
        let divisionQuestions = 0;
    
        questions.forEach(question => {
          const isDivision = question.method == Methods.Division;
          if (isDivision) divisionQuestions++;
        });
    
        expect(divisionQuestions == numberOfQuestions).toBeTruthy();
      });
    
})