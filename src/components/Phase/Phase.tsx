import styled from 'styled-components';

import brainicon from './ph_brain-fill.svg'

const Wrapper = styled.div`
  width: 136px;
  height: 48px;
  border: 2px solid #FFF2F2;
  border-radius: 9999px;
  background-color: ${props => props.theme.color.redAlpha100};
  border-color: ${props => props.theme.color.red50};

  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 8px 16px 8px 16px;
  box-sizing: border-box; */
`;

const Icon = styled.img`
  /* background-color: ${props => props.theme.color.red50}; */
  /* -webkit-mask: url(ph_brain-fill.svg) no-repeat center;
  mask: url(ph_brain-fill.svg) no-repeat center; */
  margin-right: 8px;
`;

const Phase = ({ phaseName="Focus" }) => {

  return (
    <Wrapper>
      <Icon src={brainicon} alt={`Phase: ${phaseName}`} />
      <h2>{phaseName}</h2>
    </Wrapper>
  );
}

export default Phase;
