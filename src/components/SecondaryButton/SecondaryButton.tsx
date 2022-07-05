import styled from 'styled-components';

interface WrapperProps {
  phaseName: string;
}
const Wrapper = styled.button<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  
  width: 80px;
  height: 80px;
  border: 0;
  border-radius: 24px;

  ${props => {
    switch (props.phaseName) {
      case "short":
        return `
          background-color: ${props.theme.color.greenAlpha100};
        `
      case "long":
        return `
          background-color: ${props.theme.color.blueAlpha100};
        `
      default:
        return `
          background-color: ${props.theme.color.redAlpha100};
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

type Props = {
  phaseName: string;
  icon: string;
  alt: string;
  aria: string;
  onClick: () => void;
};

const SecondaryButton = ({ phaseName, icon, alt, aria, onClick }: Props) => {

  return (
    <Wrapper phaseName={phaseName} aria-label={aria} onClick={onClick}>
      <Icon phaseName={phaseName} src={icon} alt={alt} title={aria + " icon"} />
    </Wrapper>
  );
}

export default SecondaryButton;
