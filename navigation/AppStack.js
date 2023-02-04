import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Home, Favourites, Search, Profile} from '../screens';
import { TabIcon } from '../components';
import { COLORS, icons } from '../constants';

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
                tabBarStyle: {
                    height: 100,
                    display: 'flex',
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => {
                    return(
                      <TabIcon 
                        focused={focused}
                        icon={icons.home}
                        label="Home"
                        />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                  tabBarIcon: ({focused}) => {
                    return(
                      <TabIcon 
                        focused={focused}
                        icon={icons.search}
                        label="Search"
                        />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={Favourites}
                options={{
                  tabBarIcon: ({focused}) => {
                    return(
                      <TabIcon 
                        focused={focused}
                        icon={icons.favourites}
                        label="Favourites"
                        />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({focused}) => {
                    return(
                      <TabIcon 
                        focused={focused}
                        icon={icons.profile}
                        label="Profile"
                        />
                    )
                  }
                }}
            />
        </Tab.Navigator>
  )
}

export default AppStack