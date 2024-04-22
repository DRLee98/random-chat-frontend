import useViewNotifications, {
  useUpdateViewNotifications,
} from '@app/graphql/hooks/notification/useViewNotifications';
import {useUpdateUnReadNotificationCount} from '@app/graphql/hooks/notification/useUnReadNotificationCount';
import useReadAllNotifications from '@app/graphql/hooks/notification/useReadAllNotifications';
import useDeleteReadNotifications from '@app/graphql/hooks/notification/useDeleteReadNotifications';
import useReadNotification from '@app/graphql/hooks/notification/useReadNotification';
import useNewNotificationListener from '@app/graphql/hooks/notification/useNewNotificationListener';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Entypo';

import {getDateTimeString} from '@app/utils/date';

import {MainNavigatorScreens} from '@app/navigators';
import {NotificationType} from '@app/graphql/__generated__/graphql';

import {NOTIFICATION_BASE} from '@app/graphql/fragments/notification';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {FlatListProps} from 'react-native';
import type {NotificationBaseFragment} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

interface NotificationScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Notification
  > {}

const NotificationScreen = ({navigation}: NotificationScreenProps) => {
  const theme = useTheme();

  const {notifications, fetchMore} = useViewNotifications();
  const {
    appendNotification,
    readNotification,
    readAllNotifications,
    removeReadNotifications,
  } = useUpdateViewNotifications();
  const {
    updateUnReadCount,
    updateIncreaseUnReadCount,
    updateDecreaseUnReadCount,
  } = useUpdateUnReadNotificationCount();

  const [read] = useReadNotification();
  const [readAll] = useReadAllNotifications();
  const [deleteRead] = useDeleteReadNotifications();

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
      default:
        return '';
    }
  };

  const readNotificationFn = async (id: string) => {
    const {data} = await read({variables: {input: {id}}});
    if (data?.readNotification.ok) {
      readNotification(id);
      updateDecreaseUnReadCount(1);
    }
  };

  const readAllNotificationsFn = async () => {
    const {data} = await readAll();
    if (data?.readAllNotifications.ok) {
      readAllNotifications();
      updateUnReadCount(0);
    }
  };

  const deleteReadNotificationsFn = async () => {
    const {data} = await deleteRead();
    if (data?.deleteReadNotifications.ok) {
      removeReadNotifications();
    }
  };

  const newNotificationFn = (data?: FragmentType<typeof NOTIFICATION_BASE>) => {
    console.log('newNotificationFn', data);
    if (!data) return;
    updateIncreaseUnReadCount(1);
    appendNotification(data);
  };

  const onPressNotification = (item: NotificationBaseFragment) => {
    readNotificationFn(item.id);
    if (
      (item.type === NotificationType.Room ||
        item.type === NotificationType.Message) &&
      item.data?.roomId
    ) {
      navigation.navigate(MainNavigatorScreens.ChatRoom, {
        roomId: item.data.roomId,
        newMessageCount: 1, // 메시지를 refetch 하기 위해 1로 설정
      });
      return;
    }
  };

  useNewNotificationListener({
    onData: ({data}) => newNotificationFn(data.data?.newNotification),
  });

  return (
    <Container>
      <ButtonBox>
        <Button onPress={readAllNotificationsFn}>
          <ButtonText>전체 읽음 처리</ButtonText>
        </Button>
        <Button onPress={deleteReadNotificationsFn}>
          <ButtonText>읽은 알림 삭제</ButtonText>
        </Button>
      </ButtonBox>
      <List
        data={notifications}
        renderItem={({item, index}) => (
          <ListItem
            even={(index + 1) % 2 === 0}
            read={item.read}
            onPress={() => onPressNotification(item)}>
            {getIconName(item.type) && (
              <Icon
                name={getIconName(item.type)}
                size={35}
                color={item.read ? theme.fontColor : theme.primary.default}
              />
            )}
            <ContentBox>
              <Title>{item.title}</Title>
              <Message>{item.message}</Message>
              <CreatedAt>{getDateTimeString(item.createdAt)}</CreatedAt>
            </ContentBox>
          </ListItem>
        )}
        ListEmptyComponent={
          <EmptyBox>
            <EmptyText>알림이 없습나다</EmptyText>
          </EmptyBox>
        }
        keyExtractor={item => `notification-${item.id}`}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;

  padding: 0 10px;
  padding-bottom: 10px;
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

interface ListProps extends FlatListProps<NotificationBaseFragment> {}

const List = styled.FlatList<ListProps>`
  flex: 1;
`;

interface ListItemProps {
  even: boolean;
  read: boolean;
}

const ListItem = styled.TouchableOpacity<ListItemProps>`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  padding: 12px 20px;

  background-color: ${({even, theme}) =>
    even ? theme.gray700.default : theme.bgColor};
  opacity: ${({read}) => (!read ? 1 : 0.5)};
`;

const ContentBox = styled.View`
  gap: 4px;
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

const EmptyBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 400px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.gray100.default};
`;

export default NotificationScreen;
