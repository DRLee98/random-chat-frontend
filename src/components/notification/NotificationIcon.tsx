import useUnReadNotificationCount, {
  useUpdateUnReadNotificationCount,
} from '@app/graphql/hooks/notification/useUnReadNotificationCount';
import useNewNotificationListener from '@app/graphql/hooks/notification/useNewNotificationListener';
import {useUpdateViewNotifications} from '@app/graphql/hooks/notification/useViewNotifications';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';

import {MainNavigatorScreens} from '@app/navigators';

import {NOTIFICATION_BASE} from '@app/graphql/fragments/notification';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FragmentType} from '@app/graphql/__generated__';

const NotificationIcon = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {count} = useUnReadNotificationCount();
  const {updateIncreaseUnReadCount} = useUpdateUnReadNotificationCount();
  const {appendNotification} = useUpdateViewNotifications();

  const newNotificationFn = (data?: FragmentType<typeof NOTIFICATION_BASE>) => {
    if (!data) return;
    updateIncreaseUnReadCount(1);
    appendNotification(data);
  };

  useNewNotificationListener({
    onData: ({data}) => newNotificationFn(data.data?.newNotification),
  });

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
