import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardIcon from "react-native-vector-icons/AntDesign";
import FilterIcon from "react-native-vector-icons/FontAwesome";
import BookIcon, { default as CalendarIcon, default as CapIcon } from 'react-native-vector-icons/FontAwesome5';
import GridIcon from 'react-native-vector-icons/Ionicons';
import TimeIcon from 'react-native-vector-icons/MaterialIcons';
import Table from '../../components/base/Table';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { GlobalStyles } from '../../utils/globalStyles';


const ViewAppointments = () => {
    const list = [
        { name: ' Title', value: 'Meeting One', icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },
        { name: ' Department', value: 'English', icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Date', value: '04-02-2024 lesson', icon: <TimeIcon color={Color.primary} name='timelapse' size={FontSizes.lg} /> },
        { name: ' Time', value: '3:30 PM', icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        { name: ' Status', value: 'Pending', icon: <CapIcon color={Color.primary} name='graduation-cap' size={FontSizes.lg} /> },
        { name: ' Remarks', value: 'These are the Remarks...', icon: <CalendarIcon color={Color.primary} name='calendar-check' size={FontSizes.lg} /> },

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

            <View style={[GlobalStyles.headerStyles]}>
                <Text style={GlobalStyles.headerTextStyle}>Analytics</Text>
                <TouchableOpacity activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
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

        </ScrollView >
    )
}

export default ViewAppointments

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    CompText: {
        color: Color.text
    }


})