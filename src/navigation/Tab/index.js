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
import ChangePasswordScreen from '../../screens/ChangePassword';
import HomeWorkSkeleton from '../../screens/HomeWork/HomeWorkSkeleton';
import Profile from '../../screens/Profile';
import ViewAllStudents from '../../screens/viewAllStudents';
import ViewAllStudentsSkeleton from '../../screens/viewAllStudents/viewAllStudentSkeleton';
import ViewProgress from '../../screens/viewProgress';
import { Color } from '../../utils/color';

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
            }}
        >
            <Tab.Screen name="receipt" component={ViewProgress}
                options={{
                    tabBarLabel: 'Receipt',
                    tabBarIcon: ({ color, size, focused }) => (
                        <ReceiptIcon
                            name="receipt"
                            color={focused ? Color.primary : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    headerShown: true,
                    headerTitle: 'View Fee Receipt'
                }}
            />
            <Tab.Screen name="fee" component={HomeWorkSkeleton}
                options={{
                    tabBarLabel: 'Fee',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CardIcon
                            name="card"
                            color={focused ? Color.primary : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,
                    headerShown: true,
                    headerTitle: 'Student Fees'

                }}
            />
            <Tab.Screen name="home" component={ViewAllStudentsSkeleton}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon
                            name="home"
                            color={focused ? Color.primary : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary
                }}
            />
            <Tab.Screen name="analytics" component={ViewAllStudents}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnalyticsIcon
                            name="signal-cellular-3"
                            color={focused ? Color.primary : color}
                            size={size} />
                    ),
                    tabBarActiveTintColor: Color.primary,

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
                            color={focused ? Color.primary : color}
                            size={size}
                        />
                    ),
                    tabBarActiveTintColor: Color.primary,

                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation

