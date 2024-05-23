import styled from 'styled-components/native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const BubbleDiceIcon = () => {
  return (
    <Container>
      <StyledIcon color="#fff" name="chatbubble" size={140} />
      <AbsoluteBox>
        <FontAwesome5Icon color="#fff" name="dice" size={60} />
      </AbsoluteBox>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const AbsoluteBox = styled.View`
  position: absolute;
  top: 40px;
`;

const StyledIcon = styled(IoniconsIcon)`
  color: ${({theme}) => theme.primary.default};
`;

export default BubbleDiceIcon;
