import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Home from './Home';
import ComponentTestBed from '../../tests/ComponentTestBed';

describe("Home Tests", () => {
    test("should show title", () => {
        
        render(
          <ComponentTestBed>
            <Home />
          </ComponentTestBed>
        );

        expect(screen.getByText("Welcome to Appathematics")).toBeDefined()
    })
})