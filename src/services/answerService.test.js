import { describe, expect, test } from 'vitest'
import AnswersService from './answerService'
import Methods from './methods.enum';

describe('Answer service', () => {
    const answersService = new AnswersService();

    test("Check if correct should return true if it is correct, Mulitiplication", () => {
        const isCorrect = answersService.checkIfCorrect(
          45,
          5,
          9,
          Methods.Multiplication
        );
        expect(isCorrect).toBeTruthy();
      });

      test("Check if correct should return false if it is incorrect, Mulitiplication", () => {
        const isCorrect = answersService.checkIfCorrect(
          45,
          3,
          9,
          Methods.Multiplication
        );
        expect(isCorrect).toBeFalsy();
      });
    
      test("Check if correct should return true if it is correct, Division", () => {
        const isCorrect = answersService.checkIfCorrect(5, 45, 9, Methods.Division);
        expect(isCorrect).toBeTruthy();
      });
    
      test("Check if correct should return false if it is incorrect, Mulitiplication", () => {
        const isCorrect = answersService.checkIfCorrect(7, 45, 9, Methods.Division);
        expect(isCorrect).toBeFalsy();
      });
})