import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Catalog from './Catalog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Usuario from './Usuario';

const Tab = createBottomTabNavigator();

export default function Home() {
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
        component={Usuario}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Catálogo de produtos"
        component={Catalog}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
