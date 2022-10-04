/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createContext, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeTabNav from './src/components/HomeTabNav';
import LogInScreen, {logOut} from './src/screens/LogInScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

// @ts-ignore
export const AuthContext = createContext();

const AuthRoutes = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LogInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthContext.Provider value={{user, setUser, logOut}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            {/* Stack da autenticação */}
            <Stack.Screen
              name="AuthRoutes"
              component={AuthRoutes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeRoutes"
              component={HomeTabNav}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
