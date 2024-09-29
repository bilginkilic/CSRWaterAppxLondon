import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { AuthContext } from './AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';

 import InteractScreen from './InteractScreen';
import IntroPage from './IntroPage';




 




function HomeScreen() {


  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false

      }}

    >
      <Tab.Screen
        name="About"
        component={IntroPage}
        options={{
          tabBarLabel: 'About',
          tabBarVisible: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),

        }

        }
      />
      <Tab.Screen
        name="Task"
        component={InteractScreen}
        options={{
          tabBarLabel: 'Survey', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ray-start" color={color} size={size} />
          ),
          tabBarBadge: 3,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Porfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>

  );

}


export default HomeScreen;
