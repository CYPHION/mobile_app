import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BellIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/base/LoadingScreen';
import { API } from '../../network/API';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

const Data = [
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "1 min ago",
    },
    {
        notification: "Your Lesson is ",
        name: "Amir Khan",
        time: "2 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Amir Khan",
        time: "4 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "6 min ago",
    },
    {
        notification: "Your Lesson is Pending! fasffgff agahgds as hshsrh",
        name: "Hassan Khan",
        time: "8 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "10 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Amir Khan",
        time: "11 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Areeb Khan",
        time: "12 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "13 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "12 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Amir Khan",
        time: "13 min ago",
    },
    {
        notification: "Your Lesson is Pending!",
        name: "Hassan Khan",
        time: "18 min ago",
    },
]

const Notifications = () => {
    const [data, setData] = useState([])
    const [activeItem, setActiveItem] = useState(null);
    const [active, setActive] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = useSelector(state => state?.user?.data)
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()


    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };

    const getNotification = () => {
        API.getAllNotification(user?.id)
            .then((res) => setData(res?.data))
            .catch((err) => console.log(err))
            .finally(() => setActive(false))
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(globalData(user?.id))
            .then(() => {
                getNotification()
                setRefreshing(false); // Set refreshing to false after data fetching is completed
            })
            .catch(() => {
                getNotification()
                setRefreshing(false); // Ensure refreshing is set to false even if there's an error
            });
    }, [])

    useEffect(() => {
        getNotification()
    }, [])

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={<RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />}
                >
                    <LoadingScreen loading={active} />
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
                                                <Text numberOfLines={activeItem === index ? null : 2} style={[styles.notificationNameFont]}>{item?.message}</Text>
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
        shadowRadius: 2, // Set a lower radius for a less spread shadow
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.white,
        elevation: 1,
        shadowColor: 'black',
        shadowOpacity: 2,
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
        color: Color.textThree,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    },

})