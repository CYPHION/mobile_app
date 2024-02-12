import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import ReceiptIcon from 'react-native-vector-icons/FontAwesome6';
import CardIcon from 'react-native-vector-icons/Ionicons';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Analytics from '../../screens/analytics/Analytics';
import Fee from '../../screens/fee/Fee';
import Home from '../../screens/homeScreen/Home';
import Profile from '../../screens/profile/Profile';
import Receipt from '../../screens/receipt/Receipt';

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
                    tabBarIcon: ({ color, size }) => (
                        <ReceiptIcon name="receipt" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="fee" component={Fee}
                options={{
                    tabBarLabel: 'Fee',
                    tabBarIcon: ({ color, size }) => (
                        <CardIcon name="card" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="analytics" component={Analytics}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size }) => (
                        <AnalyticsIcon name="signal-cellular-3" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <UserIcon name="user-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation