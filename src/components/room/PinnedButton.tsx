import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PinnedButtonProps {
  userRoomId: string;
  pinned: boolean;
}

const PinnedButton = ({userRoomId, pinned}: PinnedButtonProps) => {
  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom, sortMyRooms} = useUpdateMyRooms();

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
      updateMyRoom(userRoomId, {pinnedAt: !pinned ? new Date() : null});
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
