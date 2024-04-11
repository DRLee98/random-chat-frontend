import type {
  MyRoomBaseFragment,
  RoomDetailQuery,
} from '@app/graphql/__generated__/graphql';

export const getHomeChatRoomName = (
  userRoom: MyRoomBaseFragment,
  short?: boolean,
) => {
  if (userRoom.name) {
    return userRoom.name;
  }

  if (short) {
    const usersLength = userRoom.users.length;
    return `${userRoom.users[0].nickname}${
      usersLength > 1 ? ` 외 ${usersLength - 1}명` : ''
    }`;
  }
  return userRoom.users.map(user => user.nickname).join(', ');
};

export const getChatRoomName = (
  roomDetail: RoomDetailQuery['roomDetail']['room'],
) => {
  if (!roomDetail) return '채팅방';
  if (roomDetail.userRoom.name) return roomDetail.userRoom.name;
  const usersLength = roomDetail.users.length;
  return `${roomDetail.users[0].nickname}${
    usersLength > 1 ? ` 외 ${usersLength - 1}명` : ''
  }`;
};
