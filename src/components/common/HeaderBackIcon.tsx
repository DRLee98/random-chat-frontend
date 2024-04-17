import {useTheme} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type {NavigationProp} from '@react-navigation/native';

function HeaderBackIcon<T extends {}>() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<T>>();

  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <Icon name="chevron-back" color={theme.fontColor} size={24} />
    </TouchableOpacity>
  );
}

export default HeaderBackIcon;
