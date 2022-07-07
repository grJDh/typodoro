import styled from 'styled-components';

import theme from '../../theme';

const Wrapper = styled.label`
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

const ArrowsWrapper = styled.div`
  border: 1px solid ${props => (props.theme.color.whiteAlpha100)};
  border-radius: 8px;
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  width: 96px;
  height: 40px;
`;

interface InputProps {
  phaseName: string;
}
const Input = styled.input<InputProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 66px;
  height: 37px;

  border: 0;
  border-right: 1px solid ${props => (props.theme.color.whiteAlpha100)};
  border-radius: 8px 0 0 8px;
  padding: 0;

  background-color: ${props => (returnColor950(props.phaseName))};

  color: ${props => (returnColor50(props.phaseName))};

  text-align: center;
`;

interface ChangeNumButtonProps {
  isDown: boolean;
  phaseName: string;
}
const ChangeNumButton = styled.button<ChangeNumButtonProps>`
  outline:none;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  width: 29px;
  cursor: pointer;
  margin: 0;
  position: absolute;
  padding:0;
  color: ${props => (returnColor50(props.phaseName))};

  right: -1px;

  ${props => {
    if (props.isDown) {
      return `
        bottom: 0;
        border-top: 1px solid ${props.theme.color.whiteAlpha100};
      `
    }
  }};

  &:after,
  &:before {
    display: inline-block;
    position: absolute;
    content: '';
    width: 1rem;
    height: 2px;
    transform: translate(-50%, -50%);
  }

  /* &:hover {
    background-color: ${props => (props.theme.color.whiteAlpha100)};
  } */

  &:active {
    background-color: ${props => (returnColor50(props.phaseName))};
    color: ${props => (returnColor950(props.phaseName))};
  }
`;

type Props = {
  phaseName: string;
  labelText: string;
  value:number;
  onChange: (num:number) => void;
};

const NumInput = ({ phaseName, labelText, value, onChange }:Props ) => {

  const increaseValue = () => {
    onChange(value + 1);
  } 
  const decreaseValue = () => {
    if (value > 1) onChange(value - 1);
  } 

  return (
    <Wrapper>
      <Label htmlFor={labelText} phaseName={phaseName}>{labelText}</Label>
      <ArrowsWrapper>
        <Input
          type="number"
          id={labelText}
          phaseName={phaseName}
          value={value}
          onChange={event => onChange(parseInt(event.target.value))}
          min={1}
        />
        <ChangeNumButton isDown={false} onClick={increaseValue} phaseName={phaseName}>⏶</ChangeNumButton>
        <ChangeNumButton isDown={true} onClick={decreaseValue} phaseName={phaseName}>⏷</ChangeNumButton>
      </ArrowsWrapper>
    </Wrapper>
  );
}

export default NumInput;
