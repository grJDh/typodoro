import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Toggle Input', () => {

  test('Toggle Input toggles correctly', () => {
    const toggleInputsArray = ["Dark mode", "Auto resume timer", "Sound", "Notifications"];

    render(<App />);

    toggleInputsArray.forEach(toggleName => {
      const toggleButton = screen.getByLabelText(toggleName);

      expect(toggleButton).not.toBeChecked();

      userEvent.click(toggleButton);

      expect(toggleButton).toBeChecked();
    });
  });
})

