import styled from 'styled-components/native';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';

interface NoticeScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.Notice
  > {}

const NoticeScreen = ({navigation}: NoticeScreenProps) => {
  return <Container></Container>;
};

const Container = styled.ScrollView`
  flex: 1;

  padding: 0 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

export default NoticeScreen;
