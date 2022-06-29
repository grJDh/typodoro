import { useState, useEffect } from "react";

import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import theme from './theme';

import Phase from './components/Phase/Phase';
import StartPauseButton from './components/StartPauseButton/StartPauseButton';
import SecondaryButton from "./components/SecondaryButton/SecondaryButton";

interface StyledComponentsProps {
  isRunning: boolean;
}

const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const TimerTime = styled.h1.attrs((props: StyledComponentsProps) => ({
  weight: props.isRunning ? 800 : 200,
}))<StyledComponentsProps>`
  font-size: ${props => props.theme.font.size.timer};
  font-weight: ${props => props.weight};
  line-height: 85%;
`;

const ButtonsWrapper = styled.div`
  width: 320px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//fix timer with Date()

const App = () => {

  const phasesQueue = ['focus', 'short', 'focus', 'short', 'focus', 'short', 'focus', 'long'];
  const focusTime = [0,3] //minutues, seconds
  const shortBreakTime = [0,2];
  const longBreakTime = [0,5];

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(focusTime);
  const [frozenTime, setFrozenTime] = useState(focusTime);
  const [currentPhase, setCurrentPhase] = useState(0);

  const formattedMinutes = currentTime[0] < 10 ? `0${currentTime[0]}` : currentTime[0];
  const formattedSeconds = currentTime[1] < 10 ? `0${currentTime[1]}` : currentTime[1];

  const toggleTimer = () => {
    setIsRunning(!isRunning);

    if (isRunning) setFrozenTime(currentTime);
  } 

  useEffect(() => {
    if (isRunning) {
      let timerOneSecondInterval = setTimeout(() => {
        clearTimeout(timerOneSecondInterval);
    
        if (currentTime[1] === 0) {
          if (currentTime[1] !== 0) {
            setCurrentTime([currentTime[1] - 1, 59]);
          } else {
            const nextPhase = (currentPhase === 7) ? 0 : currentPhase + 1;
            if (phasesQueue[currentPhase] === 'long') setCurrentPhase(0)
            else setCurrentPhase(currentPhase + 1);

            switch (phasesQueue[nextPhase]) {
              case 'short':
                setCurrentTime(shortBreakTime);
                break;
              case 'long':
                setCurrentTime(longBreakTime);
                break;
              default:
                setCurrentTime(focusTime);
                break;
            }
          }
        } else {
          setCurrentTime([currentTime[0], currentTime[1] - 1]);
        }
      }, 1000);
    } else {
      setCurrentTime(frozenTime);
    }
  }, [isRunning, currentTime, frozenTime, currentPhase, phasesQueue, shortBreakTime, longBreakTime, focusTime]);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />

      <MainWrapper>
        <Phase phase={phasesQueue[currentPhase]} />

        <TimerWrapper>
          <TimerTime isRunning={isRunning}>{formattedMinutes}</TimerTime>
          <TimerTime isRunning={isRunning}>{formattedSeconds}</TimerTime>
        </TimerWrapper>

        <ButtonsWrapper>
          <SecondaryButton icon="menu" />
          <StartPauseButton isRunning={isRunning} toggleTimer={toggleTimer} />
          <SecondaryButton icon="skip" />
        </ButtonsWrapper>

      </MainWrapper>

    </ThemeProvider>
  );
}

export default App;
