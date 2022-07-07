import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import theme from "./theme";

import App from "./App";

describe("Timer is working", () => {
  const phasesQueue = ["focus", "short", "focus", "short", "focus", "short", "focus", "long"];

  const focusTime = [25, 0]; //minutues, seconds
  const shortBreakTime = [5, 0];
  const longBreakTime = [25, 0];

  const formattedMinutes = focusTime[0] < 10 ? `0${focusTime[0]}` : focusTime[0].toString();
  const formattedSeconds = focusTime[1] < 10 ? `0${focusTime[1]}` : focusTime[1].toString();

  const focusTimeInSeconds = focusTime[0] * 60 + focusTime[1];
  const shortBreakTimeInSeconds = shortBreakTime[0] * 60 + shortBreakTime[1];
  const longBreakTimeInSeconds = longBreakTime[0] * 60 + longBreakTime[1];

  const returnFormattedTime = (time: number) => {
    const formattedTime = time < 10 ? `0${time}` : time.toString();

    return formattedTime;
  };

  const renderAppAndCheckTimer = () => {
    render(<App />);

    const minutes = screen.getByRole("heading", { name: returnFormattedTime(focusTime[0]) });
    const seconds = screen.getByRole("heading", { name: returnFormattedTime(focusTime[1]) });

    expect(minutes).toBeInTheDocument();
    expect(seconds).toBeInTheDocument();

    return [minutes, seconds];
  };

  const startTimer = () => {
    const startTimerButton = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startTimerButton);
  };

  test("Seconds and minutes decrease", () => {
    jest.useFakeTimers();

    const [minutes, seconds] = renderAppAndCheckTimer();

    startTimer();

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(minutes).toHaveTextContent((focusTime[0] - 1).toString());
    expect(seconds).toHaveTextContent("59");
  });

  test("App makes full cycle correctly", () => {
    jest.useFakeTimers();

    const [minutes, seconds] = renderAppAndCheckTimer();

    const phaseName = screen.getByRole("heading", { name: /Focus/i });
    const phaseIcon = screen.getByTitle("Focus icon");

    startTimer();

    const returnPhaseTime = (phase: string) => {
      switch (phase) {
        case "short":
          return shortBreakTime;
        case "long":
          return longBreakTime;
        default:
          return focusTime;
      }
    };

    const returnPhaseTimeInSeconds = (phase: string) => {
      switch (phase) {
        case "short":
          return shortBreakTimeInSeconds;
        case "long":
          return longBreakTimeInSeconds;
        default:
          return focusTimeInSeconds;
      }
    };

    const returnPhaseIconTitle = (phase: string) => {
      switch (phase) {
        case "short":
          return "Short Break icon";
        case "long":
          return "Long Break icon";
        default:
          return "Focus icon";
      }
    };

    phasesQueue.forEach(phase => {
      const startingPhaseTime = returnPhaseTime(phase);

      expect(phaseName).toHaveTextContent(new RegExp(phase, "i"));
      expect(phaseIcon).toHaveAttribute("title", returnPhaseIconTitle(phase));
      expect(minutes).toHaveTextContent(startingPhaseTime[0].toString());
      expect(seconds).toHaveTextContent(startingPhaseTime[1].toString());

      const phaseTimeInSeconds = returnPhaseTimeInSeconds(phase);

      for (let j = 0; j <= phaseTimeInSeconds; j++) {
        act(() => {
          jest.advanceTimersToNextTimer();
        });
      }
    });
  });

  test("Skip button works correctly", () => {
    const [minutes, seconds] = renderAppAndCheckTimer();
    const phaseName = screen.getByRole("heading", { name: /Focus/i });

    const skipButton = screen.getByRole("button", { name: /skip/i });
    userEvent.click(skipButton);

    expect(phaseName).toHaveTextContent(/Short/i);
    expect(minutes).toHaveTextContent(shortBreakTime[0].toString());
    expect(seconds).toHaveTextContent(shortBreakTime[1].toString());
  });

  test.skip("Pause button works correctly", done => {
    // it may seem strange to test it, but before if you pause a timer it would tick one more second and only then stop
    // this test tests this behaviour

    // jest.useFakeTimers();
    const [minutes, seconds] = renderAppAndCheckTimer();

    const startTimerButton = screen.getByRole("button", { name: /Start/i });
    const startTimetButtinIcon = screen.getByTitle("Start icon");

    userEvent.click(startTimerButton);

    expect(startTimetButtinIcon).toHaveAttribute("title", "Pause icon");
    // screen.debug(startTimetButtinIcon)

    userEvent.click(startTimerButton);

    // setTimeout(() => {
    //   console.log(1)

    // }, 1000);

    // screen.debug(startTimetButtinIcon)

    // act(() => {
    //   jest.runAllTimers();
    // });

    setTimeout(() => {
      expect(startTimetButtinIcon).toHaveAttribute("title", "Start");
      screen.debug(minutes);
      screen.debug(seconds);
      done();
    }, 2000);

    // expect(minutes).toHaveTextContent((focusTime[0] - 1).toString());
    // expect(seconds).toHaveTextContent('58');
  });

  test("Colors change correctly", () => {
    renderAppAndCheckTimer();

    const mainWrapper = screen.getByTestId("MainWrapper");
    const timerTimeMinutes = screen.getByRole("heading", { name: formattedMinutes });
    const timerTimeSeconds = screen.getByRole("heading", { name: formattedSeconds });
    const startPauseButton = screen.getByRole("button", { name: /Start/i });
    const startPauseButtonIcon = screen.getByTitle("Start icon");
    const skipButton = screen.getByRole("button", { name: /skip/i });
    const skipButtonIcon = screen.getByTitle("Skip icon");
    const menuButton = screen.getByRole("button", { name: /menu/i });
    const menuButtonIcon = screen.getByTitle("Menu icon");
    const phaseWrapper = screen.getByTestId("PhaseWrapper");
    const phaseTitle = screen.getByRole("heading", { name: /Focus/i });
    const phaseIcon = screen.getByTitle("Focus icon");

    const arrayOf950Colors = [theme.color.red950, theme.color.green950, theme.color.blue950];
    const arrayOf50Colors = [theme.color.red50, theme.color.green50, theme.color.blue50];
    const arrayOfAlpha700Colors = [theme.color.redAlpha700, theme.color.greenAlpha700, theme.color.blueAlpha700];
    const arrayOfAlpha100Colors = [theme.color.redAlpha100, theme.color.greenAlpha100, theme.color.blueAlpha100];

    const checkColors = (phaseNum: number) => {
      expect(mainWrapper).toHaveStyle(`background-color: ${arrayOf950Colors[phaseNum]}`);

      expect(timerTimeMinutes).toHaveStyle(`color: ${arrayOf50Colors[phaseNum]}`);
      expect(timerTimeSeconds).toHaveStyle(`color: ${arrayOf50Colors[phaseNum]}`);

      expect(startPauseButton).toHaveStyle(`background-color: ${arrayOfAlpha700Colors[phaseNum]}`);
      expect(startPauseButtonIcon).toHaveStyle(`background-color: ${arrayOf50Colors[phaseNum]}`);

      expect(skipButton).toHaveStyle(`background-color: ${arrayOfAlpha100Colors[phaseNum]}`);
      expect(skipButtonIcon).toHaveStyle(`background-color: ${arrayOf50Colors[phaseNum]}`);

      expect(menuButton).toHaveStyle(`background-color: ${arrayOfAlpha100Colors[phaseNum]}`);
      expect(menuButtonIcon).toHaveStyle(`background-color: ${arrayOf50Colors[phaseNum]}`);

      expect(phaseWrapper).toHaveStyle(`background-color: ${arrayOfAlpha100Colors[phaseNum]}`);
      expect(phaseWrapper).toHaveStyle(`border-color: ${arrayOf50Colors[phaseNum]}`);
      expect(phaseTitle).toHaveStyle(`color: ${arrayOf50Colors[phaseNum]}`);
      expect(phaseIcon).toHaveStyle(`background-color: ${arrayOf50Colors[phaseNum]}`);
    };

    checkColors(0);

    userEvent.click(skipButton);

    checkColors(1);

    for (let index = 0; index < 6; index++) userEvent.click(skipButton);

    checkColors(2);
  });
});
