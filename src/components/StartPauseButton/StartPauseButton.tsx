import styled from "styled-components";

import starticon from "./start.svg";
import pauseicon from "./pause.svg";

interface WrapperProps {
  phaseName: string;
}
const Wrapper = styled.button<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 128px;
  height: 96px;
  border: 0;
  border-radius: 32px;

  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          background-color: ${props.theme.color.greenAlpha700};
        `;
      case "long":
        return `
          background-color: ${props.theme.color.blueAlpha700};
        `;
      default:
        return `
          background-color: ${props.theme.color.redAlpha700};
        `;
    }
  }};
`;

interface IconProps {
  phaseName: string;
  src: string;
  title: string;
  alt: string;
}
const Icon = styled.svg<IconProps>`
  width: 32px;
  height: 32px;
  mask: ${props => `url(${props.src}) no-repeat center`};
  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          background-color: ${props.theme.color.green50};
        `;
      case "long":
        return `
          background-color: ${props.theme.color.blue50};
        `;
      default:
        return `
          background-color: ${props.theme.color.red50};
        `;
    }
  }};
`;

type Props = {
  phaseName: string;
  isRunning: boolean;
  toggleTimer: () => void;
};

const StartPauseButton = ({ phaseName, isRunning, toggleTimer }: Props) => {
  return (
    <Wrapper phaseName={phaseName} onClick={toggleTimer} aria-label="Start/Pause">
      <Icon
        phaseName={phaseName}
        src={isRunning ? pauseicon : starticon}
        title={isRunning ? "Pause icon" : "Start icon"}
        alt={isRunning ? "Pause" : "Start"}
      />
    </Wrapper>
  );
};

export default StartPauseButton;
