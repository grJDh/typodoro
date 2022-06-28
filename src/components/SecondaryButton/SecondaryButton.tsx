import styled from 'styled-components';

import skipicon from './skip.svg';
import dotsicon from './dots.svg';

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background-color: ${props => props.theme.color.redAlpha100};

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
  icon: string;
};

const SecondaryButton = ({ icon='skip' }: Props) => {

  return (
    <Wrapper>
      <Icon src={(icon === "dots") ? dotsicon : skipicon} alt='Skip to the next phase' />
    </Wrapper>
  );
}

export default SecondaryButton;
