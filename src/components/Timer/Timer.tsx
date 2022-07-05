import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
`;

interface TimeProps {
  isRunning: boolean;
  phaseName: string;
}
const Time = styled.h1<TimeProps>`
  line-height: 85%;

  font-size: ${props => props.theme.font.size.timer};
  font-weight: ${props => (props.isRunning ? 800 : 200)};

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
  isRunning: boolean;
  currentTime: number[];
};

const Timer = ({ phaseName, isRunning, currentTime }:Props ) => {

  const formattedMinutes = currentTime[0] < 10 ? `0${currentTime[0]}` : currentTime[0].toString();
  const formattedSeconds = currentTime[1] < 10 ? `0${currentTime[1]}` : currentTime[1].toString();

  return (
    <Wrapper>
      <Time phaseName={phaseName} isRunning={isRunning}>{formattedMinutes}</Time>
      <Time phaseName={phaseName} isRunning={isRunning}>{formattedSeconds}</Time>
    </Wrapper>
  );
}

export default Timer;
