import {useState} from 'react';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';
import CustomInput from './CustomInput';

import type {TextInputProps} from 'react-native';

interface BorderInputProps extends TextInputProps {
  right?: React.ReactNode;
  left?: React.ReactNode;
}

const BorderInput = ({right, left, ...props}: BorderInputProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <Container
      style={{
        borderColor: focused ? theme.primary.default : theme.gray200.default,
      }}>
      {left}
      <CustomInput {...props} onFocus={onFocus} onBlur={onBlur} />
      {right}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;

  background-color: ${({theme}) => theme.gray700.default};
  border: 1px solid ${({theme}) => theme.gray200.default};
  border-radius: 25px;
`;

export default BorderInput;
