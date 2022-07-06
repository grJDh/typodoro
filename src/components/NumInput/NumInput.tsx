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

  color: ${props => (props.theme.color.red50)};

  text-align: center;
`;

interface ChangeNumButtonProps {
  isDown: boolean;
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
  color: white;

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
    /* background-color: #212121; */
    transform: translate(-50%, -50%);
  }
`;

type Props = {
  phaseName: string;
  labelText: string;
  defaultValue:number;
  onChange: (num:number) => void;
};

const NumInput = ({ phaseName, labelText, defaultValue, onChange }:Props ) => {

  return (
    <Wrapper>
      <Label htmlFor={labelText} phaseName={phaseName}>{labelText}</Label>
      <ArrowsWrapper>
        <Input
          type="number"
          id={labelText}
          phaseName={phaseName}
          defaultValue={defaultValue}
          onChange={event => onChange(parseInt(event.target.value))}
        />
        <ChangeNumButton isDown={false}>⏶</ChangeNumButton>
        <ChangeNumButton isDown={true}>⏷</ChangeNumButton>
      </ArrowsWrapper>
    </Wrapper>
  );
}

export default NumInput;
