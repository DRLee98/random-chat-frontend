import {useEffect, useRef} from 'react';

import styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';

import type {ViewStyle} from 'react-native';

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton = (props: SkeletonProps) => {
  const animationValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  }, []);

  return (
    <SkeletonBox {...props} style={[props.style, {opacity: animationValue}]} />
  );
};

const SkeletonBox = styled(Animated.View)<Omit<SkeletonProps, 'style'>>`
  position: relative;

  width: ${({width}) => (width ? `${width}px` : '100%')};
  height: ${({height}) => (height ? `${height}px` : '100%')};
  border-radius: ${({borderRadius}) => `${borderRadius ?? 4}px`};
  background-color: ${({theme}) => theme.gray600.default};

  overflow: hidden;
`;

export default Skeleton;
