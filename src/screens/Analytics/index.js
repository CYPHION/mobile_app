import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import Pound from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/Fontisto"
import NotificationIcon from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'
import AnalyticsSkeleton from './AnalyticSkeleton'



const Analytics = ({ navigation }) => {

    const [open, setOpen] = useState(false)
    const [appointments, setAppointments] = useState([])
    const user = useSelector(state => state?.user?.data)
    const global = useSelector(state => state?.global?.data)
    console.log('first', global)
    const getData = () => {
        API.getAllApointment(user.id)
            .then(res => setAppointments(res.data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getData()
    }, [])



    const globaldata = useSelector(state => state?.global?.data)

    // console.log(global?.fees?.filter((item) => item.payType === 'Deposit'))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(!!globaldata?.students && !!user?.email) ? <ScrollView>
                <View style={styles.viewChildrenContainer}>

                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                        <View>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.NameText, styles.textFontFamily, { width: screenDimensions.width * 0.7 }]}>Hi, {user.firstName} {user.lastName}</Text>
                            {/* <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - {user?.feeChargedBy}</Text> */}
                        </View>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                            <View style={styles.badge}></View>
                            <NotificationIcon name="notifications-outline" size={FontSizes.xxxl} color={Color.black} />
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
                                <Text style={[styles.totalFont]}>Total : {global?.attendances?.length}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                    <Text style={[styles.detailInnerText]}>Present: {global?.attendances?.filter((item) => item?.attendanceType === 'present').length}</Text>
                                    <Text style={[styles.detailInnerText]}>Absent: {global?.attendances?.filter((item) => item?.attendanceType === 'absent').length}</Text>
                                    <Text style={[styles.detailInnerText]}>Leave: {global?.attendances?.filter((item) => item?.attendanceType === 'leave').length}</Text>
                                </View>
                            </View>
                        </View>



                        <View style={styles.analyticBox}>
                            <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                            </View>
                            <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                                <Text style={styles.attendeceFont}>Total Fees</Text>
                                <Text style={[styles.totalFont]}>Total : 3</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                    <Text style={[styles.detailInnerText]}>Weekly: £70</Text>
                                    <Text style={[styles.detailInnerText]}>Monthly: £100</Text>
                                    <Text style={[styles.detailInnerText]}>Booster: £50</Text>
                                    <Text style={[styles.detailInnerText]}>Deposit: £0</Text>
                                </View>
                            </View>
                        </View>



                        <View style={styles.analyticBox}>
                            <View style={{ backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', width: '25%' }}>
                                <Pound name='pound-sign' color={Color.white} size={screenDimensions.width * 0.12} />
                            </View>
                            <View style={[GlobalStyles.p_10, { width: '75%' }]} >
                                <Text style={styles.attendeceFont}>Outstanding Fees</Text>
                                <Text style={[styles.totalFont]}>Total : 3</Text>
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
                                <Text style={[styles.totalFont]}>Total : {appointments?.length}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%" }}>
                                    <Text style={[styles.detailInnerText]}>Complete: {appointments?.filter((item) => item?.status == 'Completed').length}</Text>
                                    <Text style={[styles.detailInnerText]}>Pending:  {appointments?.filter((item) => item?.status == 'Pending').length}</Text>
                                    <Text style={[styles.detailInnerText]}>Cancelled:  {appointments?.filter((item) => item?.status == 'Cancelled').length}</Text>
                                    <Text style={[styles.detailInnerText]}>Missed:  {appointments?.filter((item) => item?.status == 'Missed').length}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <CustomDatePicker
                    isVisible={open}
                    onToggle={() => setOpen(false)}
                    onDone={(date) => console.log(date)}
                />

            </ScrollView> : <AnalyticsSkeleton />
            }
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