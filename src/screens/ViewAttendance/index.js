import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import Icon from "react-native-vector-icons/Ionicons"
import CustomDatePicker from '../../components/base/CustomDatePicker'
import Table from '../../components/base/Table'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const ViewAttendance = () => {


    const [open, setOpen] = useState(false)
    const navigation = useNavigation()

    const list = [
        { name: ' Department Name', value: 'Maths', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Subject', value: 'Algebra', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Type', value: 'Present', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Category', value: 'Regular lesson', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Teacher Name', value: 'Ahsan Iqbal', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Day', value: 'Mon 1, jun-2024', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Time', value: '03:30 PM - 05:00 PM', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },
        { name: ' Marked At', value: '5:29:10 AM', icon: <Icon color={Color.primary} name='home' size={FontSizes.xl} /> },

    ]


    const items = [
        {
            list,

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