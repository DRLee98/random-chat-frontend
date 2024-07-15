import styled from 'styled-components/native';

import type {TextStyle} from 'react-native';

interface BreakTextProps {
  text: string;
  style?: TextStyle;
  justify?: 'center' | 'flex-start' | 'flex-end';
}

const BreakText = ({text, style, justify}: BreakTextProps) => {
  return (
    <Container>
      {text.split('\n').map((rowText, i) => (
        <Row key={`row-${i}`} justify={justify}>
          {rowText.split(' ').map((t, j) => (
            <Text key={`text-${j}`} style={style}>
              {t}
            </Text>
          ))}
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  column-gap: 4px;
`;

const Row = styled.View<Pick<BreakTextProps, 'justify'>>`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: ${({justify}) => justify || 'center'};
  column-gap: 4px;
`;

const Text = styled.Text``;

export default BreakText;
