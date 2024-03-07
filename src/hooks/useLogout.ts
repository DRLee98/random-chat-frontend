import {useNavigation} from '@react-navigation/native';
import {useApolloClient} from '@apollo/client';

import {removeSociald, removeToken} from '@app/utils/encStorage';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

const useLogout = () => {
  const client = useApolloClient();

  const navigator = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const logoutFn = async () => {
    await removeSociald();
    await removeToken();
    await client.clearStore();
    navigator.reset({routes: [{name: MainNavigatorScreens.Login}]});
  };

  return logoutFn;
};

export default useLogout;
