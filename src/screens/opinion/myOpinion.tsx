import styled from 'styled-components/native';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';

interface MyOpinionScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.MyOpinion
  > {}

const MyOpinionScreen = ({navigation}: MyOpinionScreenProps) => {
  return <Container></Container>;
};

const Container = styled.ScrollView`
  flex: 1;

  padding: 0 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

export default MyOpinionScreen;
