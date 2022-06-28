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

const App = () => {

  const starterMinutes = 2;
  const starterSeconds = 0;

  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(starterMinutes);
  const [seconds, setSeconds] = useState(starterSeconds);
  const [frozenMinutes, setFrozenMinutes] = useState(starterMinutes);
  const [frozenSeconds, setFrozenSeconds] = useState(starterSeconds);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const toggleTimer = () => {
    setIsRunning(!isRunning);

    if (isRunning) {
      setFrozenMinutes(minutes);
      setFrozenSeconds(seconds);
    }
  } 

  useEffect(() => {
    if (isRunning) {
      let timerOneSecondInterval = setTimeout(() => {
        clearTimeout(timerOneSecondInterval);
    
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setMinutes(starterMinutes);
            setSeconds(starterSeconds);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      setMinutes(frozenMinutes);
      setSeconds(frozenSeconds);
    }
  }, [isRunning, minutes, seconds]);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />

      <MainWrapper>
        <Phase />

        <TimerWrapper>
          <TimerTime isRunning={isRunning}>{formattedMinutes}</TimerTime>
          <TimerTime isRunning={isRunning}>{formattedSeconds}</TimerTime>
        </TimerWrapper>

        <ButtonsWrapper>
          <SecondaryButton icon="dots" />
          <StartPauseButton isRunning={isRunning} toggleTimer={toggleTimer} />
          <SecondaryButton icon="skip" />
        </ButtonsWrapper>

      </MainWrapper>

    </ThemeProvider>
  );
}

export default App;
