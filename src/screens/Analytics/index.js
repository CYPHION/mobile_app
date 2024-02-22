import React, { useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import Pound from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/Fontisto"
import { useSelector } from 'react-redux'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'



const Analytics = ({ navigation }) => {

    const [open, setOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate);
    startOfMonth.setMonth(currentDate.getMonth() - 1);
    startOfMonth.setHours(0, 0, 0, 0); // Set to 12:00 AM

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999); // Set to 11:59:59 PM

    const [date, setDate] = useState({
        endDate: endDate,
        startDate: startOfMonth
    });
    const user = useSelector(state => state?.user?.data)
    const global = useSelector(state => state?.global?.data)
    console.log(global)
    const appoitnment = global?.appointments?.filter(appointment => {
        const appointmentDate = new Date(appointment?.createdAt);
        return appointmentDate >= date.startDate && appointmentDate <= date.endDate;
    });
    let totalAttendance = global?.attendances?.filter(attendance => {
        const attendanceDate = new Date(attendance?.createdAt);
        return attendanceDate >= date.startDate && attendanceDate <= date.endDate;
    });
    const filteredFees = global?.fees?.filter(fee => {
        const feeDate = new Date(fee?.createdAt);
        return feeDate >= date.startDate && feeDate <= date.endDate;
    });

    let boosterFees = filteredFees?.reduce((acc, elem) => elem?.isBooster ? acc + elem?.boosterPaid : acc, 0);
    let totalFee = filteredFees?.reduce((acc, elem) => acc + elem?.amountPaid, 0);

    const filteredStudents = global?.students?.filter(student => {
        const studentDate = new Date(student?.createdAt);
        return studentDate >= date.startDate && studentDate <= date.endDate;
    });

    const filteredDepositFees = global?.depositFee?.filter(depositFee => {
        const depositFeeDate = new Date(depositFee?.createdAt);
        return depositFeeDate >= date.startDate && depositFeeDate <= date.endDate;
    });

    let outStangingFee = filteredStudents?.reduce((acc, elem) => acc + elem.totalDues, 0);
    let totalDepositFee = filteredDepositFees?.reduce((acc, elem) => acc + elem.amountPaid, 0);


    const handleRefresh = () => {
        setRefresh(true)
        // Set the new start and end dates on refresh
        const refreshedStartDate = new Date();
        refreshedStartDate.setMonth(refreshedStartDate.getMonth() - 1);
        refreshedStartDate.setHours(0, 0, 0, 0);

        const refreshedEndDate = new Date();
        refreshedEndDate.setHours(23, 59, 59, 999);

        setDate({
            startDate: refreshedStartDate,
            endDate: refreshedEndDate
        });
        setRefresh(false)
        // Add additional logic or fetch data as needed
        // ...
    };



    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={handleRefresh}
                    refreshing={refresh}
                />
            }
        >
            <View style={styles.viewChildrenContainer}>

                <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <View>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.NameText, styles.textFontFamily, { width: screenDimensions.width * 0.7 }]}>Hi, {user.firstName} {user.lastName}</Text>
                        {/* <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - {user?.feeChargedBy}</Text> */}
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })}>
                        <View style={styles.badge}></View>
                        <Icon name="bell" color={Color.textTwo} size={FontSizes.xxxl} />
                    </TouchableOpacity>
                </View>
                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>Analytics</Text>
                    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                        <View style={[styles.iconView]}>
                            <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                        </View>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', gap: 10, paddingVertical: 10 }}>

                    <View style={styles.analyticBox}>
                        <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                            <Icon name='clock' color={Color.white} size={screenDimensions.width * 0.12} />
                        </View>
                        <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                            <Text style={styles.attendeceFont}>Attendance</Text>
                            <Text style={[styles.totalFont]}>Total : {totalAttendance.length || 0}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                <Text style={[styles.detailInnerText]}>Present: {totalAttendance.filter((item) => item?.attendanceType === 'present').length || 0}</Text>
                                <Text style={[styles.detailInnerText]}>Absent: {totalAttendance.filter((item) => item?.attendanceType === 'absent').length || 0}</Text>
                                <Text style={[styles.detailInnerText]}>Leave: {totalAttendance.filter((item) => item?.attendanceType === 'leave').length || 0}</Text>
                            </View>
                        </View>
                    </View>



                    <View style={styles.analyticBox}>
                        <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                            <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                        </View>
                        <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                            <Text style={styles.attendeceFont}>Total Fees</Text>
                            <Text style={[styles.totalFont]}>Total : £{totalFee}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                {/* <Text style={[styles.detailInnerText]}>Weekly: £70</Text>
                                <Text style={[styles.detailInnerText]}>Monthly: £100</Text> */}
                                <Text style={[styles.detailInnerText]}>Booster: £{boosterFees}</Text>
                                <Text style={[styles.detailInnerText]}>Deposit: £{totalDepositFee}</Text>
                            </View>
                        </View>
                    </View>



                    <View style={styles.analyticBox}>
                        <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                            <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                        </View>
                        <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                            <Text style={styles.attendeceFont}>Outstanding Fees</Text>
                            <Text style={[styles.totalFont]}>Total : £{outStangingFee}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                            </View>
                        </View>
                    </View>



                    <View style={styles.analyticBox}>
                        <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                            <Icon name='clock' color={Color.white} size={screenDimensions.width * 0.12} />
                        </View>
                        <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                            <Text style={styles.attendeceFont}>Appointments</Text>
                            <Text style={[styles.totalFont]}>Total : {appoitnment.length || 0}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                <Text style={[styles.detailInnerText]}>Complete: {appoitnment.filter((item) => item?.status === 'Completed').length || 0}</Text>
                                <Text style={[styles.detailInnerText]}>Pending:  {appoitnment.filter((item) => item?.status === 'Pending').length || 0}</Text>
                                <Text style={[styles.detailInnerText]}>Cancelled:  {appoitnment.filter((item) => item?.status === 'Cancelled').length || 0}</Text>
                                <Text style={[styles.detailInnerText]}>Missed:  {appoitnment.filter((item) => item?.status === 'Missed').length || 0}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>

            <CustomDatePicker
                isVisible={open}
                onToggle={() => setOpen(false)}
                onDone={(date) => setDate(date)}
            />

        </ScrollView>
    )
}

export default Analytics

const styles = StyleSheet.create({
    viewChildrenContainer: {
        backgroundColor: Color.white,
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
    attendeceFont: {
        fontSize: FontSizes.md,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
    totalFont: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.interBold,
        color: Color.text
    },
    analyticBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: screenDimensions.width * 0.92,
        // backgroundColor: 'pink',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        backgroundColor: Color.white,
        borderRadius: 10,
        height: screenDimensions.fontScale * 110,
        overflow: "hidden"
    },
    detailInnerText: {
        fontSize: FontSizes.md,
        fontFamily: FontFamily.interRegular,
        color: Color.textThree,
        marginRight: 10
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.black,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2,
        zIndex: 10
    }
})