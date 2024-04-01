import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface InputProps extends TextInputProps {
  right?: React.ReactNode;
  left?: React.ReactNode;
}

const Input = ({right, left, ...props}: InputProps) => {
  return (
    <Container>
      {left}
      <TextInput {...props} />
      {right}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;

  border: 1px solid ${({theme}) => theme.gray500.default};
  border-radius: 999px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding: 0 10px;

  font-size: 16px;
  color: ${({theme}) => theme.fontColor};
`;

export default Input;
