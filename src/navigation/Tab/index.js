import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import ReceiptIcon from 'react-native-vector-icons/FontAwesome6';
import CardIcon from 'react-native-vector-icons/Ionicons';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fee from '../../screens/Fee';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Receipt from '../../screens/Receipt';
import ViewFeeReceipt from '../../screens/VIEW FEE RECEIPT';
import { Color } from '../../utils/color';

const Tab = createBottomTabNavigator();


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false, // Hide header for all screens
            }}
        >
            <Tab.Screen name="receipt" component={Receipt}
                options={{
                    tabBarLabel: 'Receipt',
                    tabBarIcon: ({ color, size, focused }) => (
                        <ReceiptIcon
                            name="receipt"
                            color={focused ? Color.iconColor : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.iconColor
                }}
            />
            <Tab.Screen name="fee" component={Fee}
                options={{
                    tabBarLabel: 'Fee',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CardIcon
                            name="card"
                            color={focused ? Color.iconColor : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.iconColor
                }}
            />
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon
                            name="home"
                            color={focused ? Color.iconColor : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.iconColor
                }}
            />
            <Tab.Screen name="analytics" component={ViewFeeReceipt}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnalyticsIcon
                            name="signal-cellular-3"
                            color={focused ? Color.iconColor : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.iconColor
                }}
            />
            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <UserIcon
                            name="user-circle"
                            color={focused ? Color.iconColor : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.iconColor
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation