import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ComponentTestBed from '../../tests/ComponentTestBed';
import Leaderboard from './Leaderboard';

let data = [
  { username: 'Claire', score: 38500 },
  { username: 'Tom', score: 23999 },
  { username: 'Karen', score: 26500 },
  { username: 'Louise', score: 31000 },
  { username: 'Mark', score: 42500 },
];

describe('Leaderboard tests', () => {
  test('should show leaderboard', () => {
    render(
      <ComponentTestBed>
        <Leaderboard scores={data} />
      </ComponentTestBed>,
    );
    expect(screen.getByRole('leaderboard')).toBeDefined();
  });

  test('should show correct number of rows', () => {
    render(
      <ComponentTestBed>
        <Leaderboard scores={data} />
      </ComponentTestBed>,
    );
    expect(screen.getAllByRole('table-row')).length(5);
  });
});
