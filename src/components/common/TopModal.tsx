import {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import styled from 'styled-components/native';

import Animated from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {View} from 'react-native';

import {runOnJS, withTiming} from 'react-native-reanimated';

import type {GestureResponderEvent, LayoutChangeEvent} from 'react-native';

interface TopModalProps {
  visible: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
}

const TopModal = ({visible, children, onCloseModal}: TopModalProps) => {
  const [fullHegiht, setFullHeight] = useState(0);
  const [childrenHegiht, setChildrenHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const offset = useSharedValue(-99999);
  const style = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  const onConatinerLayout = (e: LayoutChangeEvent) => {
    setFullHeight(e.nativeEvent.layout.height);
    offset.value = -e.nativeEvent.layout.height;
  };

  const onChildrenLayout = (e: LayoutChangeEvent) => {
    setChildrenHeight(e.nativeEvent.layout.height);
    const viewHeight = fullHegiht - e.nativeEvent.layout.height;
    offset.value = withTiming(-viewHeight);
  };

  const onOverlayPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    onCloseFn();
  };

  const onCloseFn = () => {
    offset.value = withTiming(-fullHegiht, {duration: 300}, finished => {
      if (finished) {
        runOnJS(onCloseModal)();
      }
    });
  };

  const onOpenFn = () => {
    offset.value = withTiming(fullHegiht, {duration: 300});
  };

  const pan = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onChange(e => {
      offset.value += e.changeY;
    })
    .onEnd(e => {
      const viewHeight = fullHegiht - childrenHegiht - insets.top - 22;
      if (viewHeight + 50 < fullHegiht - e.absoluteY) {
        return onCloseFn();
      }
      offset.value = withTiming(-viewHeight);
    })
    .runOnJS(true);

  useEffect(() => {
    if (visible) {
      onOpenFn();
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <RootContainer>
      <GestureHandlerRoot>
        <Overlay activeOpacity={1} onPress={onOverlayPress}>
          <AnimatedView style={style} onLayout={onConatinerLayout}>
            <Container activeOpacity={1}>
              <ChildrenBox onLayout={onChildrenLayout}>
                {children}
                <GestureDetector gesture={pan}>
                  <DragArea>
                    <DragBar />
                  </DragArea>
                </GestureDetector>
              </ChildrenBox>
            </Container>
          </AnimatedView>
        </Overlay>
      </GestureHandlerRoot>
    </RootContainer>
  );
};

const RootContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
`;

const GestureHandlerRoot = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const AnimatedView = styled(Animated.View)`
  flex: 1;
`;

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;

  background-color: ${({theme}) => theme.bgColor};
  border-radius: 0 0 20px 20px;
`;

const ChildrenBox = styled.View`
  width: 100%;
`;

const DragArea = styled.View`
  align-items: center;

  width: 100%;
  padding: 5px 10px;
  padding-bottom: 10px;
`;

const DragBar = styled.View`
  width: 25px;
  height: 5px;

  background-color: ${({theme}) => theme.gray100.default};
  border-radius: 999px;
`;

export default TopModal;
