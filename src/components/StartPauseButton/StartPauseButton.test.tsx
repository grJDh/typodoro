import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

test('Start button changes to Pause after click', () => {
  render(<App />);
  const startTimerButton = screen.getByRole('button', { name: /Start/i });
  userEvent.click(startTimerButton);

  expect(
    screen.getByTitle(/Pause/i)
  ).toBeInTheDocument();

  expect(
    screen.queryByTitle(/Start/i)
  ).toBeNull();
  
});

