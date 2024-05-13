import styled from 'styled-components/native';

import type {TextStyle} from 'react-native';

interface BreakTextProps {
  text: string;
  style?: TextStyle;
}

const BreakText = ({text, style}: BreakTextProps) => {
  return (
    <Container>
      {text.split(' ').map((t, i) => (
        <Text key={`text-${i}`} style={style}>
          {t}
        </Text>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  column-gap: 4px;
`;

const Text = styled.Text``;

export default BreakText;
