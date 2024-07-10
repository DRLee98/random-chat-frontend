import {useNavigation} from '@react-navigation/native';
import {useUpdateViewNotifications} from '@app/graphql/hooks/notification/useViewNotifications';
import {useUpdateUnReadNotificationCount} from '@app/graphql/hooks/notification/useUnReadNotificationCount';
import useDeleteNotification from '@app/graphql/hooks/notification/useDeleteNotification';
import useReadNotification from '@app/graphql/hooks/notification/useReadNotification';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import SwipeableListItem from '../common/SwipeableListItem';
import BreakText from '../common/BreakText';

import {getDateTimeString} from '@app/utils/date';

import {StackActions} from '@react-navigation/native';
import {MainNavigatorScreens} from '@app/navigators';
import {SettingsNavigatorScreens} from '@app/navigators/settings';
import {NotificationType} from '@app/graphql/__generated__/graphql';

import type {NotificationBaseFragment} from '@app/graphql/__generated__/graphql';
import type {MainNavigatorParamList} from '@app/navigators';
import type {NavigationProp} from '@react-navigation/native';

interface NotificationItemProps {
  grayBg: boolean;
  notification: NotificationBaseFragment;
}

const NotificationItem = ({grayBg, notification}: NotificationItemProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {readNotification, removeNotification} = useUpdateViewNotifications();
  const {updateDecreaseUnReadCount} = useUpdateUnReadNotificationCount();

  const [read] = useReadNotification();
  const [deleteNotification] = useDeleteNotification();

  const deleteNotificationFn = async () => {
    const {data} = await deleteNotification({
      variables: {
        input: {id: notification.id},
      },
    });
    if (data?.deleteNotification.ok) {
      removeNotification(notification.id);
    }
  };

  const readNotificationFn = async (id: string) => {
    const {data} = await read({variables: {input: {id}}});
    if (data?.readNotification.ok) {
      readNotification(id);
      updateDecreaseUnReadCount(1);
    }
  };

  const onReadAndGo = () => {
    readNotificationFn(notification.id);
    if (
      (notification.type === NotificationType.Room ||
        notification.type === NotificationType.Message) &&
      notification.data?.roomId
    ) {
      navigation.navigate(MainNavigatorScreens.ChatRoom, {
        roomId: notification.data.roomId,
        chatRoomName: null,
        newMessageCount: 1, // 메시지를 refetch 하기 위해 1로 설정
      });
      return;
    }

    if (
      notification.type === NotificationType.Opinion &&
      notification.data?.opinionId
    ) {
      const action = StackActions.push(MainNavigatorScreens.SettingsStack, {
        screen: SettingsNavigatorScreens.OpinionDetail,
        params: {id: notification.data.opinionId},
      });
      navigation.dispatch(action);
      return;
    }
  };

  const getIconName = (type: NotificationType) => {
    switch (type) {
      case NotificationType.System:
        return 'cog';
      case NotificationType.Event:
        return 'gift';
      case NotificationType.Room:
        return 'comments';
      case NotificationType.Message:
        return 'comment';
      case NotificationType.Opinion:
        return 'bullhorn';
      case NotificationType.Invite:
        return 'envelope';
      case NotificationType.Accusation:
        return 'exclamation-triangle';
      default:
        return '';
    }
  };

  return (
    <SwipeableListItem
      rightActions={
        <Button onPress={deleteNotificationFn}>
          <Icon name="cross" size={30} color="#fff" />
        </Button>
      }>
      <BackContainer>
        <Container
          grayBg={grayBg}
          read={notification.read}
          onPress={onReadAndGo}>
          {getIconName(notification.type) && (
            <StyledIcon
              read={notification.read}
              name={getIconName(notification.type)}
              size={35}
            />
          )}
          <ContentBox>
            <Title text={notification.title} />
            <Message text={notification.message} />
            <CreatedAt>{getDateTimeString(notification.createdAt)}</CreatedAt>
          </ContentBox>
        </Container>
      </BackContainer>
    </SwipeableListItem>
  );
};

const BackContainer = styled.View`
  background-color: ${({theme}) => theme.bgColor};
`;

interface ContainerProps {
  grayBg: boolean;
  read: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  padding: 12px 20px;

  background-color: ${({grayBg, theme}) =>
    grayBg ? theme.gray700.default : theme.bgColor};
  opacity: ${({read}) => (!read ? 1 : 0.5)};
`;

const StyledIcon = styled(Icon)<Pick<NotificationBaseFragment, 'read'>>`
  color: ${({theme, read}) => (read ? theme.fontColor : theme.primary.default)};
`;

const ContentBox = styled.View`
  gap: 4px;
  width: 80%;
`;

const Title = styled(BreakText).attrs({justify: 'flex-start'})`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme}) => theme.fontColor};
`;

const Message = styled(BreakText).attrs({justify: 'flex-start'})`
  justify-content: flex-start;
  font-size: 13px;
  color: ${({theme}) => theme.fontColor};
`;

const CreatedAt = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray200.default};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80px;
  background-color: ${({theme}) => theme.red.default};
`;

export default NotificationItem;
