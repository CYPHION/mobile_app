import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import ReceiptIcon from 'react-native-vector-icons/FontAwesome6';
import CardIcon from 'react-native-vector-icons/Ionicons';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Analytics from '../../screens/Analytics';
import ChangePasswordScreen from '../../screens/ChangePassword';
import FeeCollection from '../../screens/FeeCollection';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Receipt from '../../screens/Receipt';
import { Color } from '../../utils/color';
import { FontSizes } from '../../utils/font';

const Tab = createBottomTabNavigator();

const StackProfile = createNativeStackNavigator();
const ProfileStack = () => {
    return <StackProfile.Navigator
        initialRouteName='profile'
    >
        <StackProfile.Screen name="profile" component={Profile}
            options={{
                headerShown: false,

            }} />
        <StackProfile.Screen name="changePassword" component={ChangePasswordScreen}
            options={{
                headerShown: true,
                headerTitle: 'Change Password',
            }}
        />
    </StackProfile.Navigator>
}


const TabNavigation = ({ old }) => {


    const navigation = useNavigation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (navigation.isFocused() && !isFirstRender.current) {
                navigation.dispatch(CommonActions.navigate({ name: 'home' }));
                return true; // prevent default behavior (exit the app)
            }
            return false; // default behavior (exit the app if not handled)
        });

        isFirstRender.current = false;

        return () => {
            backHandler.remove();
        };
    }, [navigation]);




    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false, // Hide header for all screens
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5
                },
                tabBarLabelStyle: {
                    fontSize: FontSizes.sm
                },

            }}
        >
            <Tab.Screen name="receipt" component={Receipt}
                options={{
                    tabBarLabel: 'Receipt',

                    tabBarIcon: ({ color, size, focused }) => (
                        <ReceiptIcon
                            name="receipt"
                            color={focused ? Color.SecondaryText : Color.inactiveIcon}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.SecondaryText,
                    tabBarInactiveTintColor: Color.inactiveIcon,
                    headerShown: true,
                    headerTitle: 'View Fee Receipt'
                }}
            />
            <Tab.Screen name="fee" component={FeeCollection}
                options={{
                    tabBarLabel: 'Pay Fee',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CardIcon
                            name="card"
                            color={focused ? Color.SecondaryText : Color.inactiveIcon}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.SecondaryText,
                    tabBarInactiveTintColor: Color.inactiveIcon,
                    headerShown: true,
                    headerTitle: 'Pay Fees'

                }}
            />
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon
                            name="home"
                            color={focused ? Color.SecondaryText : Color.inactiveIcon}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.SecondaryText,
                    tabBarInactiveTintColor: Color.inactiveIcon,
                }}
            />
            <Tab.Screen name="analytics" component={Analytics}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnalyticsIcon
                            name="signal-cellular-3"
                            color={focused ? Color.SecondaryText : Color.inactiveIcon}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.SecondaryText,
                    tabBarInactiveTintColor: Color.inactiveIcon,

                }}
            />
            <Tab.Screen
                name="profiles"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <UserIcon
                            name="user-circle"
                            color={focused ? Color.SecondaryText : Color.inactiveIcon}
                            size={size}
                        />
                    ),
                    tabBarInactiveTintColor: Color.inactiveIcon,
                    tabBarActiveTintColor: Color.SecondaryText,

                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation

