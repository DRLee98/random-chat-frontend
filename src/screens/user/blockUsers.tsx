import {useEffect, useState} from 'react';
import useMeDetail from '@app/graphql/hooks/user/useMeDetail';

import styled from 'styled-components/native';

import UserRow from '@app/components/user/UserRow';

import {getFragmentData} from '@app/graphql/__generated__';

import {BLOCK_USER} from '@app/graphql/fragments/user';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import type {BlockUserFragment} from '@app/graphql/__generated__/graphql';
import type {FlatListProps} from 'react-native';

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
    <Container
      data={blockUsers}
      renderItem={({item}) => <UserRow {...item} />}
      ListEmptyComponent={
        <EmptyBox>
          <EmptyText>차단중인 유저가 없습니다</EmptyText>
        </EmptyBox>
      }
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={item => `block-user-${item.id}`}
    />
  );
};

const Container = styled.FlatList<FlatListProps<BlockUserFragment>>`
  flex: 1;
  padding: 0 20px;
  padding-top: 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const Separator = styled.View`
  height: 10px;
`;

const EmptyBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 400px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.gray100.default};
`;

export default BlockUsersScreen;
