import {useEffect, useState} from 'react';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Animated from 'react-native-reanimated';

import {withTiming} from 'react-native-reanimated';

import type {LayoutChangeEvent} from 'react-native';

interface SwitchProps {
  value?: boolean;
  onValueChange: (value: boolean) => void;
}

const Switch = ({value, onValueChange}: SwitchProps) => {
  const theme = useTheme();

  const [maxWidth, setMaxWidth] = useState(0);

  const offset = useSharedValue(0);
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      value ? theme.primary.accessible : theme.gray400.default,
    ),
  }));
  const transformStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(offset.value)}],
  }));

  const onPressFn = () => {
    onValueChange(!value);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    const circleWidth = height - 8;
    setMaxWidth(width - circleWidth - 8);
  };

  useEffect(() => {
    if (value) {
      offset.value = maxWidth;
    } else {
      offset.value = 0;
    }
  }, [value, maxWidth]);

  return (
    <Button activeOpacity={1} onPress={onPressFn}>
      <Container style={backgroundColorStyle} onLayout={onLayout}>
        <Circle style={transformStyle} />
      </Container>
    </Button>
  );
};

const Button = styled.TouchableOpacity``;

const Container = styled(Animated.View)`
  width: 55px;
  height: 35px;

  padding: 4px;

  border-radius: 999px;
`;

const Circle = styled(Animated.View)`
  height: 100%;
  aspect-ratio: 1;

  background-color: ${({theme}) => theme.bgColor};
  border-radius: 999px;
`;

export default Switch;
