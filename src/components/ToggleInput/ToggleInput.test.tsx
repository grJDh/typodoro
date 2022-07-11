import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Toggle Input', () => {

  test('Toggle Input toggles', () => {
    render(<App />);

    const toggleButton = screen.getByLabelText('Dark mode')

    expect(toggleButton).toBeChecked();
    expect(toggleButton).toHaveStyle(`background-color: #FFF2F2`); 
    // expect(toggleButton).toHaveStyle(`background-color: #0D0404`); //still don't understand how to test style of ::after

    userEvent.click(toggleButton);

    expect(toggleButton).not.toBeChecked();
    expect(toggleButton).toHaveStyle(`background-color: #FFFFFF3d`);
  });
})

