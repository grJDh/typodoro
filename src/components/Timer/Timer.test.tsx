import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Timer', () => {

  test('After starting timer time font weight toggles correctly', () => {
    render(<App />);

    const startTimerButton = screen.getByRole('button', { name: /Start/i });
    const timerTimeMinutes = screen.getByRole('heading', { name: "25" });
    const timerTimeSeconds = screen.getByRole('heading', { name: "00" });
  
    expect(timerTimeMinutes).toHaveStyle(`font-weight: 200`);
    expect(timerTimeSeconds).toHaveStyle(`font-weight: 200`);
  
    userEvent.click(startTimerButton);
  
    expect(timerTimeMinutes).toHaveStyle(`font-weight: 800`);
    expect(timerTimeSeconds).toHaveStyle(`font-weight: 800`);
  });
})

