import {useModal} from '@app/contexts/modalContext';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import {useUpdateRoomDetail} from '@app/graphql/hooks/room/useRoomDetail';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PinnedButtonProps {
  roomId: string;
  userRoomId: string;
  pinned: boolean;
  size?: number;
  color?: string;
}

const PinnedButton = ({
  roomId,
  userRoomId,
  pinned,
  size = 20,
  color,
}: PinnedButtonProps) => {
  const showModal = useModal();

  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {updateRoomDetail} = useUpdateRoomDetail({roomId});

  const onTogglePinned = async () => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId,
          pinned: !pinned,
        },
      },
    });
    if (data?.updateRoom.ok) {
      const updateValue = !pinned ? new Date() : null;
      updateRoomDetail({pinnedAt: updateValue});
      updateMyRoom(userRoomId, {pinnedAt: updateValue});
      sortMyRooms();
    }
    if (data?.updateRoom.error) {
      showModal({
        message: data.updateRoom.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  return (
    <TouchableOpacity onPress={onTogglePinned}>
      <Icon
        name={pinned ? 'pin' : 'pin-off-outline'}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default PinnedButton;
