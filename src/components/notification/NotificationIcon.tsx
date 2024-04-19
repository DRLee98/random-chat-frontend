import useUnReadNotificationCount from '@app/graphql/hooks/notification/useUnReadNotificationCount';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

const NotificationIcon = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {count} = useUnReadNotificationCount();

  return (
    <Container
      onPress={() => {
        navigation.navigate(MainNavigatorScreens.Notification);
      }}>
      {count ? (
        <Icon name="notifications" color={theme.primary.default} size={24} />
      ) : (
        <Icon name="notifications-outline" color={theme.fontColor} size={24} />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  position: relative;
`;

export default NotificationIcon;
