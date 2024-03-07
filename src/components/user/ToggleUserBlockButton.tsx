import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';

import {Alert, Button} from 'react-native';

import type {Me} from '@app/graphql/types/graphql';

interface ToggleUserBlockButtonProps {
  me: Me;
  userId: string;
  nickname: string;
}

const ToggleUserBlockButton = ({
  me,
  userId,
  nickname,
}: ToggleUserBlockButtonProps) => {
  const [toggleBlockUser] = useToggleBlockUser();

  const toggleBlockUserFn = async () => {
    toggleBlockUser({
      variables: {
        input: {
          id: userId,
        },
      },
    });
  };

  const AlertFn = async () => {
    Alert.alert(
      '차단',
      `${nickname}님을 차단${
        me?.blockUserIds.includes(+userId) ? '해제' : ''
      }하시겠습니까?`,
      [
        {text: '취소', style: 'cancel'},
        {
          text: '확인',
          style: 'destructive',
          onPress: toggleBlockUserFn,
        },
      ],
    );
  };

  return (
    <Button
      title={me?.blockUserIds.includes(+userId) ? '차단해제' : '차단'}
      onPress={AlertFn}
    />
  );
};

export default ToggleUserBlockButton;
