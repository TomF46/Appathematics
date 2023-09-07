import {describe, expect, test} from 'vitest';
import userEvent from "@testing-library/user-event";
import {render, screen} from '@testing-library/react';
import ComponentTestBed from '../tests/ComponentTestBed';
import SetSelect from './SetSelect';

describe("Set select tests", () => {
    test("should show select", () => {
        
        render(
          <ComponentTestBed>
            <SetSelect onSetSelected={()=>{}} />
          </ComponentTestBed>
        );
        expect(screen.getByRole("select")).toBeDefined();
    })

    test("should show correct number of options", () => {
        
        render(
          <ComponentTestBed>
            <SetSelect onSetSelected={()=>{}} />
          </ComponentTestBed>
        );
        expect(screen.getAllByRole("option")).length(8);
    })

    test("First option should be pre selected", () => {
        
        render(
          <ComponentTestBed>
            <SetSelect onSetSelected={()=>{}} />
          </ComponentTestBed>
        );

        expect(screen.getByRole("option", { name: "33 Questions" }).selected).toBe(true);
    })

    test("Can change option.", async () => {

        render(
            <ComponentTestBed>
              <SetSelect onSetSelected={()=>{}} />
            </ComponentTestBed>
        );

        const user = userEvent.setup();
        await user.selectOptions(screen.getByRole("select"), "2");
        expect(screen.getByRole("option", { name: "44 Questions" }).selected).toBe(true);
    })
})


