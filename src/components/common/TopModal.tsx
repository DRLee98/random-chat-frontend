import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import styled from 'styled-components/native';

import Animated from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {runOnJS, withTiming} from 'react-native-reanimated';

import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  ModalProps,
} from 'react-native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {NavigationProp} from '@react-navigation/native';

interface TopModalProps extends ModalProps {
  onCloseModal: () => void;
}

const TopModal = ({children, onCloseModal, ...props}: TopModalProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

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
    const viewHeight =
      fullHegiht - e.nativeEvent.layout.height - insets.top - 22;
    offset.value = withTiming(-viewHeight);
  };

  const onOverlayPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    onCloseModalFn();
  };

  const onCloseModalFn = () => {
    offset.value = withTiming(-fullHegiht, {duration: 300}, finished => {
      if (finished) {
        runOnJS(onCloseModal)();
      }
    });
  };

  const pan = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onChange(e => {
      offset.value += e.changeY;
    })
    .onEnd(e => {
      const viewHeight = fullHegiht - childrenHegiht - insets.top - 22;
      if (viewHeight + 50 < fullHegiht - e.absoluteY) {
        return onCloseModalFn();
      }
      offset.value = withTiming(-viewHeight);
    })
    .runOnJS(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', onCloseModal);
    return unsubscribe;
  }, []);

  return (
    <Modal transparent {...props}>
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
    </Modal>
  );
};

const Modal = styled.Modal``;

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
