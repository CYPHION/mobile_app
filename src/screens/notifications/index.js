import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import BellIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/base/LoadingScreen';
import { API } from '../../network/API';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

const Notifications = () => {
    const { width } = useWindowDimensions(); // Get the width of the window
    const [data, setData] = useState([])
    const [activeItem, setActiveItem] = useState(null);
    const [active, setActive] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = useSelector(state => state?.user?.data)
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()

    // Function to toggle the active item (expand/collapse notification)
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };
    // Function to fetch notification data
    const getNotification = () => {
        setActive(true); // Set active state to true before starting data fetching

        const query = `?to=${user?.id}`;

        // Fetch both notifications and handle results regardless of success or failure
        Promise.allSettled([
            API.getNotifications(query),
            API.getAllNotification(user?.id)
        ])
            .then((results) => {
                // Initialize an empty array
                let arr = [];

                // Iterate through the results of both promises
                results.forEach(result => {
                    if (result.status === 'fulfilled' && result.value?.data) {
                        arr = arr.concat(result.value.data);
                    }
                });

                // Sort the array by createdAt property if there's any data
                if (arr.length > 0) {
                    arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                // Update the state with the sorted data
                setData(arr);
            })
            .catch((err) => {
                console.log(err); // Log any errors (this will log if there's an error in the .then block)
            })
            .finally(() => {
                setActive(false); // Set active state to false once data fetching is completed
                setRefreshing(false)
            });
    }

    // Function to handle refreshing of notification data
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(globalData(user?.id))
            .then(() => {
                getNotification();
            })
            .catch(() => {
                getNotification();
            });
    }, [dispatch, user?.id]); // Added dependencies here

    // Effect to fetch notification data when the component mounts


    // function to request for notification permission
    const requestPostNotificationsPermission = async () => {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().hasPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            } else {
                Alert.alert(
                    "Notifications Permission",
                    "Please enable notifications in the app settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Post notifications permission allowed");
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Alert.alert(
                    "Notifications Permission",
                    "You have permanently denied notification permission. Please enable it in the app settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            } else {
                console.log("Post notifications permission denied");
            }
        }
    };



    useEffect(() => {
        getNotification()
        requestPostNotificationsPermission()
    }, [])

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <LoadingScreen loading={active} />
                <ScrollView
                    refreshControl={<RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />}
                >
                    <View style={GlobalStyles.p_10}>
                        {data?.length > 0 ? <>
                            {data?.map((item, index) => (
                                <TouchableOpacity onPress={() => toggleItem(index)} activeOpacity={1} key={index} style={{ width: '100%', padding: 5 }}>
                                    <View key={index} style={[styles.notificationContainer, GlobalStyles.p_10]}>
                                        <View style={[styles.notificationContainers]}>
                                            <View style={styles.bgIconColor}>
                                                <BellIcon name="notifications-outline" size={FontSizes.xxl} color={Color.text} />
                                            </View>
                                            <View >
                                                {/* <Text ellipsizeMode="tail" numberOfLines={1} style={styles.notificationFont}>{item?.subType}</Text> */}
                                                <RenderHtml
                                                    source={{ html: item?.message }}
                                                    contentWidth={width}
                                                    baseStyle={styles.notificationNameFont}
                                                    enableExperimentalMarginCollapsing={true}
                                                />

                                                <Text style={[styles.notificationTime, { marginTop: 5 }]}>{moment(item?.createdAt).fromNow()}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </> :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                                <View>
                                    <BellIcon name='notifications-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                                    <Text style={styles.inactivetext}>No Notifications found</Text>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >

        </>
    )
}

export default Notifications

const styles = StyleSheet.create({
    bgIconColor: {
        backgroundColor: Color.white,
        borderRadius: 8,
        padding: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // Set a lower opacity for a subtle shadow
        shadowRadius: 1, // Set a lower radius for a less spread shadow
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.white,
        elevation: 1,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: 2,
        borderRadius: 5,
        alignItems: 'center'
    },
    notificationContainers: {
        maxWidth: screenDimensions.width,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center'
    },
    notificationFont: {
        maxWidth: screenDimensions.width * 0.6,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg,
        color: Color.text,

    },
    notificationNameFont: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.textThree,
        width: screenDimensions.width * 0.7
    },
    notificationTime: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
        color: Color.primary,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    },

})