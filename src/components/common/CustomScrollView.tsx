import {forwardRef, useRef} from 'react';

import styled from 'styled-components/native';
import {ScrollView} from 'react-native';

import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';

interface CustomScrollViewProps
  extends Omit<ScrollViewProps, 'onScrollEndDrag' | 'onScrollBeginDrag'> {
  fetchMore?: () => Promise<void>;
  fetchMoreDirection?: 'up' | 'down';
  fetchMoreThreshold?: number;
}

const CustomScrollView = forwardRef<ScrollView, CustomScrollViewProps>(
  (
    {
      fetchMore,
      fetchMoreDirection = 'down',
      fetchMoreThreshold = 0.3,
      children,
      ...props
    },
    ref,
  ) => {
    const fetching = useRef(false);

    const fetchMoreFn = async () => {
      if (!fetchMore || fetching.current) return;
      fetching.current = true;
      await fetchMore();
      fetching.current = false;
    };

    const onScrollEndDrag = async (
      e: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
      if (fetchMoreDirection !== 'down') return;
      const {layoutMeasurement, contentSize, contentOffset} = e.nativeEvent;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - layoutMeasurement.height * fetchMoreThreshold
      ) {
        fetchMoreFn();
      }
    };

    const onScrollBeginDrag = async (
      e: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
      if (fetchMoreDirection !== 'up') return;
      const {layoutMeasurement, contentOffset} = e.nativeEvent;
      if (contentOffset.y <= layoutMeasurement.height * fetchMoreThreshold) {
        fetchMoreFn();
      }
    };

    return (
      <Container
        {...props}
        ref={ref}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onScrollBeginDrag}>
        {children}
      </Container>
    );
  },
);

const Container = styled(ScrollView)`
  width: 100%;
  background-color: ${({theme}) => theme.bgColor};
`;

export default CustomScrollView;
