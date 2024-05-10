import {useState} from 'react';

import styled from 'styled-components/native';

import type {TouchableOpacityProps, GestureResponderEvent} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {}

const Button = ({children, ...props}: ButtonProps) => {
  const [press, setPress] = useState(false);

  const onPressIn = (e: GestureResponderEvent) => {
    setPress(true);
    props.onPressIn?.(e);
  };

  const onPressOut = (e: GestureResponderEvent) => {
    setPress(false);
    props.onPressOut?.(e);
  };

  return (
    <Container
      {...props}
      press={press}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}>
      {children}
    </Container>
  );
};

interface ContainerProps {
  press: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  justify-content: center;

  background-color: ${({press, theme, disabled}) =>
    disabled
      ? theme.gray300.default
      : theme.primary[press ? 'accessible' : 'default']};
`;

export default Button;
