import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BellIcon from "react-native-vector-icons/Ionicons";
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { ScrollView } from 'react-native-gesture-handler';


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
    return (
        <>
            <ScrollView >
                {Data.map((item, index) => (
                    <View style={{ width: screenDimensions.width, padding: 5 }}>
                        <View key={index} style={styles.notificationContainer}>
                            <View style={styles.notificationContainers}>
                                <View style={styles.bgIconColor}>
                                    <BellIcon name="notifications-outline" size={FontSizes.xxl} color={Color.text} />
                                </View>
                                <View >
                                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.notificationFont}>{item.notification}</Text>
                                    <Text style={styles.notificationNameFont}>{item.name}</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={styles.notificationTime}>  {item.time}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

        </>
    )
}

export default Notifications

const styles = StyleSheet.create({
    bgIconColor: {
        backgroundColor: Color.white,
        borderRadius: 8,
        padding: 6,
        elevation: 8,
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
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 10,
        shadowOffset: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    notificationContainers: {
        maxWidth: screenDimensions.width * 0.7,
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