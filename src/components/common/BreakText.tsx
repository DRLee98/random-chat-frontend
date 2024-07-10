import styled from 'styled-components/native';

import type {TextStyle} from 'react-native';

interface BreakTextProps {
  text: string;
  style?: TextStyle;
  justify?: 'center' | 'flex-start' | 'flex-end';
}

const BreakText = ({text, style, justify}: BreakTextProps) => {
  return (
    <Container justify={justify}>
      {text.split(' ').map((t, i) => (
        <Text key={`text-${i}`} style={style}>
          {t}
        </Text>
      ))}
    </Container>
  );
};

const Container = styled.View<Pick<BreakTextProps, 'justify'>>`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: ${({justify}) => justify || 'center'};
  column-gap: 4px;
`;

const Text = styled.Text``;

export default BreakText;
