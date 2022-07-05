import styled from 'styled-components';

import focus_icon_dark from './focus_dark.svg';
import break_icon_dark from './break_dark.svg';

interface WrapperProps {
  phaseName: string;
}
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 48px;
  border: 2px solid;
  border-radius: 9999px;
  box-sizing: border-box;
  padding-left: 8px;
  padding-right: 8px;

  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          width: 195px;
          background-color: ${props.theme.color.greenAlpha100};
          border-color: ${props.theme.color.green50};
        `
      case "long":
        return `
          width: 190px;
          background-color: ${props.theme.color.blueAlpha100};
          border-color: ${props.theme.color.blue50};
        `
      default:
        return `
          width: 136px;
          background-color: ${props.theme.color.redAlpha100};
          border-color: ${props.theme.color.red50};
        `
    }
  }};
`;

interface IconProps {
  phaseName: string;
  src: string;
  alt: string;
  title: string;
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

interface PhaseTitleProps {
  phaseName: string;
}
const PhaseTitle = styled.h2<PhaseTitleProps>`
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

type Props = {
  phaseName: string;
};

const Phase = ({ phaseName }:Props ) => {

  const returnPhaseName = () => {
    switch (phaseName) {
      case "short":
        return "Short Break";
      case "long":
        return "Long Break";
      default:
        return "Focus";
    }
  }

  const returnPhaseIcon = () => {
    switch (phaseName) {
      case "short":
        return break_icon_dark;
      case "long":
        return break_icon_dark;
      default:
        return focus_icon_dark;
    }
  }

  return (
    <Wrapper phaseName={phaseName} data-testid="PhaseWrapper">
      <Icon phaseName={phaseName} src={returnPhaseIcon()} alt={`Phase: ${returnPhaseName()}`} title={returnPhaseName() + " icon"} />
      <PhaseTitle phaseName={phaseName} >{returnPhaseName()}</PhaseTitle>
    </Wrapper>
  );
}

export default Phase;
