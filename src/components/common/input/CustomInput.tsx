import {useEffect, useState} from 'react';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';

import type {TextInputProps} from 'react-native';

interface CustomInputProps extends TextInputProps {}

const CustomInput = (props: CustomInputProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(props.value ?? props.defaultValue);

  const onChangeText = (text: string) => {
    setValue(text);
    props.onChangeText?.(text);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Container>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.gray300.default}
      />
      {value && (
        <ClearButton onPress={() => setValue('')}>
          <Icon name="close-circle" size={16} color={theme.gray300.default} />
        </ClearButton>
      )}
    </Container>
  );
};

const Container = styled.View`
  position: relative;

  flex: 1;
  flex-direction: row;
  align-items: center;

  margin: 0 6px;
`;

const TextInput = styled.TextInput<CustomInputProps>`
  flex: 1;

  padding: 0 5px;

  font-size: 16px;
  color: ${({theme}) => theme.fontColor};

  ${({textAlign, value}) => {
    if (!value) return;
    switch (textAlign) {
      case 'center':
        return 'padding: 0 18px';
      default:
        return 'padding-right: 18px';
    }
  }};
`;

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

export default CustomInput;
