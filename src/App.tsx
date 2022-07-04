import { useState, useEffect } from "react";

import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import theme from './theme';

import Phase from './components/Phase/Phase';
import StartPauseButton from './components/StartPauseButton/StartPauseButton';
import SecondaryButton from "./components/SecondaryButton/SecondaryButton";

import skip_icon from './components/SecondaryButton/skip.svg';
import menu_icon from './components/SecondaryButton/dots.svg';

interface MainWrapperProps {
  phaseName: string;
}
const MainWrapper = styled.div<MainWrapperProps>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          background-color: ${props.theme.color.green950};
        `
      case "long":
        return `
          background-color: ${props.theme.color.blue950};
        `
      default:
        return `
          background-color: ${props.theme.color.red950};
        `
    }
  }};
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
`;

interface TimerTimeProps {
  isRunning: boolean;
  phaseName: string;
}
const TimerTime = styled.h1<TimerTimeProps>`
  line-height: 85%;

  font-size: ${props => props.theme.font.size.timer};
  font-weight: ${props => (props.isRunning ? 800 : 200)};

  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          color: ${props.theme.color.green50};
        `
      case "long":
        return `
          color: ${props.theme.color.blue50};
        `
      default:
        return `
          color: ${props.theme.color.red50};
        `
    }
  }};
`;

const ButtonsWrapper = styled.div`
  width: 320px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//fix timer with Date()
//if you stop timer on 00:00, phase will change, but timer will stay at 00:00

const App = () => {

  const phasesQueue = ['focus', 'short', 'focus', 'short', 'focus', 'short', 'focus', 'long'];

  const [focusTime, setFocusTime] = useState([25,0]); //minutues, seconds
  const [shortBreakTime, setShortBreakTime] = useState([5,0]);
  const [longBreakTime, setLongBreakTime] = useState([25,0]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(focusTime);
  const [frozenTime, setFrozenTime] = useState(focusTime);
  const [currentPhase, setCurrentPhase] = useState(0);

  const formattedMinutes = currentTime[0] < 10 ? `0${currentTime[0]}` : currentTime[0].toString();
  const formattedSeconds = currentTime[1] < 10 ? `0${currentTime[1]}` : currentTime[1].toString();

  const toggleTimer = () => {
    setIsRunning(!isRunning);

    if (isRunning) setFrozenTime([currentTime[0], currentTime[1]]);
  }

  const changeToTheNextPhase = () => {
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

  useEffect(() => {
    if (isRunning) {
      let timerOneSecondInterval = setTimeout(() => {
        clearTimeout(timerOneSecondInterval);
    
        if (currentTime[1] === 0) {
          if (currentTime[0] !== 0) {
            setCurrentTime([currentTime[0] - 1, 59]);
          } else {
            changeToTheNextPhase();
          }
        } else {
          setCurrentTime([currentTime[0], currentTime[1] - 1]);
        }
      }, 1000);
    } else {
      setCurrentTime(frozenTime);
    }
  }, [isRunning, currentTime, frozenTime, currentPhase]);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />

      <MainWrapper phaseName={phasesQueue[currentPhase]} data-testid="MainWrapper">
        <Phase phaseName={phasesQueue[currentPhase]} />

        <TimerWrapper>
          <TimerTime phaseName={phasesQueue[currentPhase]} isRunning={isRunning}>{formattedMinutes}</TimerTime>
          <TimerTime phaseName={phasesQueue[currentPhase]} isRunning={isRunning}>{formattedSeconds}</TimerTime>
        </TimerWrapper>

        <ButtonsWrapper>
          <SecondaryButton phaseName={phasesQueue[currentPhase]} icon={menu_icon} alt="Open menu" aria="Menu" onClick={() => null} />
          <StartPauseButton phaseName={phasesQueue[currentPhase]} isRunning={isRunning} toggleTimer={toggleTimer} />
          <SecondaryButton phaseName={phasesQueue[currentPhase]} icon={skip_icon} alt="Skip to the next phase" aria="Skip" onClick={changeToTheNextPhase} />
        </ButtonsWrapper>

      </MainWrapper>

    </ThemeProvider>
  );
}

export default App;
