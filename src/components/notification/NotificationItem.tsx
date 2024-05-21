import {useUpdateViewNotifications} from '@app/graphql/hooks/notification/useViewNotifications';
import useDeleteNotification from '@app/graphql/hooks/notification/useDeleteNotification';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Entypo';
import SwipeableListItem from '../common/SwipeableListItem';

import {getDateTimeString} from '@app/utils/date';

import {NotificationType} from '@app/graphql/__generated__/graphql';

import type {NotificationBaseFragment} from '@app/graphql/__generated__/graphql';

interface NotificationItemProps {
  grayBg: boolean;
  notification: NotificationBaseFragment;
  onPressNotification: (notification: NotificationBaseFragment) => void;
}

const NotificationItem = ({
  grayBg,
  notification,
  onPressNotification,
}: NotificationItemProps) => {
  const {removeNotification} = useUpdateViewNotifications();
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

  const getIconName = (type: NotificationType) => {
    switch (type) {
      case NotificationType.System:
        return 'cog';
      case NotificationType.Event:
        return 'megaphone';
      case NotificationType.Room:
        return 'mail';
      case NotificationType.Message:
        return 'message';
      case NotificationType.Opinion:
        return 'clipboard';
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
          onPress={() => onPressNotification(notification)}>
          {getIconName(notification.type) && (
            <StyledIcon
              read={notification.read}
              name={getIconName(notification.type)}
              size={35}
            />
          )}
          <ContentBox>
            <Title>{notification.title}</Title>
            <Message>{notification.message}</Message>
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

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme}) => theme.fontColor};
`;

const Message = styled.Text`
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
