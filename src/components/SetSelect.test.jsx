import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ComponentTestBed from '../tests/ComponentTestBed';
import SetSelect from './SetSelect';
import questionSets from '../config/dev/configuration.dev.json';

describe('Set select tests', () => {
  test('should show select', () => {
    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={() => {}} />
      </ComponentTestBed>,
    );
    expect(screen.getByRole('select')).toBeDefined();
  });

  test('should show correct number of options', () => {
    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={() => {}} />
      </ComponentTestBed>,
    );
    expect(screen.getAllByRole('option').length).toBe(10);
  });

  test('First option should be pre selected', () => {
    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={() => {}} />
      </ComponentTestBed>,
    );

    expect(screen.getByRole('option', { name: '33 Questions' }).selected).toBe(true);
  });

  test('Can change option.', async () => {
    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={() => {}} />
      </ComponentTestBed>,
    );

    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('select'), '2');
    expect(screen.getByRole('option', { name: '44 Questions' }).selected).toBe(true);
  });

  test('Can see select button if set is selected.', async () => {
    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={() => {}} />
      </ComponentTestBed>,
    );

    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('select'), '2');
    expect(screen.getByRole('button', { name: 'Select' })).toBeDefined();
  });

  test('function is called if select button is called', async () => {
    const handleSetSelected = vi.fn();

    render(
      <ComponentTestBed>
        <SetSelect onSetSelected={handleSetSelected} />
      </ComponentTestBed>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Select' }));
    expect(handleSetSelected).toBeCalledTimes(1);
    expect(handleSetSelected).toBeCalledWith(questionSets.questionSets[0]);
  });
});
