import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Toggle Input', () => {

  test('blablabla', () => {
    render(<App />);

    const startTimerButton = screen.getByLabelText('Dark mode')

    // screen.debug(startTimerButton)
  });
})

