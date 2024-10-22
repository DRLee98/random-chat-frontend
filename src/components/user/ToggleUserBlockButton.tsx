import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';
import {useUpdateMeDetail} from '@app/graphql/hooks/user/useMeDetail';
import useMe, {useUpdateMe} from '@app/graphql/hooks/user/useMe';
import {useModal} from '@app/contexts/modalContext';

import styled, {useTheme} from 'styled-components/native';

import {getFragmentData} from '@app/graphql/__generated__';

import {BLOCK_USER} from '@app/graphql/fragments/user';
import useToggleBlock from '@app/hooks/useToggleBlock';

interface ToggleUserBlockButtonProps {
  userId: string;
  nickname: string;
  onAfterBlock?: () => void;
}

const ToggleUserBlockButton = ({
  userId,
  nickname,
  onAfterBlock,
}: ToggleUserBlockButtonProps) => {
  const theme = useTheme();
  const showModal = useModal();

  const {me} = useMe();

  const toggleBlock = useToggleBlock();

  const toggleBlockFn = () => {
    toggleBlock(userId, onAfterBlock);
  };

  const onPress = () => {
    showModal({
      title: '유저 차단',
      message: `${nickname}님을 차단${
        me?.blockUserIds.includes(userId) ? '해제' : ''
      } 하시겠습니까?`,
      buttons: [
        {
          text: '취소',
        },
        {
          text: me?.blockUserIds.includes(userId) ? '해제' : '차단',
          onPress: toggleBlockFn,
          bgColor: me?.blockUserIds.includes(userId)
            ? theme.primary.default
            : undefined,
          textColor: me?.blockUserIds.includes(userId)
            ? theme.bgColor
            : theme.red.default,
        },
      ],
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
