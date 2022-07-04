import { render, screen } from '@testing-library/react';

import App from '../../App';

describe('Secondary Button', () => {

  test('Skip button renders correctly', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /skip/i })
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("Skip icon")
    ).toBeInTheDocument();
    
  });

  test('Menu button renders correctly', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /menu/i })
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("Menu icon")
    ).toBeInTheDocument();
    
  });
})

