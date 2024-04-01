import {useApolloClient} from '@apollo/client';
import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';

import {Alert, Button} from 'react-native';

import {ME_DETAIL} from '@app/graphql/hooks/user/useMeDetail';
import {ME} from '@app/graphql/hooks/user/useMe';

import type {
  Me,
  MeDetailQuery,
  MeQuery,
} from '@app/graphql/__generated__/graphql';

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
  const {cache} = useApolloClient();

  const [toggleBlockUser] = useToggleBlockUser();

  const toggleBlockUserFn = async () => {
    const {data} = await toggleBlockUser({
      variables: {
        input: {
          id: userId,
        },
      },
    });
    if (!data || !data.toggleBlockUser.ok) return;
    cache.updateQuery<MeDetailQuery>(
      {query: ME_DETAIL},
      prev =>
        prev?.meDetail.me && {
          ...prev,
          meDetail: {
            ...prev.meDetail,
            me: {
              ...prev.meDetail.me,
              blockUsers:
                data?.toggleBlockUser.updateBlockUsers ??
                prev.meDetail.me?.blockUsers,
            },
          },
        },
    );
    cache.updateQuery<MeQuery>(
      {query: ME},
      prev =>
        prev && {
          ...prev,
          me: {
            ...prev.me,
            ...(prev.me.me && {
              me: {
                ...prev.me.me,
                blockUserIds:
                  data?.toggleBlockUser.updateBlockUsers?.map(
                    user => user.id,
                  ) ?? prev.me.me.blockUserIds,
              },
            }),
          },
        },
    );
  };

  const AlertFn = async () => {
    Alert.alert(
      '차단',
      `${nickname}님을 차단${
        me?.blockUserIds.includes(userId) ? '해제' : ''
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
      title={me?.blockUserIds.includes(userId) ? '차단해제' : '차단'}
      onPress={AlertFn}
    />
  );
};

export default ToggleUserBlockButton;
