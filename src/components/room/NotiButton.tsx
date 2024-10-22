import {useModal} from '@app/contexts/modalContext';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import {useUpdateRoomDetail} from '@app/graphql/hooks/room/useRoomDetail';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NotiButtonProps {
  roomId: string;
  userRoomId: string;
  noti: boolean;
  size?: number;
  color?: string;
}

const NotiButton = ({
  roomId,
  userRoomId,
  noti,
  size = 20,
  color,
}: NotiButtonProps) => {
  const showModal = useModal();

  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom} = useUpdateMyRooms();
  const {updateRoomDetail} = useUpdateRoomDetail({roomId});

  const onToggleNoti = async () => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId,
          noti: !noti,
        },
      },
    });
    if (data?.updateRoom.ok) {
      const updateValue = !noti;
      updateRoomDetail({noti: updateValue});
      updateMyRoom(userRoomId, {noti: updateValue});
    }
    if (data?.updateRoom.error) {
      showModal({
        message: data.updateRoom.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  return (
    <TouchableOpacity onPress={onToggleNoti}>
      <Icon
        name={noti ? 'bell-ring' : 'bell-cancel-outline'}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default NotiButton;
