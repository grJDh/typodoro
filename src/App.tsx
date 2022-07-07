import { useState, useEffect } from "react";

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

  const getValueFromLocalStorage = (key:string, defaultValue:any) => {
    const localItemValue = localStorage.getItem(key);

    if (localItemValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } else {
      return JSON.parse(localItemValue);
    }
  }

  const updateValueInLocalStorage = (key:string, newValue:any) => localStorage.setItem(key, JSON.stringify(newValue));

  const [numberOfPomodoros, setNumberOfPomodoros] = useState(getValueFromLocalStorage('numberOfPomodoros', 4));
  let tempArray = [];
  for (let index = 0; index < numberOfPomodoros; index++) {
    tempArray.push('focus', 'short');
  }
  const phasesQueue = [...tempArray.splice(0, tempArray.length-1), 'long'];

  // const [focusTime, setFocusTime] = useState([0, 3]); //minutues, seconds
  // const [shortBreakTime, setShortBreakTime] = useState([0, 2]);
  // const [longBreakTime, setLongBreakTime] = useState([0, 5]);

  const [focusTime, setFocusTime] = useState(getValueFromLocalStorage('focusTime', [25, 0])); //minutues, seconds
  const [shortBreakTime, setShortBreakTime] = useState(getValueFromLocalStorage('shortBreakTime', [5, 0]));
  const [longBreakTime, setLongBreakTime] = useState(getValueFromLocalStorage('longBreakTime', [25, 0]));

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(focusTime);
  const [currentPhase, setCurrentPhase] = useState(0);

  const [settingsOpened, setSettingsOpened] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getValueFromLocalStorage('isDarkMode', true));
  const [isAutoResume, setIsAutoResume] = useState(getValueFromLocalStorage('isAutoResume', false));
  const [isSoundOn, setIsSoundOn] = useState(getValueFromLocalStorage('isSoundOn', false));
  const [areNotificationsOn, setAreNotificationsOn] = useState(getValueFromLocalStorage('areNotificationsOn', false));
  
  const toggleTimer = () => setIsRunning(!isRunning);

  const changeToTheNextPhase = () => {
    const nextPhase = (currentPhase === phasesQueue.length-1) ? 0 : currentPhase + 1;
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

  useEffect(() => {
    if (isRunning) {
      let timerOneSecondInterval = setInterval(() => {
    
        if (currentTime[1] === 0) {
          if (currentTime[0] !== 0) {
            setCurrentTime([currentTime[0] - 1, 59]);
          } else {
            if (isRunning && !isAutoResume) toggleTimer();
            changeToTheNextPhase();
          }
        } else {
          setCurrentTime([currentTime[0], currentTime[1] - 1]);
        }
      }, 1000);

      return () => clearInterval(timerOneSecondInterval);
    }
  });

  const openSettings = () => setSettingsOpened(true);
  const closeSettings = () => setSettingsOpened(false);

  const toggleDarkMode = (checked:boolean) => {
    setIsDarkMode(checked);
    updateValueInLocalStorage('isDarkMode', checked);
  }
  const toggleAutoResume = (checked:boolean) => {
    setIsAutoResume(checked);
    updateValueInLocalStorage('isAutoResume', checked);
  } 
  const toggleSound = (checked:boolean) => {
    setIsSoundOn(checked);
    updateValueInLocalStorage('isSoundOn', checked);
  } 
  const toggleNotifications = (checked:boolean) => {
    setAreNotificationsOn(checked);
    updateValueInLocalStorage('areNotificationsOn', checked);
  } 

  const onSetNumberOfPomodoros = (num:number) => {
    setNumberOfPomodoros(num);
    updateValueInLocalStorage('numberOfPomodoros', num);
  } 
  const onSetFocusTime = (num:number) => {
    setFocusTime([num, 0]);
    updateValueInLocalStorage('focusTime', [num, 0]);
    if (phasesQueue[currentPhase] === 'focus') setCurrentTime([num, 0]);
  } 
  const onSetShortBreakTime = (num:number) => {
    setShortBreakTime([num, 0]);
    updateValueInLocalStorage('shortBreakTime', [num, 0]);
    if (phasesQueue[currentPhase] === 'short') setCurrentTime([num, 0]);
  } 
  const onSetLongBreakTime = (num:number) => {
    setLongBreakTime([num, 0]);
    updateValueInLocalStorage('longBreakTime', [num, 0]);
    if (phasesQueue[currentPhase] === 'long') setCurrentTime([num, 0]);
  }
  
  const settingsStateBoolean = [
    settingsOpened, 
    isDarkMode, 
    isAutoResume, 
    isSoundOn, 
    areNotificationsOn, 
  ];
  const settingsStateNumbers = [
    focusTime[0], 
    numberOfPomodoros,
    shortBreakTime[0], 
    longBreakTime[0], 
  ];
  const settingsHandlersBoolean = [
    toggleDarkMode, 
    toggleAutoResume, 
    toggleSound, 
    toggleNotifications, 
  ];
  const settingsHandlersNumbers = [
    onSetFocusTime,
    onSetNumberOfPomodoros, 
    onSetShortBreakTime, 
    onSetLongBreakTime,
  ];

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
            onClick={changeToTheNextPhase}
          />
        </ButtonsWrapper>

      </MainWrapper>

    </ThemeProvider>
  );
}

export default App;