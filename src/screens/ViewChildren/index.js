import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CardIcon from "react-native-vector-icons/AntDesign";
import BookIcon from "react-native-vector-icons/FontAwesome5";
import { default as CreditCardIcon, default as StackIcon } from "react-native-vector-icons/MaterialCommunityIcons";
import { default as CalendarIcon, default as DetaiIcon } from "react-native-vector-icons/MaterialIcons";
import TopbarWithGraph from '../../components/widget/TopbarWithGraph';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';

const ViewChildren = () => {


    const items = [
        {
            label: 'View Student Details',
            icon: <DetaiIcon name="insert-chart-outlined" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Shedule ',
            icon: <CalendarIcon name="calendar-month" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Attendace',
            icon: <CardIcon name="idcard" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Fees',
            icon: <CreditCardIcon name="credit-card-multiple-outline" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'Homework',
            icon: <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'Progress Report ',
            icon: <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
    ]


    return (
        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <TopbarWithGraph />

                <View style={{ gap: 30, marginTop: 10, paddingHorizontal: 10 }}>

                    {items.map((elem, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.7}>
                            <View style={[styles.viewChildernStaclList, { paddingVertical: 10 }]}>
                                <View style={styles.viewChildernStaclList}>
                                    <View>
                                        {elem.icon}
                                    </View>
                                    <View>
                                        <Text style={styles.stackFont}>{elem.label}</Text>
                                    </View>
                                </View>
                                <View>
                                    <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>

        </ScrollView>

    )
}

export default ViewChildren

const styles = StyleSheet.create({
    viewChildrenContainer: {
        // paddingHorizontal: 10,
        paddingVertical: 10,
    },
    viewChildernStaclList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    stackFont: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.lg,
        color: Color.textThree,
    }



})