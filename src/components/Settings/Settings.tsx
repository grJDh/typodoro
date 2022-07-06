import styled from 'styled-components';

import close_icon from './close.svg';

import ToggleInput from '../ToggleInput/ToggleInput';
import NumInput from '../NumInput/NumInput';

interface WrapperProps {
  isOpened: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 10;

  display: ${props => (props.isOpened ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(255,255,255,0.15);
`;

interface WindowProps {
  phaseName: string;
}
const Window = styled.dialog<WindowProps>`
  width: 448px;
  height: 610px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border: 0;
  border-radius: 24px;

  padding: 24px;
  box-sizing: border-box;

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

const Header = styled.div`
  width: 100%;
  height: 77px;
  display: flex;
  justify-content: space-between;
  align-items: top;

  box-sizing: border-box;
  padding-top: 5px;
`;

interface TitleProps {
  phaseName: string;
}
const Title = styled.h1<TitleProps>`
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

const CloseButton = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  border: 0;

  background-color: rgba(0,0,0,0);
`;

interface CloseIconProps {
  phaseName: string;
  src: string;
  title: string;
  alt: string;
}
const CloseIcon = styled.svg<CloseIconProps>`
  width: 18px;
  height: 18px;
  mask: ${props => `url(${props.src}) no-repeat center`};
  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          background-color: ${props.theme.color.green50};
        `
      case "long":
        return `
          background-color: ${props.theme.color.blue50};
        `
      default:
        return `
          background-color: ${props.theme.color.red50};
        `
    }
  }};
`;

type Props = {
  phaseName: string;
  onClose: () => void;
  settingsStateBoolean: boolean[];
  settingsStateNumbers: number[][];
  settingsHandlersBoolean: ((data: boolean) => void)[];
  settingsHandlersNumbers: ((data: number[]) => void)[];
  numberOfPomodoros: number;
  setNumberOfPomodoros: (data: number) => void;
};

const Settings = ({
  phaseName,
  onClose,
  settingsStateBoolean,
  settingsStateNumbers,
  settingsHandlersBoolean,
  settingsHandlersNumbers,
  numberOfPomodoros,
  setNumberOfPomodoros
}:Props ) => {

  const [settingsOpened, isDarkMode, isAutoResume, isSoundOn, areNotificationsOn] = settingsStateBoolean;
  const [setIsDarkMode, setIsAutoResume, setIsSoundOn, setAreNotificationsOn] = settingsHandlersBoolean;
  const [focusTime, shortBreakTime, longBreakTime] = settingsStateNumbers;
  const [setFocusTime, setShortBreakTime, setLongBreakTime] = settingsHandlersNumbers;

  const toggleDarkMode = (checked:boolean) => setIsDarkMode(checked);
  const toggleAutoResume = (checked:boolean) => setIsAutoResume(checked);
  const toggleSound = (checked:boolean) => setIsSoundOn(checked);
  const toggleNotifications = (checked:boolean) => setAreNotificationsOn(checked);

  const onSetFocusTime = (num:number) => setFocusTime([num, 0]);
  const onSetNumberOfPomodoros = (num:number) => setNumberOfPomodoros(num);
  const onSetShortBreakTime = (num:number) => setShortBreakTime([num, 0]);
  const onSetLongBreakTime = (num:number) => setLongBreakTime([num, 0]);

  const closeOnClickOutside = (parentElement:any) => (parentElement.id === "root") && onClose();

  return (
    <Wrapper isOpened={settingsOpened} onClick={(event) => closeOnClickOutside((event.target as HTMLTextAreaElement).parentElement)}>
      <Window phaseName={phaseName}>
        <Header>
          <Title phaseName={phaseName}>Settings</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon
              phaseName={phaseName}
              src={close_icon}
              title={'Close icon'}
              alt={'Close'}
            />
          </CloseButton>
        </Header>
        <ToggleInput
          phaseName={phaseName}
          labelText="Dark mode" 
          onChange={toggleDarkMode}
          defaultValue={isDarkMode}
        />
        <NumInput
          phaseName={phaseName}
          labelText="Focus length"
          defaultValue={focusTime[0]}
          onChange={onSetFocusTime}
        />
        <NumInput
          phaseName={phaseName}
          labelText="Pomodoros until long break"
          defaultValue={numberOfPomodoros}
          onChange={onSetNumberOfPomodoros}
        />
        <NumInput
          phaseName={phaseName}
          labelText="Short break length"
          defaultValue={shortBreakTime[0]}
          onChange={onSetShortBreakTime}
        />
        <NumInput
          phaseName={phaseName}
          labelText="Long break length"
          defaultValue={longBreakTime[0]}
          onChange={onSetLongBreakTime}
        />
        <ToggleInput
          phaseName={phaseName}
          labelText="Auto resume timer"
          onChange={toggleAutoResume}
          defaultValue={isAutoResume}
        />
        <ToggleInput
          phaseName={phaseName}
          labelText="Sound"
          onChange={toggleSound}
          defaultValue={isSoundOn}
        />
        <ToggleInput
          phaseName={phaseName}
          labelText="Notifications"
          onChange={toggleNotifications}
          defaultValue={areNotificationsOn}
        />
      </Window>
    </Wrapper>
  );
}

export default Settings;