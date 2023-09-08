import {describe, expect, test} from 'vitest';
import userEvent from "@testing-library/user-event";
import {render, screen, within} from '@testing-library/react';
import ComponentTestBed from '../../tests/ComponentTestBed';
import configuration from '../../config/dev/configuration.dev.json';
import Summary from './Summary';

const game = configuration.questionSets[0];
const score = 9900;

describe("Summary tests", () => {
    test("should render props correctly", () => {
        
        render(
          <ComponentTestBed>
            <Summary game={game} score={score} />
          </ComponentTestBed>
        );
        expect(screen.getByText(`You finished ${game.name} in...`)).toBeDefined();
        expect(screen.getByText("01:39.00")).toBeDefined();
    })

    test("should be able to input name and see name in leaderboard", async () => {
        
        render(
          <ComponentTestBed>
            <Summary game={game} score={score} />
          </ComponentTestBed>
        );
        
        const input = screen.getByRole("textbox");

        const user = userEvent.setup();
        await user.type(input, "TestUser1");
        await user.click(screen.getByRole("button", { name: "Submit" }));

        expect(within(screen.getByRole("leaderboard")).getByText("TestUser1")).toBeDefined();
    })
})


