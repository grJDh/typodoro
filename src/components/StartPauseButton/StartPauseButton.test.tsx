import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

test('Start/Pause button toggles after click', () => {
  render(<App />);
  const startTimerButton = screen.getByRole('button', { name: /Start/i });
  userEvent.click(startTimerButton);

  expect(
    screen.getByTitle(/Pause/i)
  ).toBeInTheDocument();
  expect(
    screen.queryByTitle(/Start/i)
  ).toBeNull();

  userEvent.click(startTimerButton);

  expect(
    screen.getByTitle(/Start/i)
  ).toBeInTheDocument();
  expect(
    screen.queryByTitle(/Pause/i)
  ).toBeNull();
  
});

