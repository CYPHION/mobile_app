import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import { default as Icon, default as MenuIcon } from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import ReceiptIcon from 'react-native-vector-icons/FontAwesome6';
import CardIcon from 'react-native-vector-icons/Ionicons';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAppBar from '../../components/base/CustomAppBar';
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
// its child navigation of profile tab in this tab there are two screens first Profile Page and second one is Change Password Screen 
const ProfileStack = () => {
    return <StackProfile.Navigator
        initialRouteName='profile'
    >
        <StackProfile.Screen name="profile" component={Profile}
            options={{
                headerShown: true,
                header: () => <CustomAppBar back={false} title={'Profile'} />

            }} />
        <StackProfile.Screen name="changePassword" component={ChangePasswordScreen}
            options={{
                headerShown: true,
                header: () => <CustomAppBar title={'Change Password'} />
            }}
        />
    </StackProfile.Navigator>
}

// its navigation of bottom tabs in this tab there are five screens 
// 1) Fees Receipt
// 2) Pay Fees
// 3) Home
// 4) Analytics
// 5) Profile

const TabNavigation = ({ old }) => {


    const navigation = useNavigation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        //its function when user press back it send user to home screen
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
                            color={focused ? Color.primary : Color.text}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.text,
                    headerShown: true,
                    headerTitle: 'View Fee Receipt',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={[{ padding: 10, borderRadius: 50, marginEnd: 10 }]}>
                            <MenuIcon name='menu' size={FontSizes.xxxl} color={Color.text} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="fee" component={FeeCollection}
                options={{
                    tabBarLabel: 'Pay Fee',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CardIcon
                            name="card"
                            color={focused ? Color.primary : Color.text}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.text,
                    headerShown: true,
                    headerTitle: 'Pay Fees',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={[{ padding: 10, borderRadius: 50, marginEnd: 10 }]}>
                            <MenuIcon name='menu' size={FontSizes.xxxl} color={Color.text} />
                        </TouchableOpacity>
                    ),

                }}
            />
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon
                            name="home"
                            color={focused ? Color.primary : Color.text}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.text,
                }}
            />
            <Tab.Screen name="analytics" component={Analytics}
                options={{
                    headerShown: true,
                    headerTitle: 'Analytics',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={[{ padding: 10, borderRadius: 50, marginEnd: 10 }]}>
                            <MenuIcon name='menu' size={FontSizes.xxxl} color={Color.text} />
                        </TouchableOpacity>
                    ),
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnalyticsIcon
                            name="signal-cellular-3"
                            color={focused ? Color.primary : Color.text}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.text,

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
                            color={focused ? Color.primary : Color.text}
                            size={size}
                        />
                    ),
                    tabBarInactiveTintColor: Color.text,
                    tabBarActiveTintColor: Color.primary,

                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation

