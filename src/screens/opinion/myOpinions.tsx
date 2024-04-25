import useMyOpinions from '@app/graphql/hooks/opinion/useMyOpinions';

import styled from 'styled-components/native';

import {convertOpinionCategory, convertOpinionStatus} from '@app/utils/enum';
import {getDateTimeString} from '@app/utils/date';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import type {FlatListProps} from 'react-native';
import type {Opinion} from '@app/graphql/hooks/opinion/useMyOpinions';

interface MyOpinionScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.MyOpinions
  > {}

const MyOpinionScreen = ({navigation}: MyOpinionScreenProps) => {
  const {opinions, fetchMore} = useMyOpinions();

  return (
    <Container>
      <FlatList
        data={opinions}
        renderItem={({item, index}) => (
          <ListItem
            even={(index + 1) % 2 === 0}
            onPress={() =>
              navigation.navigate(SettingsNavigatorScreens.OpinionDetail, {
                id: item.id,
              })
            }>
            <ContentBox>
              <Title>{item.title}</Title>
              <CategoryBox>
                <Category>{convertOpinionCategory(item.category)}</Category>
              </CategoryBox>
              <Date>{getDateTimeString(item.createdAt)}</Date>
            </ContentBox>
            <Status>{convertOpinionStatus(item.status)}</Status>
          </ListItem>
        )}
        ListEmptyComponent={
          <EmptyBox>
            <EmptyText>작성한 의견이 없습니다.</EmptyText>
          </EmptyBox>
        }
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.bgColor};
`;

const FlatList = styled.FlatList<FlatListProps<Opinion>>``;

interface ListItemProps {
  even: boolean;
}

const ListItem = styled.TouchableOpacity<ListItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;

  background-color: ${({even, theme}) =>
    even ? theme.gray700.default : theme.bgColor};
`;

const ContentBox = styled.View`
  flex: 3;

  align-items: flex-start;
  gap: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.fontColor};
`;

const CategoryBox = styled.View`
  padding: 3px 8px;

  border-radius: 10px;
  background-color: ${({theme}) => theme.primary.default};
`;

const Category = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.gray700.default};
`;

const Date = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray200.default};
`;

const Status = styled.Text`
  flex: 1;

  font-size: 14px;
  font-weight: 600;
  text-align: right;
  color: ${({theme}) => theme.fontColor};
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

export default MyOpinionScreen;
