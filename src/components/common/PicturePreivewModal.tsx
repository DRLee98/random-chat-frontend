import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';

import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import type {
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

interface PicturePreviewModalProps {
  urls: string[];
  previewIndex?: number;
  onClose: () => void;
}

const PicturePreviewModal = ({
  urls,
  previewIndex,
  onClose,
}: PicturePreviewModalProps) => {
  const {width} = useWindowDimensions();

  const animatedValue = useSharedValue(0);
  const style = (index: number) =>
    useAnimatedStyle(() => ({
      transform: [
        {translateX: index * width + (width * 0.8) / 2 - animatedValue.value},
      ],
    }));

  const onPanChange = ({
    changeX,
  }: GestureUpdateEvent<
    PanGestureHandlerEventPayload & PanGestureChangeEventPayload
  >) => {
    if (animatedValue.value <= 0 && changeX > 0) return 0;
    if (animatedValue.value >= (urls.length - 1) * width && changeX < 0)
      return (urls.length - 1) * width;

    return animatedValue.value + -changeX;
  };

  const onPanEnd = (
    e: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    const target = Math.round(animatedValue.value / width);
    return target * width;
  };

  const pan = Gesture.Pan()
    .onChange(e => {
      animatedValue.value = onPanChange(e);
    })
    .onEnd(e => {
      animatedValue.value = withTiming(onPanEnd(e));
    })
    .runOnJS(true);

  useEffect(() => {
    if (previewIndex !== undefined) {
      animatedValue.value = previewIndex * width;
    }
  }, [previewIndex]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={previewIndex !== undefined}>
      <GestureHandlerRoot>
        <ModalOverlay>
          <GestureDetector gesture={pan}>
            <GestureContainer activeOpacity={1} onPress={onClose}>
              {urls.map((url, i) => (
                <PictureBox key={`preview-img-${i}`} style={style(i)}>
                  <Picture source={{uri: url}} resizeMode="contain" />
                </PictureBox>
              ))}
            </GestureContainer>
          </GestureDetector>
        </ModalOverlay>
      </GestureHandlerRoot>
    </Modal>
  );
};

const Modal = styled.Modal``;

const GestureHandlerRoot = styled(GestureHandlerRootView)`
  flex: 1;
`;

const ModalOverlay = styled.View`
  position: relative;

  align-items: center;

  background-color: rgba(0, 0, 0, 0.4);
`;

const GestureContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const PictureBox = styled(Animated.View)`
  position: absolute;
  right: 50%;

  width: 80%;
  height: 100%;
`;

const Picture = styled.Image`
  width: 100%;
  height: 100%;
`;

export default PicturePreviewModal;
