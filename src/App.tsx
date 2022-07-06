import { useState, useEffect, useCallback } from "react";

import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import theme from './theme';

import Timer from './components/Timer/Timer';
import Settings from './components/Settings/Settings';
import Phase from './components/Phase/Phase';
import StartPauseButton from './components/StartPauseButton/StartPauseButton';
import SecondaryButton from "./components/SecondaryButton/SecondaryButton";

import skip_icon from './components/SecondaryButton/skip.svg';
import settings_icon from './components/SecondaryButton/gear.svg';

interface MainWrapperProps {
  phaseName: string;
}
const MainWrapper = styled.main<MainWrapperProps>`
  height: 100%;
  display: flex;
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

const ButtonsWrapper = styled.div`
  width: 320px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//fix timer with Date()
//fix skip button
//when you change focus or any other time, it doesn't change current time even if it's start

const App = () => {
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(4);
  let tempArray = [];
  for (let index = 0; index < numberOfPomodoros; index++) {
    tempArray.push('focus', 'short');
  }
  const phasesQueue = [...tempArray.splice(0, tempArray.length-1), 'long'];

  // const [focusTime, setFocusTime] = useState([0, 3]); //minutues, seconds
  // const [shortBreakTime, setShortBreakTime] = useState([0, 2]);
  // const [longBreakTime, setLongBreakTime] = useState([0, 5]);

  const [focusTime, setFocusTime] = useState([25, 0]); //minutues, seconds
  const [shortBreakTime, setShortBreakTime] = useState([5, 0]);
  const [longBreakTime, setLongBreakTime] = useState([25, 0]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(focusTime);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [frozenTime, setFrozenTime] = useState(focusTime);
  const [frozenPhase, setFrozenPhase] = useState(0);

  const [settingsOpened, setSettingsOpened] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAutoResume, setIsAutoResume] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [areNotificationsOn, setAreNotificationsOn] = useState(false);

  console.log(focusTime)

  const settingsStateBoolean = [
    settingsOpened, 
    isDarkMode, 
    isAutoResume, 
    isSoundOn, 
    areNotificationsOn, 
  ];
  const settingsStateNumbers = [
    focusTime, 
    shortBreakTime, 
    longBreakTime, 
  ];
  const settingsHandlersBoolean = [
    setIsDarkMode, 
    setIsAutoResume, 
    setIsSoundOn, 
    setAreNotificationsOn, 
  ];
  const settingsHandlersNumbers = [
    setFocusTime,
    setShortBreakTime, 
    setLongBreakTime, 
  ];
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);

    if (isRunning) {
      setFrozenTime(currentTime);
      setFrozenPhase(currentPhase);
    }
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
  };

  const skipPhase = () => {
    if (isRunning) setIsRunning(false);

    changeToTheNextPhase();

    setFrozenTime(currentTime);
    setFrozenPhase(currentPhase);
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
    }
    else {
      setCurrentTime(frozenTime);
      setCurrentPhase(frozenPhase);
    }
  });

  const openSettings = () => setSettingsOpened(true);
  const closeSettings = () => setSettingsOpened(false);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />

      <Settings
        phaseName={phasesQueue[currentPhase]}
        onClose={closeSettings}
        settingsStateBoolean={settingsStateBoolean}
        settingsStateNumbers={settingsStateNumbers}
        settingsHandlersBoolean={settingsHandlersBoolean}
        settingsHandlersNumbers={settingsHandlersNumbers}
        numberOfPomodoros={numberOfPomodoros}
        setNumberOfPomodoros={setNumberOfPomodoros}
      />

      <MainWrapper
        phaseName={phasesQueue[currentPhase]}
        data-testid="MainWrapper"
      >

        <Phase
          phaseName={phasesQueue[currentPhase]}
        />

        <Timer
          phaseName={phasesQueue[currentPhase]}
          isRunning={isRunning}
          currentTime={currentTime}
        />

        <ButtonsWrapper>
          <SecondaryButton
            phaseName={phasesQueue[currentPhase]}
            icon={settings_icon}
            alt="Open settings"
            aria="Settings"
            onClick={openSettings}
          />
          <StartPauseButton
            phaseName={phasesQueue[currentPhase]}
            isRunning={isRunning}
            toggleTimer={toggleTimer}
          />
          <SecondaryButton
            phaseName={phasesQueue[currentPhase]}
            icon={skip_icon}
            alt="Skip to the next phase"
            aria="Skip"
            onClick={skipPhase}
          />
        </ButtonsWrapper>

      </MainWrapper>

    </ThemeProvider>
  );
}

export default App;