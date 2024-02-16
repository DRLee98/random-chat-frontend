import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '@app/screens/login';
import SignUpStackNavigator from './SignUpStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {user} from '@app/atoms/user';

interface NavigatorProps {
  Login: undefined;
  SignUp: undefined;
}

const Stack = createStackNavigator();

const Navigator = () => {
  const userState = useRecoilState(user);
  console.log('userState', userState);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen name="SignUp" component={SignUpStackNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigator;
