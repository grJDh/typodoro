import styled from 'styled-components';

// interface WrapperProps {
//   phaseName: string;
// }
const Wrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 64px;
`;

const Toggle = styled.input`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin: 0;
  vertical-align: center;
  background: ${props => (props.theme.color.red950)}; 
  border: 1px solid ${props => (props.theme.color.red50)};
  border-radius: 1000px;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);

  &:after {
    content: "";

    display: inline-block;
    position: absolute;
    left: 2px;
    top: 1px;

    width: 16px;
    height: 16px;
    background-color: ${props => (props.theme.color.red50)};
    border-radius: 1000px;

    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }

  &:checked:after {
    transform: translateX(calc(100% - 2px));
    background-color: ${props => (props.theme.color.red950)};
  }
  &:checked {
    background-color: ${props => (props.theme.color.red50)};
  }
`;

  /* ${props => {
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
  }}; */


type Props = {
  phaseName: string;
  label: string;
  func: () => void;
};

const StartPauseButton = ({ phaseName, label, func }:Props ) => {

  return (
    <Wrapper>
      <p>{label}</p>
      <Toggle type="checkbox"></Toggle>
    </Wrapper>
  );
}

export default StartPauseButton;
