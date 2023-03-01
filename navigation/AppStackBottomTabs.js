import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppStackBottomTabs = () => {
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#18c68b',
        tabBarInactiveTintColor: '#3d4542',
        tabBarStyle: {
            height: 60,
            backgroundColor: '#14181b',
            borderColor: '#364540',
            borderTopWidth: 0.5,
        } 
    }}>
        <Tab.Screen name={"Home"} component={HomeScreen} options={{
            tabBarIcon: ({focused, color}) => (<Ionicons name="ios-home" size={focused ? 30 : 25} color={color} />)
        }}/>
        <Tab.Screen name={"Search"} component={SearchScreen} options={{
            tabBarIcon: ({focused, color}) => (<FontAwesome name="search" size={focused ? 30 : 25} color={color} />)
        }}/>
        <Tab.Screen name={"Favourites"} component={FavouritesScreen} options={{
            tabBarIcon: ({focused, color}) => (<MaterialIcons name="favorite" size={focused ? 30 : 25} color={color} />)
        }}/>
        <Tab.Screen name={"Profile"} component={ProfileScreen} options={{
            tabBarIcon: ({focused, color}) => (<FontAwesome name="user" size={focused ? 30 : 25} color={color} />)
        }}/>
    </Tab.Navigator>
  )
}

export default AppStackBottomTabs