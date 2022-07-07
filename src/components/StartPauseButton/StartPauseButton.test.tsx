import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../../App";

test("Start/Pause button toggles after click", () => {
  render(<App />);
  const startTimerButton = screen.getByRole("button", { name: /Start/i });
  const startTimetButtinIcon = screen.getByTitle("Start icon");

  userEvent.click(startTimerButton);

  expect(startTimetButtinIcon).toHaveAttribute("title", "Pause icon");
  expect(startTimetButtinIcon).not.toHaveAttribute("title", "Start icon");

  userEvent.click(startTimerButton);

  expect(startTimetButtinIcon).toHaveAttribute("title", "Start icon");
  expect(startTimetButtinIcon).not.toHaveAttribute("title", "Pause icon");
});
