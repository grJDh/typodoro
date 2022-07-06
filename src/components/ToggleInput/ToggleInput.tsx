import styled from 'styled-components';

import theme from '../../theme';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 64px;
`;

const returnColor950 = (phaseName:string) => {
  switch (phaseName) {
    case "short":
      return theme.color.green950;
    case "long":
      return theme.color.blue950;
    default:
      return theme.color.red950;
  }
}
const returnColor50 = (phaseName:string) => {
  switch (phaseName) {
    case "short":
      return theme.color.green50;
    case "long":
      return theme.color.blue50;
    default:
      return theme.color.red50;
  }
}

interface LabelProps {
  phaseName: string;
}
const Label = styled.label<LabelProps>`
  color: ${props => (returnColor50(props.phaseName))};
`;

interface ToggleProps {
  phaseName: string;
}
const Toggle = styled.input<ToggleProps>`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin: 0;
  vertical-align: center;
  background-color: ${props => (props.theme.color.whiteAlpha200)};
  border: 1px solid transparent;
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
    background-color: ${props => (returnColor950(props.phaseName))};
    border-radius: 1000px;

    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }

  &:checked:after {
    transform: translateX(calc(100% - 2px));
    background-color: ${props => (returnColor950(props.phaseName))};
  }
  &:checked {
    background-color: ${props => (returnColor50(props.phaseName))};
  }
`;


type Props = {
  phaseName: string;
  labelText: string;
  func: () => void;
};

const ToggleInput = ({ phaseName, labelText, func }:Props ) => {

  return (
    <Wrapper>
      <Label htmlFor={labelText} phaseName={phaseName}>{labelText}</Label>
      <Toggle id={labelText} type="checkbox" phaseName={phaseName}></Toggle>
    </Wrapper>
  );
}

export default ToggleInput;
