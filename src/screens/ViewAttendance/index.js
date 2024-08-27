import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import { default as BookIcon } from 'react-native-vector-icons/FontAwesome6'
import { default as GridIcon } from "react-native-vector-icons/Ionicons"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import TimeIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import LoadingScreen from '../../components/base/LoadingScreen'
import Table from '../../components/base/Table'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'






const ViewAttendance = () => {
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [summaryData, setSummaryData] = useState({
        totalSchedule: 0,
        totalHours: 0,
        totalattendLesson: 0,
        totalattendLessonHours: 0,
        totalAbsentLesson: 0,
        totalLeaveLesson: 0
    })
    const router = useRoute()
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    const getAllSchedule = globaldata?.schedules?.filter(item => item?.studentId == router?.params?.student?.id)

    let filterAttendance = globaldata?.attendances?.filter(elem => elem.studentId === router?.params?.student?.id)
    const studentDuefeeDate = new Date(router?.params?.student?.dueFeeDate)
    studentDuefeeDate.setHours(0, 0, 0, 0);
    let TODAY = new Date()
    TODAY.setHours(0, 0, 0, 0);
    let date13WeeksAgo;


    if (router?.params?.student?.dueFeeDate === null) {
        filterAttendance = filterAttendance
    } else if (studentDuefeeDate.getTime() >= TODAY.getTime()) {
        date13WeeksAgo = new Date();
        date13WeeksAgo.setDate(TODAY.getDate() - 13 * 7);
        filterAttendance = filterAttendance.filter(elem => {
            const dateCreated = new Date(elem?.attendanceDate);
            return dateCreated >= date13WeeksAgo;
        });
    } else {
        date13WeeksAgo = new Date(studentDuefeeDate);
        date13WeeksAgo.setDate(studentDuefeeDate.getDate() - 13 * 7);
        filterAttendance = filterAttendance.filter(elem => {
            const dateCreated = new Date(elem?.attendanceDate);
            return dateCreated >= date13WeeksAgo && dateCreated <= studentDuefeeDate;
        });

    }
    // Function to filter attendance data by date range
    const filterByDate = (startDate, endDate) => {
        setIsLoading(true)
        if (startDate && endDate) {
            const filteer = filterAttendance?.filter(item => {
                const itemDate = new Date(item?.attendanceDate);
                return itemDate >= startDate && itemDate <= endDate;
            });
            setData(filteer)
        } else {
            setData(filterAttendance)
        }
        setIsLoading(false)
    };
    // Function to handle date change
    const handleDateChange = (date) => {
        filterByDate(date.startDate, date.endDate)
    }

    const result = [
        { id: 1, "key": "Lessons Agreed New", "value": `${summaryData?.totalSchedule} (${summaryData?.totalHours} hours)` },
        { id: 2, "key": "Total Lessons Attended", "value": `${summaryData?.totalattendLesson} (${summaryData?.totalattendLessonHours} hours)` },
        { id: 3, "key": "Absent Lesson", "value": summaryData?.totalAbsentLesson },
        { id: 4, "key": "Leave Lesson", "value": summaryData?.totalLeaveLesson },
    ]

    // get & set the summary data of each student
    const getSummaryData = () => {
        setSummaryData({
            totalHours: 0,
            totalattendLessonHours: 0,
            totalSchedule: 0,
            totalattendLesson: 0,
            totalAbsentLesson: 0,
            totalLeaveLesson: 0,
        });
        const stdAtt = globaldata?.attendances?.filter(elem => elem.studentId === router?.params?.student?.id)
        const validSchedule = getAllSchedule?.filter((item) => !item?.isBooster);
        const totalHours = validSchedule.reduce((acc, item) => acc + item?.LessonTiming?.hours || 0, 0);
        setSummaryData((prev) => ({
            ...prev,
            totalHours,
            totalSchedule: validSchedule.length
        }));
        const attendance = stdAtt.filter((item) => item.attendanceType === 'present' || item.attendanceType === 'late');
        const totalattendLessonHours = attendance.reduce((acc, item) => acc + item?.Schedule?.LessonTiming?.hours || 0, 0);
        setSummaryData((prev) => ({
            ...prev,
            totalattendLessonHours,
            totalattendLesson: attendance.length
        }));
        const totalAbsentLesson = stdAtt.filter((item) => item?.attendanceType === 'absent').length;
        setSummaryData((prev) => ({
            ...prev,
            totalAbsentLesson
        }));
        const totalLeaveLesson = stdAtt.filter((item) => item?.attendanceType === 'leave').length;
        setSummaryData((prev) => ({
            ...prev,
            totalLeaveLesson
        }));
    };

    // Function to generate list items for attendance details
    const list = (attendance) => [
        // { name: ' Department Name', value: attendance?.Department?.name, icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },
        { name: ' Subject', value: attendance?.Subject?.name, icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Type', value: `${attendance.attendanceType.charAt(0).toUpperCase()}${attendance.attendanceType.slice(1)}`, icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        // { name: ' Category', value: `${attendance.attendanceCategory.charAt(0).toUpperCase()}${attendance.attendanceCategory.slice(1)} Lesson`, icon: <CapIcon color={Color.primary} name='graduation-cap' size={FontSizes.lg} /> },
        // { name: ' Teacher Name', value: `${attendance.teacherId ? globaldata?.teachers.find(teacher => teacher.id === attendance.teacherId)?.name : 'N/A'}`, icon: <Icon color={Color.primary} name='home' size={FontSizes.lg} /> },
        { name: ' Day/Date', value: `${attendance.attendanceDate ? formattedDate(attendance?.attendanceDate, 'EEE dd, MMM-yyyy') : ''}`, icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: ' Time', value: attendance?.Schedule?.LessonTiming?.time, icon: <TimeIcon color={Color.primary} name='timelapse' size={FontSizes.lg} /> },
        { name: ' Status', value: attendance.attendanceType === 'absent' ? "No Further Compensation" : '-', icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        // { name: ' Marked At', value: `${attendance.attendanceDate ? formattedDate(attendance.createdAt, 'MMM dd ,yyyy hh:mm:ss a') : ''}`, icon: <CardIcon color={Color.primary} name='idcard' size={FontSizes.lg} /> },

    ]
    // Function to handle refreshing data
    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                filterByDate()
                setRefresh(false);
            })
            .catch(() => {
                filterByDate()
                setRefresh(false);
            });
    };
    // Function to render item when no attendance is found
    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                <Text style={styles.inactivetext}>No Attendance found</Text>
            </View>
        </View>
    )

    useEffect(() => {
        getSummaryData()
        filterByDate()
    }, [])


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
                <LoadingScreen loading={isLoading} />
                {
                    filterAttendance?.length > 0 ? <>
                        <View style={styles.viewChildrenContainer}>
                            <TopbarWithGraph student={router.params.student} />

                            <View style={GlobalStyles.p_10}>
                                {result?.map((elem) => (

                                    <Text key={elem.id} style={styles.CompText}><Text style={{ fontFamily: FontFamily.interBold }}>{elem?.key}</Text> {elem?.value}{'\n'}</Text>
                                ))}

                                <Text style={styles.CompText}><Text style={{ fontFamily: FontFamily.interBold }}>Note for parent/carer:</Text> Only 1 compensation is allowed during a month of reported absence only. No compensation Hours will be transferred to the next term.{'\n'}</Text>
                            </View>
                            <View style={[GlobalStyles.headerStyles]}>
                                <Text style={GlobalStyles.headerTextStyle}>Attendace Details</Text>
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
                            onDone={(date) => handleDateChange(date)}
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
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})