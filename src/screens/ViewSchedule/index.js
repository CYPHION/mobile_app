import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import Table from '../../components/base/Table'
import BookIcon from "react-native-vector-icons/FontAwesome5";
import Idcard from "react-native-vector-icons/AntDesign";
import CalendarIcon from "react-native-vector-icons/FontAwesome6";
import TimeIcon from "react-native-vector-icons/MaterialIcons";
import CalendarCheckIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarTimeIcon from "react-native-vector-icons/FontAwesome";
import GridIcon from "react-native-vector-icons/Ionicons";



const ViewSchedule = () => {
    const list = [
        {
            name: "Department Name",
            value: 'Math',
            icon: <Idcard name="idcard" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "Lesson",
            value: 'Algebra',
            icon: <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "Schedule Days",
            value: 'Monday',
            icon: <CalendarIcon name="calendar-days" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "Time",
            value: '02:00 PM - 03:30 PM',
            icon: <TimeIcon name="timelapse" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "Start Date",
            value: 'Dec 30-2024',
            icon: <CalendarCheckIcon name="calendar-multiple-check" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "End Date",
            value: 'May 31-2024',
            icon: <CalendarTimeIcon name="calendar-times-o" size={FontSizes.xl} color={Color.iconColor} />,
        },
        {
            name: "Category",
            value: 'Regular Lesson',
            icon: <GridIcon name="grid" size={FontSizes.xl} color={Color.iconColor} />,
        },

    ]

    const item = [
        {
            list
        },
        {
            list
        },
        {
            list
        }, {
            list
        }
    ]
    return (
        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <View>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                </View>

                <View style={{ backgroundColor: Color.primary, marginTop: 20, width: 370, height: 180, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: "black", fontSize: 20, }}>Map Area</Text>
                </View>
            </View>


            <View>
                {item.map((elem, index) => (
                    <Table
                        key={index}
                        list={elem.list}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

export default ViewSchedule

const styles = StyleSheet.create({
    viewChildrenContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
    },

})