import styled from 'styled-components/native';

import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import BorderInput from '@app/components/common/input/BorderInput';

interface OpinionScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.Opinion
  > {}

const OpinionScreen = ({navigation}: OpinionScreenProps) => {
  return (
    <Container>
      <Input multiline placeholder="소중한 의견 부탁드립니다." />
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;

  padding: 0 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const Input = styled(BorderInput)`
  min-height: 200px;
  padding: 10px 5px;
`;

export default OpinionScreen;
