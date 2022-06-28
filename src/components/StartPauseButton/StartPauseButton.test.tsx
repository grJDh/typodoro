import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Start/Pause Button', () => {
  const findAndClickStartButton = () => {
    render(<App />);
    const startTimerButton = screen.getByRole('button', { name: /Start/i });
    userEvent.click(startTimerButton);
  }

  test('Button renders correctly', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /Start/i })
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(/Start/i)
    ).toBeInTheDocument();
    
  });

  test('Start button changes to Pause after click', () => {
    findAndClickStartButton();

    expect(
      screen.getByAltText(/Pause/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByAltText(/Start/i)
    ).toBeNull();
    
  });
})

