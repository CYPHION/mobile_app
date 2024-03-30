import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BellIcon from "react-native-vector-icons/Ionicons";
import { API } from '../../network/API';
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
    const getNotification = () => {
        API.getAllNotification()
            .then((res) => setData(res?.data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getNotification()
    }, [])

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView >
                    <View style={GlobalStyles.p_10}>
                        {data?.map((item, index) => (
                            <View key={index} style={{ width: '100%', padding: 5 }}>
                                <View key={index} style={[styles.notificationContainer, GlobalStyles.p_10]}>
                                    <View style={styles.notificationContainers}>
                                        <View style={styles.bgIconColor}>
                                            <BellIcon name="notifications-outline" size={FontSizes.xxl} color={Color.text} />
                                        </View>
                                        <View >
                                            {/* <Text ellipsizeMode="tail" numberOfLines={1} style={styles.notificationFont}>{item?.subType}</Text> */}
                                            <Text numberOfLines={2} style={styles.notificationNameFont}>{item?.message}</Text>
                                            <Text style={[styles.notificationTime, { marginTop: 5 }]}>{moment(item?.time).fromNow()}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>

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
    },
    notificationTime: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
        color: Color.textThree,
    }

})