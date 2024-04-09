import {useState} from 'react';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';
import CustomInput from './CustomInput';

import type {TextInputProps} from 'react-native';

interface UnderlineInputProps extends TextInputProps {}

const UnderlineInput = ({...props}: UnderlineInputProps) => {
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
        borderColor: focused ? theme.orange.default : theme.gray200.default,
      }}>
      <CustomInput {...props} onFocus={onFocus} onBlur={onBlur} />
      {props.maxLength && (
        <Length>
          {props.value?.length ?? 0}/{props.maxLength}
        </Length>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;

  padding: 5px;

  border-style: solid;
  border-bottom-width: 1px;
`;

const Length = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray200.default};
`;

export default UnderlineInput;
