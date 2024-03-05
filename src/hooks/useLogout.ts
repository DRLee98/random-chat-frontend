import {useNavigation} from '@react-navigation/native';
import {removeSociald, removeToken} from '@app/utils/encStorage';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

const useLogout = () => {
  const navigator = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const logoutFn = async () => {
    await removeSociald();
    await removeToken();
    navigator.reset({routes: [{name: MainNavigatorScreens.Login}]});
  };

  return logoutFn;
};

export default useLogout;
