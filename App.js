import {createContext, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import LogIn, {logOut} from './src/screens/LogIn';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

export const AuthContext = createContext(null);

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // @ts-ignore
        dispatch({type: 'SIGN_IN', token: data});
      },
      // @ts-ignore
      signOut: () => {
        logOut();
        // @ts-ignore
        dispatch({type: 'SIGN_OUT'});
      },
      usuario: state.userToken,
    }),
    [state.userToken],
  );

  if (state.isLoading == null) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={LogIn}
              options={{
                title: 'Sign in',
                headerStyle: {
                  backgroundColor: '#2b008f',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
