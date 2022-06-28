import styled from 'styled-components';

import starticon from './start.svg';
import pauseicon from './pause.svg';

const Wrapper = styled.button`
  width: 128px;
  height: 96px;
  border: 0;
  border-radius: 32px;
  background-color: ${props => props.theme.color.redAlpha700};
  cursor: pointer;

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

type Props = {
  isRunning: boolean;
  toggleTimer: () => void;
};

const StartPauseButton = ({ isRunning=false, toggleTimer }:Props ) => {

  return (
    <Wrapper onClick={toggleTimer} aria-label='Start/Pause'>
      <Icon src={isRunning ? pauseicon : starticon} alt={isRunning ? 'Pause' : 'Start'} />
    </Wrapper>
  );
}

export default StartPauseButton;
