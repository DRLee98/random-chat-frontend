import styled from 'styled-components/native';

import ProfileImg from '@app/components/user/ProfileImg';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';

interface UserRowProps {
  id: string;
  nickname: string;
  bio?: string | null;
  profileUrl?: string | null;
  profileBgColor?: string | null;
  profileTextColor?: string | null;
  push?: boolean;
  blockButton?: boolean;
}

const UserRow = ({
  id,
  nickname,
  bio,
  profileUrl,
  profileBgColor,
  profileTextColor,
  push = true,
  blockButton = true,
}: UserRowProps) => {
  return (
    <Container>
      <UserBox>
        <ProfileImg
          id={id}
          url={profileUrl}
          bgColor={profileBgColor}
          textColor={profileTextColor}
          size={45}
          push={push}
        />
        <UserInfo>
          <Nickname ellipsizeMode="tail" numberOfLines={1}>
            {nickname}
          </Nickname>
          <Bio ellipsizeMode="tail" numberOfLines={1}>
            {bio}
          </Bio>
        </UserInfo>
      </UserBox>
      {blockButton && <ToggleUserBlockButton userId={id} nickname={nickname} />}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  padding: 5px 0;
`;

const UserBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const Nickname = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

const Bio = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray200.default};
`;

export default UserRow;
