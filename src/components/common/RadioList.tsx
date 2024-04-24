import styled from 'styled-components/native';

export interface RadioData {
  label: string;
  value: string;
}

interface RadioListProps {
  data: RadioData[];
  value: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
}

const RadioList = ({
  data,
  value,
  onChange,
  direction = 'horizontal',
}: RadioListProps) => {
  const onPress = (v: string) => {
    onChange(v);
  };

  return (
    <Container horizontal={direction === 'horizontal'}>
      {data.map((item, i) => (
        <RadioBox
          key={`radio-${item.value}-${i}`}
          onPress={() => onPress(item.value)}
          selected={item.value === value}>
          <RadioText selected={item.value === value}>{item.label}</RadioText>
        </RadioBox>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView``;

interface RadioProps {
  selected: boolean;
}

const RadioBox = styled.TouchableOpacity<RadioProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 6px 15px;
  margin-right: 10px;

  border: 1px solid;
  border-radius: 20px;
  border-color: ${({theme, selected}) =>
    selected ? theme.primary.default : theme.gray300.default};
`;

const RadioText = styled.Text<RadioProps>`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme, selected}) =>
    selected ? theme.primary.accessible : theme.fontColor};
`;

export default RadioList;
