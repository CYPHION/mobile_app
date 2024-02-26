import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardIcon from "react-native-vector-icons/AntDesign"
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import CapIcon from 'react-native-vector-icons/FontAwesome5'
import { default as BookIcon } from 'react-native-vector-icons/FontAwesome6'
import { default as GridIcon, default as Icon } from "react-native-vector-icons/Ionicons"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import TimeIcon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import Table from '../../components/base/Table'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'






const ViewAttendance = () => {
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const router = useRoute()
    const globalData = useSelector(state => state?.global?.data)
    const filterAttendance = globalData?.attendances?.filter(elem => elem.studentId === router?.params?.student?.id)


    const currentDate = new Date();
    const startOfMonth = new Date(currentDate);
    startOfMonth.setMonth(currentDate.getMonth() - 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    const [date, setDate] = useState({
        startDate: startOfMonth,
        endDate: endDate,
    });


    const filterByDate = (data, startDate, endDate) => {
        return data?.filter(item => {
            const itemDate = new Date(item?.attendanceDate);
            console.log(itemDate)
            return itemDate >= startDate && itemDate <= endDate;
        });
    };



    const list = (attendance) => [
        { name: ' Department Name', value: attendance?.Department?.name, icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },
        { name: ' Subject', value: attendance?.Subject?.name, icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Type', value: `${attendance.attendanceType.charAt(0).toUpperCase()}${attendance.attendanceType.slice(1)}`, icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        { name: ' Category', value: `${attendance.attendanceCategory.charAt(0).toUpperCase()}${attendance.attendanceCategory.slice(1)} Lesson`, icon: <CapIcon color={Color.primary} name='graduation-cap' size={FontSizes.lg} /> },
        { name: ' Teacher Name', value: `${attendance.teacherId ? globalData?.teachers.find(teacher => teacher.id === attendance.teacherId)?.name : 'N/A'}`, icon: <Icon color={Color.primary} name='home' size={FontSizes.lg} /> },
        { name: ' Day', value: `${attendance.attendanceDate ? formattedDate(attendance?.attendanceDate, 'EEE dd, MMM-yyyy') : ''}`, icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Time', value: attendance?.Schedule?.LessonTiming?.time, icon: <TimeIcon color={Color.primary} name='timelapse' size={FontSizes.lg} /> },
        { name: ' Marked At', value: `${attendance.attendanceDate ? formattedDate(attendance.createdAt, 'MMM dd ,yyyy hh:mm:ss a') : ''}`, icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },

    ]

    const handleRefresh = () => {
        setRefresh(true);

        const refreshedStartDate = new Date();
        refreshedStartDate.setMonth(refreshedStartDate.getMonth() - 1);
        refreshedStartDate.setHours(0, 0, 0, 0);

        const refreshedEndDate = new Date();
        refreshedEndDate.setHours(23, 59, 59, 999);

        setDate({
            startDate: refreshedStartDate,
            endDate: refreshedEndDate,
        });

        setRefresh(false);
        // Add additional logic or fetch data as needed
        // ...
    };

    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                <Text style={styles.inactivetext}>No Attendance found</Text>
            </View>
        </View>
    )

    useEffect(() => {
        setData(filterByDate(filterAttendance, date.startDate, date.endDate))
    }, [date])


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
                {
                    filterAttendance?.length > 0 ? <>
                        <View style={styles.viewChildrenContainer}>
                            <TopbarWithGraph student={router.params.student} />

                            <View style={[GlobalStyles.headerStyles]}>
                                <Text style={GlobalStyles.headerTextStyle}>Student Details</Text>
                                <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                                    <View style={[styles.iconView]}>
                                        <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                                    </View>
                                    <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                                </TouchableOpacity>
                            </View>

                            {data?.length > 0 ? <View>
                                {data?.map((elem, index) => (
                                    <Table key={index} status={elem.status} list={list(elem)} />
                                ))}
                            </View> :
                                <>
                                    {renderItem()}
                                </>
                            }
                        </View>
                        <CustomDatePicker
                            isVisible={open}
                            onToggle={() => setOpen(false)}
                            onDone={(date) => setDate(date)}
                        />
                    </> : <>
                        {renderItem()}
                    </>
                }

            </ScrollView>
        </SafeAreaView>
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
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})