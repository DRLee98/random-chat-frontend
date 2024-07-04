import styled from 'styled-components/native';
import ProfileImg from '../user/ProfileImg';
import Icon from 'react-native-vector-icons/AntDesign';

interface InviteTypeProps {
  type: 'accept' | 'reject';
}

const InviteItem = () => {
  return (
    <>
      <Row>
        <UserList>
          <ProfileBox>
            <ProfileImg id={'1'} size={45} push />
            <UserStatusList>
              <MeBox>
                <Me>나</Me>
              </MeBox>
              <UserStatusBox type="accept">
                <Icon name="check" color="#fff" />
              </UserStatusBox>
            </UserStatusList>
          </ProfileBox>
          <ProfileBox>
            <ProfileImg id={'1'} size={45} push />
            <UserStatusList>
              <UserStatusBox type="accept">
                <Icon name="check" color="#fff" />
              </UserStatusBox>
            </UserStatusList>
          </ProfileBox>
          <ProfileBox>
            <ProfileImg id={'1'} size={45} push />
            <UserStatusList>
              <UserStatusBox type="reject">
                <Icon name="close" color="#fff" />
              </UserStatusBox>
            </UserStatusList>
          </ProfileBox>
        </UserList>
        <ButtonBox>
          <Button type="accept">
            <ButtonText>수락</ButtonText>
          </Button>
          <Button type="reject">
            <ButtonText>거절</ButtonText>
          </Button>
        </ButtonBox>
      </Row>
      <Row>
        <UserList>
          <ProfileImg id={'1'} size={45} />
          <ProfileImg id={'1'} size={45} />
          <ProfileImg id={'1'} size={45} />
        </UserList>
        <StatusText>응답대기중</StatusText>
      </Row>
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 5px 25px;
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

const UserStatusList = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;

  flex-direction: row;
  align-items: flex-start;
  gap: 2px;
`;

const UserStatusBox = styled.View<InviteTypeProps>`
  background-color: ${({type, theme}) =>
    type === 'accept' ? theme.green.default : theme.red.default};
  border-radius: 4px;
`;

const MeBox = styled.View`
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
    type === 'accept' ? theme.green.default : theme.red.default};
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: ${({theme}) => theme.bgColor};
`;

const StatusText = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.gray100.default};
`;

export default InviteItem;
