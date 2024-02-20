import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Idcard from "react-native-vector-icons/AntDesign"
import CalendarTimeIcon from "react-native-vector-icons/FontAwesome"
import BookIcon from "react-native-vector-icons/FontAwesome5"
import CalendarIcon from "react-native-vector-icons/FontAwesome6"
import GridIcon from "react-native-vector-icons/Ionicons"
import CalendarCheckIcon from "react-native-vector-icons/MaterialCommunityIcons"
import TimeIcon from "react-native-vector-icons/MaterialIcons"
import Table from '../../components/base/Table'
import TableSkeleton from '../../components/base/TableSkeleton'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontSizes } from '../../utils/font'



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
            <View>


                <TopbarWithGraph />


                <View>
                    {item.map((elem, index) => (
                        <TableSkeleton
                            key={index}
                            list={elem.list}
                        />
                    ))}

                    {item.map((elem, index) => (
                        <Table
                            key={index}
                            list={elem.list}
                        />
                    ))}
                </View>
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


})