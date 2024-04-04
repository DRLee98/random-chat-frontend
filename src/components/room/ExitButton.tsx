import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';

import styled from 'styled-components/native';

import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ExitButtonProps {
  roomId: string;
  roomName: string;
  type?: 'text' | 'icon';
  size?: number;
  color?: string;
  onAfterDelete?: () => void;
}

const ExitButton = ({
  roomId,
  roomName,
  type = 'icon',
  size = 20,
  color,
  onAfterDelete,
}: ExitButtonProps) => {
  const [deleteRoom] = useDeleteRoom();

  const {removeMyRoom} = useUpdateMyRooms();

  const deleteRoomFn = async () => {
    const {data} = await deleteRoom({
      variables: {
        input: {
          roomId,
        },
      },
    });
    if (data?.deleteRoom.ok) {
      removeMyRoom(roomId);
      onAfterDelete?.();
    }
  };

  const AlertFn = async () => {
    Alert.alert('채팅방 나가기', `${roomName}방을 나가시겠습니까?`, [
      {text: '취소', style: 'cancel'},
      {
        text: '나가기',
        style: 'destructive',
        onPress: deleteRoomFn,
      },
    ]);
  };

  return (
    <Button onPress={AlertFn}>
      {type === 'text' ? (
        <Text color={color} size={size}>
          나가기
        </Text>
      ) : (
        <Icon name="exit-to-app" size={size} color={color} />
      )}
    </Button>
  );
};

const Button = styled.TouchableOpacity``;

const Text = styled.Text<Pick<ExitButtonProps, 'size' | 'color'>>`
  font-size: ${({size}) => size ?? 12}px;
  font-weight: 500;
  color: ${({color, theme}) => color ?? theme.fontColor};
`;

export default ExitButton;
