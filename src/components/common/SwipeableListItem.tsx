import {useRef} from 'react';

import styled from 'styled-components/native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import type {LayoutChangeEvent} from 'react-native';
import type {
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

interface SwipeableListItemProps {
  children: React.ReactNode;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

const SwipeableListItem = ({
  children,
  leftActions,
  rightActions,
}: SwipeableListItemProps) => {
  const leftWidth = useRef(0);
  const rightWidth = useRef(0);

  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const onLayout = (
    e: LayoutChangeEvent,
    ref: React.MutableRefObject<number>,
  ) => {
    ref.current = e.nativeEvent.layout.width;
  };

  const onTouchEnd = () => {
    offset.value = withTiming(0);
  };

  const onPanChange = ({
    changeX,
  }: GestureUpdateEvent<
    PanGestureHandlerEventPayload & PanGestureChangeEventPayload
  >) => {
    const updateValue = offset.value + changeX;
    if (updateValue > 1) {
      if (updateValue >= leftWidth.current) {
        return leftWidth.current;
      }
    } else {
      if (updateValue <= -rightWidth.current) {
        return -rightWidth.current;
      }
    }
    return updateValue;
  };

  const onPanEnd = ({
    translationX,
  }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (leftWidth.current > 0 && offset.value >= 0) {
      if (translationX > 0 && offset.value < leftWidth.current) {
        if (translationX > 30) return leftWidth.current;
        return 0;
      }
      if (translationX < -30) return 0;
      return leftWidth.current;
    }
    if (rightWidth.current > 0 && offset.value <= 0) {
      if (translationX < 0 && offset.value > -rightWidth.current) {
        if (translationX < -30) return -rightWidth.current;
        return 0;
      }
      if (translationX > 30) return 0;
      return -rightWidth.current;
    }
    return offset.value;
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange(e => {
      offset.value = onPanChange(e);
    })
    .onEnd(e => {
      offset.value = withTiming(onPanEnd(e));
    })
    .runOnJS(true);

  return (
    <Container>
      {leftActions && (
        <Actions
          direction="left"
          onTouchEnd={onTouchEnd}
          onLayout={e => onLayout(e, leftWidth)}>
          {leftActions}
        </Actions>
      )}
      <GestureDetector gesture={pan}>
        <Animated.View style={[style, {zIndex: 1}]}>{children}</Animated.View>
      </GestureDetector>
      {rightActions && (
        <Actions
          direction="right"
          onTouchEnd={onTouchEnd}
          onLayout={e => onLayout(e, rightWidth)}>
          {rightActions}
        </Actions>
      )}
    </Container>
  );
};

const Container = styled.View`
  position: relative;
`;

interface ActionsProps {
  direction: 'left' | 'right';
}

const Actions = styled.View<ActionsProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({direction}) => (direction === 'left' ? 'left: 0;' : 'right: 0;')}

  z-index: 0;
`;

export default SwipeableListItem;
