import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AppStackBottomTabs from './AppStackBottomTabs';
import FavouriteListProvider from '../Contexts/FavouriteListContext';

const Stack = createStackNavigator();


const AppStack = () => {
  return (
      <FavouriteListProvider>
        <Stack.Navigator 
          initialRouteName='Root'
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name={"Root"} component={AppStackBottomTabs}/>
          <Stack.Screen name={"CoinDetailsScreen"} component={CoinDetailsScreen}/>
        </Stack.Navigator>
      </FavouriteListProvider>
  )
}

export default AppStack
