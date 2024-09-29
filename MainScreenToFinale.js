//import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import { useLocalStorage } from './useLocalStorage';

import FeedScreen from './FeedScreen.js';

 
import MyTask from './MyTask';
import { GlobalContext } from './GlobalContext';
MaterialCommunityIcons.loadFont(); 


 
 



function MainScreenToFinale() {
  const navigation = useNavigation();
 // const [answers, setAnswers] = useLocalStorage('answers', []);
 const { answers, setAnswers } = useContext(GlobalContext);
 const [remainingTaskList, setRemainingTaskList] = React.useState([]);

  const Tab = createBottomTabNavigator();
 

  React.useEffect(() => {
    const filteredTasks = answers.filter((answer) => answer.type === 'Task' && answer.completed === false);
    setRemainingTaskList(filteredTasks);
  }, [answers]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({ remainingTaskCount: remainingTaskList.length });
    }, [navigation, remainingTaskList])
  );


  return (

    <Tab.Navigator
      initialRouteName="TaskScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'My tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskScreen"
        component={MyTask}
        options={{
          headerShown: false,
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: remainingTaskList.length ,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );

}


export default MainScreenToFinale;
