import {TouchableOpacity} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import type {StackNavigationOptions} from '@react-navigation/stack';
import type {DefaultTheme} from 'styled-components/native';

export const bottomToTopScreen: StackNavigationOptions = {
  headerShown: false,
  presentation: 'modal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

interface DefaultScreenOptionsProps {
  theme: DefaultTheme;
}

export const getDefaultScreenOptions = ({
  theme,
}: DefaultScreenOptionsProps): StackNavigationOptions => ({
  headerTitleAlign: 'center',
  headerTintColor: theme.fontColor,
  headerStyle: {
    backgroundColor: theme.bgColor,
  },
  headerLeftContainerStyle: {
    paddingLeft: 10,
  },
  headerRightContainerStyle: {
    paddingRight: 10,
  },
  headerTitleStyle: {
    color: theme.fontColor,
    fontSize: 16,
    fontWeight: '400',
  },
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  ...TransitionPresets.SlideFromRightIOS,
});
