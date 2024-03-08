import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import {useUpdateRoomDetail} from '@app/graphql/hooks/room/useRoomDetail';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PinnedButtonProps {
  roomId: string;
  userRoomId: string;
  pinned: boolean;
}

const PinnedButton = ({roomId, userRoomId, pinned}: PinnedButtonProps) => {
  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom, sortMyRooms} = useUpdateMyRooms();
  const {updateRoomDetail} = useUpdateRoomDetail({roomId: +roomId});

  const onTogglePinned = async () => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId: +userRoomId,
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
  };

  return (
    <TouchableOpacity onPress={onTogglePinned}>
      <Icon name={pinned ? 'pin' : 'pin-off-outline'} size={20} />
    </TouchableOpacity>
  );
};

export default PinnedButton;
