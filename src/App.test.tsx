import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { arrayBuffer } from 'stream/consumers';

import App from './App';

describe('Timer is working', () => {
  const phasesQueue = ['focus', 'short', 'focus', 'short', 'focus', 'short', 'focus', 'long'];

  const focusTime = [25,0]; //minutues, seconds
  const shortBreakTime = [5,0];
  const longBreakTime = [25,0];

  const focusTimeInSeconds = (focusTime[0] * 60 + focusTime[1]);
  const shortBreakTimeInSeconds = (shortBreakTime[0] * 60 + shortBreakTime[1]);
  const longBreakTimeInSeconds = (longBreakTime[0] * 60 + longBreakTime[1]);

  const returnFormattedTime = (time:number) => {
    const formattedTime = time < 10 ? `0${time}` : time.toString();

    return formattedTime;
  }

  const renderAppAndCheckTimer = () => {
    render(<App />);

    const minutes = screen.getByRole('heading', { name: returnFormattedTime(focusTime[0]) });
    const seconds = screen.getByRole('heading', { name: returnFormattedTime(focusTime[1]) });

    expect(minutes).toBeInTheDocument();
    expect(seconds).toBeInTheDocument();

    return [minutes, seconds];
  }

  const startTimer = () => {
    const startTimerButton = screen.getByRole('button', { name: /Start/i });
    userEvent.click(startTimerButton);
  }

  test('Seconds and minutes decrease', () => {
    jest.useFakeTimers();

    const [minutes, seconds] = renderAppAndCheckTimer();

    startTimer();

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(minutes).toHaveTextContent((focusTime[0] - 1).toString());
    expect(seconds).toHaveTextContent('59');
  });

  test('App makes full cycle correctly', () => {
    jest.useFakeTimers();

    const [minutes, seconds] = renderAppAndCheckTimer();

    const phaseName = screen.getByRole('heading', { name: /Focus/i });

    startTimer();

    const returnPhaseTime = (phase:string) => {
      switch (phase) {
        case 'short':
          return shortBreakTime;
        case 'long':
          return longBreakTime;
        default:
          return focusTime;
      }
    }

    const returnPhaseTimeInSeconds = (phase:string) => {
      switch (phase) {
        case 'short':
          return shortBreakTimeInSeconds;
        case 'long':
          return longBreakTimeInSeconds;
        default:
          return focusTimeInSeconds;
      }
    }

    phasesQueue.forEach((phase, i) => {
      const nextPhase = (i === phasesQueue.length-1) ? phasesQueue[0] : phasesQueue[i+1]
      const startingPhaseTime = returnPhaseTime(phase);
      const startingNextPhaseTime = returnPhaseTime(nextPhase);

      expect(phaseName).toHaveTextContent(new RegExp(phase, "i"));
      expect(minutes).toHaveTextContent(startingPhaseTime[0].toString());
      expect(seconds).toHaveTextContent(startingPhaseTime[1].toString());

      const phaseTimeInSeconds = returnPhaseTimeInSeconds(phase);

      for (let j = 0; j <= phaseTimeInSeconds; j++) {
        act(() => {
          jest.advanceTimersToNextTimer();
        });
      }

      expect(phaseName).toHaveTextContent(new RegExp(nextPhase, "i"));
      expect(minutes).toHaveTextContent(startingNextPhaseTime[0].toString());
      expect(seconds).toHaveTextContent(startingNextPhaseTime[1].toString());
    });
  });

  test.skip('Colors change correctly', () => {
    jest.useFakeTimers();

    const [minutes, seconds] = renderAppAndCheckTimer();

    startTimer();

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(minutes).toHaveTextContent((focusTime[0] - 1).toString());
    expect(seconds).toHaveTextContent('59');
  });
})

