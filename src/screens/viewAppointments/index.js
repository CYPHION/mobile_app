import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardIcon from "react-native-vector-icons/AntDesign";
import FilterIcon from "react-native-vector-icons/FontAwesome";
import BookIcon, { default as CalendarIcon, default as CapIcon } from 'react-native-vector-icons/FontAwesome5';
import GridIcon from 'react-native-vector-icons/Ionicons';
import { default as NoHomework } from "react-native-vector-icons/MaterialCommunityIcons";
import TimeIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { API } from '../../network/API';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { customToast, formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const ViewAppointments = () => {
    const userData = useSelector(state => state.user.data);
    const [data, setData] = useState([])
    const list = (elem) => [
        {
            name: " Title",
            value: `${elem?.subject}`,
            icon: <CardIcon color={Color.primary} name="idcard" size={FontSizes.lg} />,
        },
        {
            name: " Department",
            value: `${elem?.DepartmentAppointments.map(
                (elem) => elem?.Department?.name
            ).join("\n")}`,
            icon: <BookIcon color={Color.primary} name="book" size={FontSizes.lg} />,
        },
        {
            name: " Date",
            value: `${elem?.appointDate}`,
            icon: (
                <TimeIcon color={Color.primary} name="timelapse" size={FontSizes.lg} />
            ),
        },
        {
            name: " Time",
            value: `${formattedDate(
                `${elem.appointDate}T${elem.startTime}`,
                "hh:mm:z"
            )} to ${formattedDate(`${elem.appointDate}T${elem.endTime}`, "hh:mm:z")}`,
            icon: <GridIcon color={Color.primary} name="grid" size={FontSizes.lg} />,
        },
        {
            name: " Status",
            value: `${elem?.status}`,
            icon: (
                <CapIcon
                    color={Color.primary}
                    name="graduation-cap"
                    size={FontSizes.lg}
                />
            ),
        },
        {
            name: " Remarks",
            value: `${elem?.remarks}`,
            icon: (
                <CalendarIcon
                    color={Color.primary}
                    name="calendar-check"
                    size={FontSizes.lg}
                />
            ),
        },
    ];

    const getData = () => {
        API.getAllApointment(userData?.id)
            .then(res => setData(res?.data))
            .catch(err => customToast('error', err))
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <ScrollView>

            {data.length > 0 ?
                <>
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
                        {data.length > 0 && data.map((elem, index) => (
                            <Table key={index} list={list(elem)} />
                        ))}

                    </View>
                </>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                    <View>
                        <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                        <Text style={styles.inactivetext}>No Appointment found</Text>
                    </View>
                </View>}

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
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }


})