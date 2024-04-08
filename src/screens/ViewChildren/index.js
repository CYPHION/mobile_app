import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CardIcon from "react-native-vector-icons/AntDesign";
import BookIcon from "react-native-vector-icons/FontAwesome5";

import { useRoute } from '@react-navigation/native';
import StackIcon from "react-native-vector-icons/AntDesign";
import { default as CreditCardIcon } from "react-native-vector-icons/MaterialCommunityIcons";
import { default as CalendarIcon, default as DetaiIcon } from "react-native-vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
import TopbarWithGraph from '../../components/widget/TopbarWithGraph';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { GlobalStyles } from '../../utils/globalStyles';

const items = [
    {
        label: 'View Student Details',
        icon: <DetaiIcon name="insert-chart-outlined" size={FontSizes.xl} color={Color.primary} />,
        path: 'studentDetail'
    },
    {
        label: 'View Shedule ',
        icon: <CalendarIcon name="calendar-month" size={FontSizes.xl} color={Color.primary} />,
        path: 'studentSchedule'
    },
    {
        label: 'View Attendace',
        icon: <CardIcon name="idcard" size={FontSizes.xl} color={Color.primary} />,
        path: 'studentAttendance'
    },
    {
        label: 'View Fees',
        icon: <CreditCardIcon name="credit-card-multiple-outline" size={FontSizes.xl} color={Color.primary} />,
        path: 'fee',
        mainRoute: 'tabs'
    },
    {
        label: 'Homework',
        icon: <BookIcon name="book" size={FontSizes.xl} color={Color.primary} />,
        path: 'studentHomework'
    },
    {
        label: 'Progress Report ',
        icon: <BookIcon name="book" size={FontSizes.xl} color={Color.primary} />,
        path: 'studentReport'
    },
]

const ViewChildren = ({ navigation }) => {

    const router = useRoute()
    const globalData = useSelector(state => state?.global?.data)

    const { id } = router.params

    const studentObj = globalData?.students?.find(elem => elem.id === id)

    const selectedAttributes = studentObj ? studentObj
        : null;

    const studentName = studentObj ? studentObj?.fullName : ''




    useEffect(() => {
        navigation.setParams({ title: studentName })
    }, [navigation, studentName]);



    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

                <View style={styles.viewChildrenContainer}>
                    <TopbarWithGraph student={selectedAttributes} />

                    <View style={{ gap: 10, marginTop: 10, paddingHorizontal: 10 }}>

                        {items?.map((elem, index) => (
                            <TouchableOpacity style={[GlobalStyles.r_10, GlobalStyles.p_10,]} key={index} activeOpacity={0.7} onPress={() => navigation.navigate(elem.path, { student: selectedAttributes })}>
                                <View style={[styles.viewChildernStaclList]}>
                                    <View style={styles.viewChildernStaclList}>
                                        <View style={[styles.bgIconColor]}>
                                            {elem.icon}
                                        </View>
                                        <View>
                                            <Text style={styles.stackFont}>{elem.label}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <StackIcon name="right" size={FontSizes.xl} color={Color.iconColor} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

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
    },
    bgIconColor: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 8,
        padding: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // Set a lower opacity for a subtle shadow
        shadowRadius: 2, // Set a lower radius for a less spread shadow
    },
    borderStyle: {
        borderWidth: 1,
        borderColor: Color.textThree
    }


})