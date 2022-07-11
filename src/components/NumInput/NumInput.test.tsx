import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';

describe('Number Input', () => {

  const numInputsArray = [
    {name: "Focus length", defaultValue: 25}, //name and default length
    {name: "Pomodoros until long break", defaultValue: 4},
    {name: "Short break length", defaultValue: 5},
    {name: "Long break length", defaultValue: 25},
  ];

  test('Number Input displays correect numbers', () => {
    render(<App />);

    numInputsArray.forEach(numInputAttrs => {
      const numInput = screen.getByLabelText(numInputAttrs.name);

      expect(numInput).toHaveValue(numInputAttrs.defaultValue);
    });
  });

  test('Typing in Number Input works correctly', () => {
    render(<App />);

    numInputsArray.forEach(numInputAttrs => {
      const numInput = screen.getByLabelText(numInputAttrs.name);

      userEvent.clear(numInput);
      expect(numInput).toHaveValue(null);

      userEvent.type(numInput, numInputAttrs.defaultValue.toString());
      expect(numInput).toHaveValue(numInputAttrs.defaultValue);
    });
  });

  test('Buttons on Number Input work correctly', () => {
    render(<App />);

    numInputsArray.forEach(numInputAttrs => {
      const numInput = screen.getByLabelText(numInputAttrs.name);
      const numInputIncreaseButton = screen.getByTestId(numInputAttrs.name + " +");
      const numInputDecreaseButton = screen.getByTestId(numInputAttrs.name + " -");

      expect(numInputIncreaseButton).toHaveTextContent("⏶");
      expect(numInputDecreaseButton).toHaveTextContent("⏷");

      userEvent.click(numInputIncreaseButton);
      expect(numInput).toHaveValue(numInputAttrs.defaultValue + 1);

      userEvent.click(numInputDecreaseButton);
      expect(numInput).toHaveValue(numInputAttrs.defaultValue);
    });
  });

  test("Number Input accept only positive numbers", () => {
    render(<App />);

    const numInput = screen.getByLabelText("Pomodoros until long break");
    const numInputDecreaseButton = screen.getByTestId("Pomodoros until long break -");

    for (let index = 0; index < 5; index++) userEvent.click(numInputDecreaseButton);
    expect(numInput).toHaveValue(1);

    userEvent.clear(numInput);
    expect(numInput).toHaveValue(null);

    userEvent.type(numInput, 'blabla')
    expect(numInput).toHaveValue(null);

    //I couldn't test typing negative number to input because testing-library just inserts it to the field
    // userEvent.type(numInput, '-1');
    // expect(numInput).toHaveValue(1);
  });
})

