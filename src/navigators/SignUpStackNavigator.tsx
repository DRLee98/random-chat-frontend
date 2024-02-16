import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={() => <></>} />
    </Stack.Navigator>
  );
};

export default SignUpStackNavigator;
