import useMe from '@app/graphql/hooks/user/useMe';

import styled from 'styled-components/native';
import ProfileImg from '../user/ProfileImg';
import Icon from 'react-native-vector-icons/AntDesign';

import {InviteStatus} from '@app/graphql/__generated__/graphql';

import type {InviteRoomBaseFragment} from '@app/graphql/__generated__/graphql';

interface InviteTypeProps {
  type: InviteStatus;
}

interface InviteItemProps {
  inviteRoom: InviteRoomBaseFragment;
}

const InviteItem = ({inviteRoom}: InviteItemProps) => {
  const {me} = useMe();

  const myStatus = inviteRoom.invites.find(
    invite => invite.user.id === me?.id,
  )?.status;

  const waitCount = inviteRoom.invites.filter(
    invite => invite.status === InviteStatus.Wait,
  ).length;

  return (
    <Row>
      <UserList>
        {inviteRoom.invites.map(invite => (
          <ProfileBox key={`invite-${invite.id}`}>
            <ProfileImg
              id={invite.user.id}
              url={invite.user.profileUrl}
              bgColor={invite.user.profileBgColor}
              textColor={invite.user.profileTextColor}
              size={45}
              push
            />
            {invite.user.id === me?.id && (
              <MeBox>
                <Me>나</Me>
              </MeBox>
            )}
            {invite.status !== InviteStatus.Wait && (
              <UserStatusBox type={invite.status}>
                {invite.status === InviteStatus.Accept ? (
                  <Icon name="check" color="#fff" />
                ) : (
                  <Icon name="close" color="#fff" />
                )}
              </UserStatusBox>
            )}
          </ProfileBox>
        ))}
      </UserList>
      {myStatus === InviteStatus.Wait && (
        <ButtonBox>
          <Button type={InviteStatus.Accept}>
            <ButtonText>수락</ButtonText>
          </Button>
          <Button type={InviteStatus.Reject}>
            <ButtonText>거절</ButtonText>
          </Button>
        </ButtonBox>
      )}
      {myStatus !== InviteStatus.Wait && waitCount > 0 && (
        <StatusText>응답 대기 중</StatusText>
      )}
    </Row>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 8px 25px;
`;

const UserList = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ProfileBox = styled.View`
  position: relative;
`;

const UserStatusBox = styled.View<InviteTypeProps>`
  position: absolute;
  top: 0px;
  right: 0px;

  padding: 2px;

  background-color: ${({type, theme}) =>
    type === InviteStatus.Accept ? theme.green.default : theme.red.default};
  border-radius: 999px;
`;

const MeBox = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;

  padding: 2px;
  background-color: ${({theme}) => theme.primary.default};
  border-radius: 4px;
`;

const Me = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #fff;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  width: 110px;
`;

const Button = styled.TouchableOpacity<InviteTypeProps>`
  padding: 8px 12px;

  border-radius: 8px;
  background-color: ${({type, theme}) =>
    type === InviteStatus.Accept ? theme.green.default : theme.red.default};
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: ${({theme}) => theme.bgColor};
`;

const StatusText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

export default InviteItem;
