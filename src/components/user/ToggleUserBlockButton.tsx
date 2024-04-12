import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';
import {useUpdateMeDetail} from '@app/graphql/hooks/user/useMeDetail';
import useMe, {useUpdateMe} from '@app/graphql/hooks/user/useMe';

import styled from 'styled-components/native';

import {AlertFn} from '@app/utils/app';
import {getFragmentData} from '@app/graphql/__generated__';

import {BLOCK_USER} from '@app/graphql/fragments/user';

interface ToggleUserBlockButtonProps {
  userId: string;
  nickname: string;
}

const ToggleUserBlockButton = ({
  userId,
  nickname,
}: ToggleUserBlockButtonProps) => {
  const {me} = useMe();

  const updateMe = useUpdateMe();
  const updateMeDetail = useUpdateMeDetail();

  const [toggleBlockUser] = useToggleBlockUser();

  const toggleBlockUserFn = async () => {
    const {data} = await toggleBlockUser({
      variables: {
        input: {
          id: userId,
        },
      },
    });
    if (
      !data ||
      !data.toggleBlockUser.ok ||
      !data.toggleBlockUser.updateBlockUsers
    )
      return;
    const updateBlockUsers = getFragmentData(
      BLOCK_USER,
      data.toggleBlockUser.updateBlockUsers,
    );
    updateMe({
      blockUserIds: updateBlockUsers.map(user => user.id),
    });
    updateMeDetail({blockUsers: data.toggleBlockUser.updateBlockUsers});
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

  if (!me) return null;
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
