import useNoticeList from '@app/graphql/hooks/notice/useNoticeList';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Entypo';

import {getDateString} from '@app/utils/date';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import type {FlatListProps} from 'react-native';
import type {NoticeListQuery} from '@app/graphql/__generated__/graphql';
import type {RequiredItem} from 'types/utils';

interface NoticeScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.Notice
  > {}

const NoticeScreen = ({navigation}: NoticeScreenProps) => {
  const theme = useTheme();
  const {noticeList, fetchMore} = useNoticeList();

  const goDetail = (id: string) => {
    navigation.navigate(SettingsNavigatorScreens.NoticeDetail, {id});
  };

  return (
    <Container
      data={noticeList}
      renderItem={({item, index}) => (
        <ListItem even={(index + 1) % 2 === 0}>
          <ContentBox>
            <TitleBox>
              <Title>{item.title}</Title>
              {item.pinned && (
                <Icon name="pin" size={16} color={theme.primary.default} />
              )}
            </TitleBox>
            <CreatedAt>{getDateString(item.createdAt)}</CreatedAt>
          </ContentBox>
          <Button onPress={() => goDetail(item.id)}>
            <Icon name="chevron-right" size={20} color={theme.fontColor} />
          </Button>
        </ListItem>
      )}
      ListEmptyComponent={
        <EmptyBox>
          <EmptyText>공지사항이 없습나다.</EmptyText>
        </EmptyBox>
      }
      keyExtractor={item => item.id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

interface ContainerProps
  extends FlatListProps<
    RequiredItem<NoticeListQuery['noticeList'], 'noticeList'>
  > {}

const Container = styled.FlatList<ContainerProps>`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

interface ListItemProps {
  even: boolean;
}

const ListItem = styled.View<ListItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;

  background-color: ${({even, theme}) =>
    even ? theme.gray700.default : theme.bgColor};
`;

const ContentBox = styled.View`
  gap: 6px;

  width: 85%;
`;

const TitleBox = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme}) => theme.fontColor};
`;

const CreatedAt = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

const Button = styled.TouchableOpacity``;

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

export default NoticeScreen;
