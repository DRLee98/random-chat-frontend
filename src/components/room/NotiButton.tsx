import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NotiButtonProps {
  userRoomId: string;
  noti: boolean;
}

const NotiButton = ({userRoomId, noti}: NotiButtonProps) => {
  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom} = useUpdateMyRooms();

  const onToggleNoti = async () => {
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId: +userRoomId,
          noti: !noti,
        },
      },
    });
    if (data?.updateRoom.ok) {
      updateMyRoom(userRoomId, {noti: !noti});
    }
  };

  return (
    <TouchableOpacity onPress={onToggleNoti}>
      <Icon name={noti ? 'bell-ring' : 'bell-cancel-outline'} size={20} />
    </TouchableOpacity>
  );
};

export default NotiButton;
