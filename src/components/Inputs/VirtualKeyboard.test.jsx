import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ComponentTestBed from '../../tests/ComponentTestBed';
import VirtualKeyboard from './VirtualKeyboard';

describe('Virtual keyboard tests', () => {
  const handleKeyClicked = vi.fn();

  test('should show all buttons', () => {
    render(
      <ComponentTestBed>
        <VirtualKeyboard onKeyClicked={handleKeyClicked} />
      </ComponentTestBed>,
    );
    expect(screen.getAllByRole('button')).length(12);
  });

  test('Clicking button should call function with correct value', async () => {
    render(
      <ComponentTestBed>
        <VirtualKeyboard onKeyClicked={handleKeyClicked} />
      </ComponentTestBed>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: '5' }));
    expect(handleKeyClicked).toBeCalledTimes(1);
    expect(handleKeyClicked).toBeCalledWith(5);
  });
});
