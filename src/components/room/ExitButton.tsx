import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';

import styled from 'styled-components/native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ExitButtonProps {
  roomId: string;
  type?: 'text' | 'icon';
  size?: number;
  color?: string;
  onAfterDelete?: () => void;
}

const ExitButton = ({
  roomId,
  type = 'icon',
  size = 20,
  color,
  onAfterDelete,
}: ExitButtonProps) => {
  const [deleteRoom] = useDeleteRoom();

  const {removeMyRoom} = useUpdateMyRooms();

  const onDeleteRoom = async () => {
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

  return (
    <TouchableOpacity onPress={onDeleteRoom}>
      {type === 'text' ? (
        <Text color={color} size={size}>
          나가기
        </Text>
      ) : (
        <Icon name="exit-to-app" size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};

const Text = styled.Text<Pick<ExitButtonProps, 'size' | 'color'>>`
  font-size: ${({size}) => size ?? 12}px;
  font-weight: 500;
  color: ${({color, theme}) => color ?? theme.fontColor};
`;

export default ExitButton;
