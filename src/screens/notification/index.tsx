import useViewNotifications, {
  useUpdateViewNotifications,
} from '@app/graphql/hooks/notification/useViewNotifications';
import {useUpdateUnReadNotificationCount} from '@app/graphql/hooks/notification/useUnReadNotificationCount';
import useReadAllNotifications from '@app/graphql/hooks/notification/useReadAllNotifications';
import useDeleteReadNotifications from '@app/graphql/hooks/notification/useDeleteReadNotifications';
import useNewNotificationListener from '@app/graphql/hooks/notification/useNewNotificationListener';

import styled from 'styled-components/native';
import NotificationItem from '@app/components/notification/NotificationItem';

import {MainNavigatorScreens} from '@app/navigators';

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

const NotificationScreen = (props: NotificationScreenProps) => {
  const {notifications, fetchMore} = useViewNotifications();
  const {appendNotification, readAllNotifications, removeReadNotifications} =
    useUpdateViewNotifications();
  const {updateUnReadCount, updateIncreaseUnReadCount} =
    useUpdateUnReadNotificationCount();

  const [readAll] = useReadAllNotifications();
  const [deleteRead] = useDeleteReadNotifications();

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
    if (!data) return;
    updateIncreaseUnReadCount(1);
    appendNotification(data);
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
          <NotificationItem
            grayBg={(index + 1) % 2 === 0}
            notification={item}
          />
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
