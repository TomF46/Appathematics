import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ComponentTestBed from '../../tests/ComponentTestBed';
import Leaderboards from './Leaderboards';
import initialHighScores from '../../config/dev/initialHighScores.dev.json';

describe("Home Tests", () => {
    test("should default to first question set in set select", () => {
        
        render(
          <ComponentTestBed>
            <Leaderboards />
          </ComponentTestBed>
        );

        expect(screen.getByRole("option", { name: "33 Questions" }).selected).toBe(true);
    })

    test("should default to showing leaderboard for default first question set.", () => {
        
      render(
        <ComponentTestBed>
          <Leaderboards />
        </ComponentTestBed>
      );

      // From test data get first line from first set
      expect(screen.getByText(initialHighScores[0].scores[0].username)).toBeDefined()
      expect(screen.getByText(initialHighScores[0].scores[0].score)).toBeDefined()
      
  })

  test("should be able to change set select to another set and see updated leaderboard", async () => {
        
    render(
      <ComponentTestBed>
        <Leaderboards />
      </ComponentTestBed>
    );

    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole("select"), "2");

    // From test data get first line from second set
    expect(screen.getByText(initialHighScores[1].scores[0].username)).toBeDefined()
    expect(screen.getByText(initialHighScores[1].scores[0].score)).toBeDefined()
    
})
})