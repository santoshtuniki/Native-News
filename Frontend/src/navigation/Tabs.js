/* eslint-disable react/no-unstable-nested-components */
// module imports
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { moderateScale } from 'react-native-size-matters';

// screen impoprts
import Home from '@Screen/Home';
import Favorite from '@Screen/Favorite';
import Notification from '@Screen/Notification';
import Account from '@Screen/Account';

// component import
import { COLORS, SCREENS, TABICONS } from '@Constant/enums';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: COLORS.ACTIVE_TAB,
                inactiveTintColor: COLORS.INACTIVE_TAB,
                tabStyle: {
                    marginVertical: moderateScale(10),
                },
                showLabel: false,
            }}
        >
            <Tab.Screen
                name={SCREENS.HOME}
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name={TABICONS.HOME} size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name={SCREENS.FAVORITE}
                component={Favorite}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name={TABICONS.HEART} size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name={SCREENS.NOTIFICATION}
                component={Notification}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name={TABICONS.BELL} size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name={SCREENS.ACCOUNT}
                component={Account}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name={TABICONS.PERSON} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

};

export default Tabs;
