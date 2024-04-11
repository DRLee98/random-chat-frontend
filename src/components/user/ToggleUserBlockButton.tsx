import {useApolloClient} from '@apollo/client';
import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';

import styled from 'styled-components/native';

import {AlertFn} from '@app/utils/app';

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

  const onPress = () => {
    AlertFn({
      title: '유저 차단',
      message: `${nickname}님을 차단${
        me?.blockUserIds.includes(userId) ? '해제' : ''
      }하시겠습니까?`,
      onConfirm: toggleBlockUserFn,
    });
  };

  return (
    <Container onPress={onPress} blocked={me?.blockUserIds.includes(userId)}>
      <Text blocked={me?.blockUserIds.includes(userId)}>
        {me?.blockUserIds.includes(userId) ? '차단해제' : '차단'}
      </Text>
    </Container>
  );
};

interface StyledProps {
  blocked: boolean;
}

const Container = styled.TouchableOpacity<StyledProps>`
  align-items: center;
  justify-content: center;

  width: 65px;
  height: 30px;

  border: 1px solid
    ${({theme, blocked}) =>
      blocked ? theme.red.default : theme.gray200.default};
  border-radius: 8px;
`;

const Text = styled.Text<StyledProps>`
  color: ${({theme, blocked}) =>
    blocked ? theme.red.accessible : theme.gray100.default};
`;

export default ToggleUserBlockButton;
