import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardIcon from "react-native-vector-icons/AntDesign"
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import CapIcon from 'react-native-vector-icons/FontAwesome5'
import { default as BookIcon } from 'react-native-vector-icons/FontAwesome6'
import { default as GridIcon, default as Icon } from "react-native-vector-icons/Ionicons"
import TimeIcon from 'react-native-vector-icons/MaterialIcons'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import Table from '../../components/base/Table'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'



const ViewAttendance = () => {


    const [open, setOpen] = useState(false)
    const navigation = useNavigation()

    const list = [
        { name: ' Department Name', value: 'Maths', icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },
        { name: ' Subject', value: 'Algebra', icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Type', value: 'Present', icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        { name: ' Category', value: 'Regular lesson', icon: <CapIcon color={Color.primary} name='graduation-cap' size={FontSizes.lg} /> },
        { name: ' Teacher Name', value: 'Ahsan Iqbal', icon: <Icon color={Color.primary} name='home' size={FontSizes.lg} /> },
        { name: ' Day', value: 'Mon 1, jun-2024', icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Time', value: '03:30 PM - 05:00 PM', icon: <TimeIcon color={Color.primary} name='timelapse' size={FontSizes.lg} /> },
        { name: ' Marked At', value: '5:29:10 AM', icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },

    ]


    const items = [
        {
            list,

        },
        {
            list
        },
        {
            list
        },

    ]


    return (
        <ScrollView>
            <View style={styles.viewChildrenContainer}>
                <TopbarWithGraph />

                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Student Details</Text>
                    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                        <View style={[styles.iconView]}>
                            <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                        </View>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {items.map((elem, index) => (
                        <Table key={index} status={elem.status} list={elem.list} />
                    ))}
                </View>
            </View>
            <CustomDatePicker
                isVisible={open}
                onToggle={() => setOpen(false)}
                onDone={(date) => console.log(date)}
            />
        </ScrollView>
    )
}

export default ViewAttendance

const styles = StyleSheet.create({
    viewChildrenContainer: {
        // paddingHorizontal: 10,
        backgroundColor: Color.white,
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
    iconView: {
        backgroundColor: Color.primary,
        padding: 5,
        borderRadius: 4
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.black,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2
    }
})