import useNotice from '@app/graphql/hooks/notice/useNotice';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Entypo';
import Divider from '@app/components/common/Divider';

import {getDateString} from '@app/utils/date';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';

export interface NoticeDetailScreenParams {
  id: string;
}

interface NoticeDetailScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.NoticeDetail
  > {}

const NoticeDetailScreen = ({route}: NoticeDetailScreenProps) => {
  const theme = useTheme();
  const {notice} = useNotice({id: route.params.id});

  return (
    <Container>
      <TitleBox>
        <Title>{notice?.title}</Title>
        {notice?.pinned && (
          <Icon name="pin" size={20} color={theme.primary.default} />
        )}
      </TitleBox>
      <Date>{getDateString(notice?.createdAt)}</Date>
      <Divider />
      <Content>{notice?.content}</Content>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;

  padding: 0 20px;
  padding-top: 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const TitleBox = styled.View`
  flex-direction: row;
  gap: 10px;

  margin-bottom: 5px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColor};
`;

const Date = styled.Text`
  margin-bottom: 20px;

  font-size: 14px;
  color: ${({theme}) => theme.gray100.default};
`;

const Content = styled.Text`
  margin-top: 20px;

  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

export default NoticeDetailScreen;
