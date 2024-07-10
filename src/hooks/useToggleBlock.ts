import useToggleBlockUser from '@app/graphql/hooks/user/useToggleBlockUser';
import {useUpdateMeDetail} from '@app/graphql/hooks/user/useMeDetail';
import useMe, {useUpdateMe} from '@app/graphql/hooks/user/useMe';
import {useModal} from '@app/contexts/modalContext';

import {getFragmentData} from '@app/graphql/__generated__';

import {BLOCK_USER} from '@app/graphql/fragments/user';

const useToggleBlock = () => {
  const showModal = useModal();

  const {me} = useMe();

  const updateMe = useUpdateMe();
  const updateMeDetail = useUpdateMeDetail();

  const [toggleBlockUser] = useToggleBlockUser();

  const toggleBlockUserFn = async (
    userId: string,
    onAfterBlock?: () => void,
  ) => {
    const {data} = await toggleBlockUser({
      variables: {
        input: {
          id: userId,
        },
      },
    });
    if (data?.toggleBlockUser.updateBlockUsers) {
      if (!me?.blockUserIds.includes(userId)) {
        onAfterBlock?.();
      }
      const updateBlockUsers = getFragmentData(
        BLOCK_USER,
        data.toggleBlockUser.updateBlockUsers,
      );
      updateMe({
        blockUserIds: updateBlockUsers.map(user => user.id),
      });
      updateMeDetail({blockUsers: data.toggleBlockUser.updateBlockUsers});
    }
    if (data?.toggleBlockUser.error) {
      showModal({
        message: data.toggleBlockUser.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  return toggleBlockUserFn;
};

export default useToggleBlock;
