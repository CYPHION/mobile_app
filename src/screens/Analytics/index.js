import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import Pound from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/Fontisto"
import { useDispatch, useSelector } from 'react-redux'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'
import AnalyticsSkeleton from './AnalyticSkeleton'



const Analytics = ({ navigation }) => {

    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [appointment, setAppointment] = useState([])
    const [totalAttendance, setTotalAttendance] = useState([])
    const [boosterFees, setBoosterFees] = useState(0)
    const [totalFee, setTotalFee] = useState(0)
    const [outStangingFee, setOutStangingFee] = useState([])
    const [totalDepositFee, setTotalDepositFee] = useState(0)

    // Date calculations
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate); // Start date of the current month
    startOfMonth.setMonth(currentDate.getMonth() - 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate); // End date of the current month
    endDate.setHours(23, 59, 59, 999);

    const [date, setDate] = useState({ // State for date range selection
        startDate: startOfMonth,
        endDate: endDate,
    });


    const user = useSelector(state => state?.user?.data);
    const global = useSelector(state => state?.global?.data);

    const dispatch = useDispatch()
    // Function to filter data by date range
    const filterByDate = (data, startDate, endDate) => {
        return data?.filter(item => {
            const itemDate = new Date(item?.createdAt); // Assuming createdAt field represents the date of the item
            return itemDate >= startDate && itemDate <= endDate;
        });
    };


    const handelFilter = (startDate, endDate) => {
        // Filter appointments, attendances, fees, students, and deposit fees based on the date range
        // setAppointment(filterByDate(global?.appointments, startDate, endDate));
        // setTotalAttendance(filterByDate(global?.attendances, startDate, endDate));
        // const filteredFees = filterByDate(global?.fees, startDate, endDate);
        // // Calculate booster fees and total fee based on filtered fees
        // setBoosterFees(filteredFees?.reduce((acc, elem) => {
        //     if (elem?.isBooster) {
        //         return acc + elem?.boosterPaid;
        //     }
        //     return acc;
        // }, 0));

        // setTotalFee(filteredFees?.reduce((acc, elem) => acc + elem?.amountPaid, 0));
        // // Calculate outstanding fee based on filtered students and total deposit fee based on filtered deposit fees
        // const filteredDepositFees = filterByDate(global?.depositFee, startDate, endDate);
        // setTotalDepositFee(filteredDepositFees?.reduce((acc, elem) => acc + elem.amountPaid, 0));
        const filteredStudents = filterByDate(global?.students, startDate, endDate);

        setOutStangingFee(filteredStudents?.reduce((acc, elem) => acc + elem.totalDues, 0));
    }

    const getAppointments = () => {
        const currentDate = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

        const filteredAppointments = global?.appointments?.filter(appointment => {
            const appointmentDate = new Date(appointment.createdAt);
            return appointmentDate >= twelveMonthsAgo && appointmentDate <= currentDate;
        });

        setAppointment(filteredAppointments);
    };

    // Fetch attendances of last 13 weeks
    const getAttendance = () => {
        const currentDate = new Date();
        const thirteenWeeksAgo = new Date();
        thirteenWeeksAgo.setDate(currentDate.getDate() - 13 * 7);

        const filteredAttendances = global?.attendances?.filter(attendance => {
            const attendanceDate = new Date(attendance.createdAt);
            return attendanceDate >= thirteenWeeksAgo && attendanceDate <= currentDate;
        });

        setTotalAttendance(filteredAttendances);
    };

    // Calculate fees for last 12 months
    const calculateFeesForLast12Months = () => {
        const currentDate = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

        const filteredFees = global?.fees?.filter(fee => {
            const feeDate = new Date(fee.createdAt);
            return feeDate >= twelveMonthsAgo && feeDate <= currentDate;
        });

        // Calculate booster fees
        const calculatedBoosterFees = filteredFees?.reduce((acc, elem) => {
            if (elem?.isBooster) {
                return acc + elem?.boosterPaid;
            }
            return acc;
        }, 0);

        // Calculate total fees
        const calculatedTotalFee = filteredFees?.reduce((acc, elem) => acc + elem?.amountPaid, 0);

        // Filter deposit fees from the last 12 months
        const filteredDepositFees = global?.depositFee?.filter(deposit => {
            const depositDate = new Date(deposit.createdAt);
            return depositDate >= twelveMonthsAgo && depositDate <= currentDate;
        });

        // Calculate total deposit fees
        const calculatedTotalDepositFee = filteredDepositFees?.reduce((acc, elem) => acc + elem.amountPaid, 0);

        setBoosterFees(calculatedBoosterFees);
        setTotalFee(calculatedTotalFee);
        setTotalDepositFee(calculatedTotalDepositFee);
    };

    const handleRefresh = () => {
        // Set refreshing to true to indicate data fetching
        setRefresh(true);
        // Set start and end dates for the refreshed date range
        const refreshedStartDate = new Date();
        refreshedStartDate.setMonth(refreshedStartDate.getMonth() - 1);
        refreshedStartDate.setHours(0, 0, 0, 0);

        const refreshedEndDate = new Date();
        refreshedEndDate.setHours(23, 59, 59, 999);
        // Set the date state to the refreshed date range
        setDate({
            startDate: refreshedStartDate,
            endDate: refreshedEndDate,
        });
        // Dispatch action to fetch updated global data
        dispatch(globalData(user?.id))
            .then(() => {
                // Filter data based on the refreshed date range
                handelFilter(refreshedStartDate, refreshedEndDate)
                // Set refreshing to false after data fetching is completed
                setRefresh(false); // Set refreshing to false after data fetching is completed
            })
            .catch(() => {
                // Ensure refreshing is set to false even if there's an error
                setRefresh(false); // Ensure refreshing is set to false even if there's an error
            })
    };
    // Fetch data initially when the component mounts
    useEffect(() => {
        getAppointments();
        getAttendance();
        calculateFeesForLast12Months();
    }, [global?.appointments, global?.attendances, global?.fees, global?.depositFee]); // Re-run when global data changes

    useEffect(() => {
        handelFilter(date.startDate, date.endDate)
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }
            >
                {(!!user?.email && !!global?.students && !!global?.attendances && !!global?.fees && !!global?.appointments && !!global?.depositFee) ? <>
                    <View style={styles.viewChildrenContainer}>


                        <View style={[GlobalStyles.headerStyles]}>
                            <Text style={GlobalStyles.headerTextStyle}>Analytics</Text>
                            {/* <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                                <View style={[styles.iconView]}>
                                    <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                                </View>
                                <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                            </TouchableOpacity> */}
                        </View>

                        <View style={{ alignItems: 'center', gap: 10, paddingVertical: 10 }}>

                            <View style={styles.analyticBox}>
                                <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                    <Icon name='clock' color={Color.white} size={screenDimensions.width * 0.12} />
                                </View>
                                <View style={[{ width: '75%' }]} >
                                    <Text style={styles.attendeceFont}>Attendance</Text>
                                    <View style={{ padding: 5, paddingHorizontal: 10 }}>
                                        <Text style={[styles.totalFont]}>Total : {totalAttendance?.length || 0}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                            <Text style={[styles.detailInnerText]}>Present: {totalAttendance?.filter((item) => item?.attendanceType === 'present')?.length || 0}</Text>
                                            <Text style={[styles.detailInnerText]}>Absent: {totalAttendance?.filter((item) => item?.attendanceType === 'absent')?.length || 0}</Text>
                                            <Text style={[styles.detailInnerText]}>Leave: {totalAttendance?.filter((item) => item?.attendanceType === 'leave')?.length || 0}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={styles.analyticBox}>
                                <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                    <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                                </View>
                                <View style={[{ width: '75%' }]} >
                                    <Text style={styles.attendeceFont}>Total Fees</Text>
                                    <View style={{ padding: 5, paddingHorizontal: 10 }}>
                                        <Text style={[styles.totalFont]}>Total : £{totalFee}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                            <Text style={[styles.detailInnerText]}>Booster: £{boosterFees}</Text>
                                            <Text style={[styles.detailInnerText]}>Deposit: £{totalDepositFee}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.analyticBox}>
                                <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                    <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                                </View>
                                <View style={[{ width: '75%' }]} >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={[styles.attendeceFont, { paddingRight: 2 }]}>Outstanding Fees</Text>
                                        <View style={{}}>
                                            <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                                                <View style={[styles.iconView]}>
                                                    <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                                                </View>
                                                <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ padding: 5, paddingHorizontal: 10 }}>
                                        <Text style={[styles.totalFont]}>Total : £{outStangingFee}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.analyticBox}>
                                <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                    <Icon name='clock' color={Color.white} size={screenDimensions.width * 0.12} />
                                </View>
                                <View style={[{ width: '75%' }]} >
                                    <Text style={[styles.attendeceFont]}>Appointments</Text>
                                    <View style={{ padding: 5, paddingHorizontal: 10 }}>
                                        <Text style={[styles.totalFont]}>Total : {appointment?.length || 0}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                            <Text style={[styles.detailInnerText]}>Complete: {appointment?.filter((item) => item?.status === 'Completed')?.length || 0}</Text>
                                            <Text style={[styles.detailInnerText]}>Pending:  {appointment?.filter((item) => item?.status === 'Pending')?.length || 0}</Text>
                                            <Text style={[styles.detailInnerText]}>Cancelled:  {appointment?.filter((item) => item?.status === 'Cancelled')?.length || 0}</Text>
                                            <Text style={[styles.detailInnerText]}>Missed:  {appointment?.filter((item) => item?.status === 'Missed')?.length || 0}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                    <CustomDatePicker
                        isVisible={open}
                        onToggle={() => setOpen(false)}
                        onDone={(date) => {
                            setDate(date)
                            handelFilter(date.startDate, date.endDate)
                        }}
                    />
                </> :
                    <AnalyticsSkeleton />}
            </ScrollView>
        </SafeAreaView>
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
        fontSize: FontSizes.sm,
        color: Color.text,
        marginRight: 10
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
        fontFamily: FontFamily.bold,
        backgroundColor: Color.grayBackground,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    totalFont: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.interBold,
        color: Color.primary
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