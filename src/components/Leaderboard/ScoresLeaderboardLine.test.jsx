import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ComponentTestBed from '../../tests/ComponentTestBed';
import ScoresLeaderboardLine from './ScoresLeaderboardLine';

let data = { username: 'Claire', score: 38500 };

describe('Leaderboard line tests', () => {
  test('should render correct username', () => {
    render(
      <ComponentTestBed>
        <ScoresLeaderboardLine score={data} />
      </ComponentTestBed>,
    );
    expect(screen.getByText(data.username)).toBeDefined();
  });

  test('should render correct score', () => {
    render(
      <ComponentTestBed>
        <ScoresLeaderboardLine score={data} />
      </ComponentTestBed>,
    );
    expect(screen.getByText(data.score)).toBeDefined();
  });

  test('should render correct time', () => {
    render(
      <ComponentTestBed>
        <ScoresLeaderboardLine score={data} />
      </ComponentTestBed>,
    );
    expect(screen.getByText('06:25.00')).toBeDefined();
  });
});
