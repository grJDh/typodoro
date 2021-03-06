import { render, screen } from '@testing-library/react';

import App from '../../App';

test('Phase display renders correctly', () => {
  render(<App />);

  expect(
    screen.getByTitle("Focus icon")
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /Focus/i })
  ).toBeInTheDocument();

});

