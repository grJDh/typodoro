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

  background-color: rgba(255,255,255,0.25);
`;

interface WindowProps {
  phaseName: string;
}
const Window = styled.dialog<WindowProps>`
  width: 448px;
  height: 610px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  isOpened: boolean;
};

const Settings = ({ phaseName, onClose, isOpened }:Props ) => {

  return (
    <Wrapper isOpened={isOpened}>
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
        <ToggleInput phaseName={phaseName} labelText="Dark mode" func={() => null} />
        <NumInput phaseName={phaseName} labelText="Focus length" func={() => null} />
        <ToggleInput phaseName={phaseName} labelText="Auto resume timer" func={() => null} />
        <ToggleInput phaseName={phaseName} labelText="Sound" func={() => null} />
        <ToggleInput phaseName={phaseName} labelText="Notifications" func={() => null} />
      </Window>
    </Wrapper>
  );
}

export default Settings;