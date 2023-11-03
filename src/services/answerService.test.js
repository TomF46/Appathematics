import { describe, expect, test } from 'vitest';
import AnswersService from './answerService';
import Methods from './methods.enum';

describe('Answer service', () => {
  const answersService = new AnswersService();

  test('Check if correct should return true if it is correct, Mulitiplication', () => {
    const isCorrect = answersService.checkIfCorrect(45, 5, 9, Methods.Multiplication);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Mulitiplication', () => {
    const isCorrect = answersService.checkIfCorrect(45, 3, 9, Methods.Multiplication);
    expect(isCorrect).toBeFalsy();
  });

  test('Check if correct should return true if it is correct, Division', () => {
    const isCorrect = answersService.checkIfCorrect(5, 45, 9, Methods.Division);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Mulitiplication', () => {
    const isCorrect = answersService.checkIfCorrect(7, 45, 9, Methods.Division);
    expect(isCorrect).toBeFalsy();
  });

  test('Check if correct should return true if it is correct, Addition', () => {
    const isCorrect = answersService.checkIfCorrect(12, 10, 2, Methods.Addition);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Addition', () => {
    const isCorrect = answersService.checkIfCorrect(26, 10, 6, Methods.Addition);
    expect(isCorrect).toBeFalsy();
  });

  test('Check if correct should return true if it is correct, Subtraction', () => {
    const isCorrect = answersService.checkIfCorrect(22, 25, 3, Methods.Subtraction);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Subtraction', () => {
    const isCorrect = answersService.checkIfCorrect(26, 30, 6, Methods.Subtraction);
    expect(isCorrect).toBeFalsy();
  });

  test('Check if correct should return true if it is correct, Power', () => {
    const isCorrect = answersService.checkIfCorrect(8, 2, 3, Methods.Power);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Power', () => {
    const isCorrect = answersService.checkIfCorrect(6, 3, 2, Methods.Power);
    expect(isCorrect).toBeFalsy();
  });

  test('Check if correct should return true if it is correct, Root', () => {
    const isCorrect = answersService.checkIfCorrect(10, 1000, 3, Methods.Root);
    expect(isCorrect).toBeTruthy();
  });

  test('Check if correct should return false if it is incorrect, Power', () => {
    const isCorrect = answersService.checkIfCorrect(7, 64, 2, Methods.Root);
    expect(isCorrect).toBeFalsy();
  });
});
