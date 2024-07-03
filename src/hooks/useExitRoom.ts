import useDeleteRoom from '@app/graphql/hooks/room/useDeleteRoom';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import {useModal} from '@app/contexts/modalContext';

const useExitRoom = () => {
  const showModal = useModal();

  const [deleteRoom] = useDeleteRoom();
  const {removeMyRoom} = useUpdateMyRooms();

  const deleteRoomFn = async (roomId: string, onAfterDelete?: () => void) => {
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
    if (data?.deleteRoom.error) {
      showModal({
        title: '채팅방 나가기에 실패했어요',
        message: data.deleteRoom.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  return deleteRoomFn;
};

export default useExitRoom;
