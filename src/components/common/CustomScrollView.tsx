import {useRef} from 'react';

import styled from 'styled-components/native';

import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';

interface CustomScrollViewProps
  extends Omit<ScrollViewProps, 'onScroll' | 'scrollEventThrottle'> {
  fetchMore: () => Promise<void>;
}

const CustomScrollView = ({
  fetchMore,
  children,
  ...props
}: CustomScrollViewProps) => {
  const fetching = useRef(false);

  const onScrollEndDrag = async (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {layoutMeasurement, contentSize, contentOffset} = e.nativeEvent;
    if (
      !fetching.current &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200
    ) {
      fetching.current = true;
      await fetchMore();
      fetching.current = false;
    }
  };

  return (
    <Container {...props} onScrollEndDrag={onScrollEndDrag}>
      {children}
    </Container>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  background-color: ${({theme}) => theme.bgColor};
`;

export default CustomScrollView;
