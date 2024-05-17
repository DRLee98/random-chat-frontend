import styled, {useTheme} from 'styled-components/native';

import type {ActivityIndicatorProps} from 'react-native';

const Loader = (props: ActivityIndicatorProps) => {
  const theme = useTheme();

  return <Indicator color={theme.bgColor} {...props} />;
};

const Indicator = styled.ActivityIndicator``;

export default Loader;
