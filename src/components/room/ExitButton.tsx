import useExitRoom from '@app/hooks/useExitRoom';
import {useModal} from '@app/contexts/modalContext';

import styled, {useTheme} from 'styled-components/native';

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
  const theme = useTheme();
  const showModal = useModal();

  const exitRoom = useExitRoom();

  const exitRoomFn = () => {
    exitRoom(roomId, onAfterDelete);
  };

  const AlertFn = async () => {
    showModal({
      title: '채팅방 나가기',
      message: `${roomName}방을 나가시겠습니까?`,
      buttons: [
        {
          text: '취소',
        },
        {
          text: '나가기',
          onPress: exitRoomFn,
          textColor: theme.red.default,
        },
      ],
    });
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
