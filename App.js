// In App.js in a new project

import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from './srcs/components/screens/splash';
import Login from './srcs/components/screens/login';
import RegisterScreen from './srcs/components/screens/register';
import HomeScreen from './srcs/components/screens/home';
import { Provider } from 'react-redux';
import configStore from './srcs/redux/stores';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const stores = configStore();


function App() {
  return (
    <Provider store={stores}>
      <NavigationContainer >
        <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen}
          options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }} />
           <Stack.Screen name="register" component={RegisterScreen}
          options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen}
           options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;







