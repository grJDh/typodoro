import { useState, useEffect } from "react";

import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import theme from './theme';

import Phase from './components/Phase/Phase';
import StartPauseButton from './components/StartPauseButton/StartPauseButton';

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

const TimerTime = styled.h1`
  font-size: ${props => props.theme.font.size.timer};
  font-weight: 200;
  line-height: 85%;
`;

const App = () => {

  const [currentTimerTime, setCurrentTimerTime] = useState(5);
  const [timerIsActive, setTimerIsActive] = useState(false);

  const toggleTimer = () => setTimerIsActive(!timerIsActive);

  useEffect(() => {
    if (currentTimerTime === 0) {
      setTimerIsActive(false);
      setCurrentTimerTime(5);
    }

    if (timerIsActive) {
      const interval = setInterval(() => {
        setCurrentTimerTime(currentTimerTime - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [currentTimerTime, timerIsActive]);

  return (
    // <div>
    //   <h1>Seconds: {currentTimerTime}</h1>
      
    //   <h2>{timerIsActive && "Timer is active!"}</h2>
      
    //   <button onClick={toggleTimer}>{timerIsActive ? "Stop timer" : "Start timer"}</button>
    // </div>
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />
      <MainWrapper>
        <Phase />
        <TimerWrapper>
          <TimerTime>25</TimerTime>
          <TimerTime>00</TimerTime>
        </TimerWrapper>
        <StartPauseButton />
      </MainWrapper>
    </ThemeProvider>
  );
}

export default App;
