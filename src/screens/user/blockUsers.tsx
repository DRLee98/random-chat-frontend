import {useEffect, useState} from 'react';
import useMeDetail from '@app/graphql/hooks/user/useMeDetail';

import styled from 'styled-components/native';

import ProfileImg from '@app/components/common/ProfileImg';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';

import {getFragmentData} from '@app/graphql/__generated__';

import {BLOCK_USER} from '@app/graphql/fragments/user';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import type {BlockUserFragment} from '@app/graphql/__generated__/graphql';

interface BlockUsersScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.BlockUsers
  > {}

const BlockUsersScreen = ({}: BlockUsersScreenProps) => {
  const [blockUsers, setBlockUsers] = useState<BlockUserFragment[]>([]);

  const {me} = useMeDetail();

  useEffect(() => {
    if (me && blockUsers.length === 0) {
      const blockUsersData = getFragmentData(BLOCK_USER, me.blockUsers);
      setBlockUsers([...blockUsersData]);
    }
  }, [me]);

  return (
    <Container>
      {blockUsers.map(item => (
        <ListItem key={`block-user-${item.id}`}>
          <UserBox>
            <ProfileImg id={item.id} size={45} url={item.profileUrl} push />
            <UserInfo>
              <Nickname ellipsizeMode="tail" numberOfLines={1}>
                {item.nickname}
              </Nickname>
              <Bio ellipsizeMode="tail" numberOfLines={1}>
                {item.bio}
              </Bio>
            </UserInfo>
          </UserBox>
          <ToggleUserBlockButton userId={item.id} nickname={item.nickname} />
        </ListItem>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
  padding-top: 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;
`;

const UserBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const UserInfo = styled.View``;

const Nickname = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

const Bio = styled.Text`
  width: 85%;
  font-size: 12px;
  color: ${({theme}) => theme.gray200.default};
`;

export default BlockUsersScreen;
