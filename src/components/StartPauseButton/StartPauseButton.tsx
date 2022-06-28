import styled from 'styled-components';

import starticon from './start.svg'

const Wrapper = styled.div`
  width: 128px;
  height: 96px;
  /* border: 2px solid #FFF2F2; */
  border-radius: 32px;
  background-color: ${props => props.theme.color.redAlpha700};
  /* border-color: ${props => props.theme.color.red50}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  /* background-color: ${props => props.theme.color.red50}; */
  /* -webkit-mask: url(ph_brain-fill.svg) no-repeat center;
  mask: url(ph_brain-fill.svg) no-repeat center; */
  /* margin-left: 4px; */
`;

const StartPauseButton = ({ isEnabled=false }) => {

  return (
    <Wrapper>
      <Icon src={starticon} alt={isEnabled ? 'Pause' : 'Start'} />
    </Wrapper>
  );
}

export default StartPauseButton;
