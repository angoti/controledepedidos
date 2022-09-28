import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CatalogScreen from '../screens/CatalogScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsuarioScreen from '../screens/UsuarioScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Usuário') {
            iconName = focused ? 'person-outline' : 'person-outline';
          } else if (route.name === 'Catálogo de produtos') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Usuário"
        component={UsuarioScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Catálogo de produtos"
        component={CatalogScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
