import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import BookIcon from 'react-native-vector-icons/FontAwesome6'
import GridIcon from "react-native-vector-icons/Ionicons"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import TimeIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import CustomDatePicker from '../../components/base/CustomDatePicker'
import LoadingScreen from '../../components/base/LoadingScreen'
import MyModal from '../../components/base/Modal'
import Table from '../../components/base/Table'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const ViewAttendance = () => {

    const navigation = useNavigation()
    const router = useRoute()

    const dispatch = useDispatch()
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const getAllSchedule = globaldata?.schedules?.filter(item => item?.studentId == router?.params?.student?.id)

    const [refresh, setRefresh] = useState(false)
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [attendanceData, setAttendanceData] = useState([])
    const [showFeeModal, setShowFeeModal] = useState(false)
    const [restrictedMode, setRestrictedMode] = useState(false)
    const [summaryData, setSummaryData] = useState({
        totalSchedule: 0,
        totalHours: 0,
        totalattendLesson: 0,
        totalattendLessonHours: 0,
        totalAbsentLesson: 0,
        totalLeaveLesson: 0
    })

    const student = router?.params?.student
    const dueFeeDate = student?.dueFeeDate ? new Date(student.dueFeeDate) : null

    let allAttendance = globaldata?.attendances?.filter(
        elem => elem.studentId === student?.id
    ) || []

    // ------------------------------
    // 1️⃣ FILTER LAST 13 WEEKS
    // ------------------------------
    const filterLast13Weeks = () => {
        if (!dueFeeDate) return allAttendance

        const end = new Date(dueFeeDate)
        end.setHours(0, 0, 0, 0)

        const start = new Date(end)
        start.setDate(start.getDate() - 91) // 13 weeks

        return allAttendance.filter(item => {
            const date = new Date(item.attendanceDate)
            return date >= start && date <= end
        })
    }

    // ------------------------------
    // 2️⃣ FILTER BY DATE RANGE
    // ------------------------------
    const filterByDateRange = (start, end) => {
        if (!start || !end) {
            setAttendanceData(restrictedMode ? filterLast13Weeks() : allAttendance)
            return
        }
        const result = attendanceData.filter(item => {
            const d = new Date(item.attendanceDate)
            return d >= start && d <= end
        })
        setAttendanceData(result)
    }

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


    // ------------------------------
    // 3️⃣ MAIN LOGIC
    // ------------------------------
    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (dueFeeDate === null) {
            // CASE 1 → No due date → Full attendance
            setAttendanceData(allAttendance)
        }
        else if (dueFeeDate >= today) {
            // CASE 2 → Due date in future → Full attendance
            setAttendanceData(allAttendance)
        }
        else {
            // CASE 3 → Due date in past → show fee modal first
            setShowFeeModal(true)
        }
        getSummaryData();
        setIsLoading(false)
    }, [])

    // When clicking OK from modal → Apply restricted data
    const handleRestrictedAccess = () => {
        setShowFeeModal(false)
        setRestrictedMode(true)
        setAttendanceData(filterLast13Weeks())
    }

    // ------------------------------
    // Refresh
    // ------------------------------
    const handleRefresh = () => {
        setRefresh(true)
        dispatch(globalData(user?.id)).finally(() => {
            filterByDateRange()
            setRefresh(false)
        })
    }

    // ------------------------------
    // Render Empty Case
    // ------------------------------
    const renderEmpty = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
            <Text style={styles.inactivetext}>No Attendance Record found</Text>
        </View>
    )

    // ------------------------------
    // TABLE DATA LIST
    // ------------------------------
    const list = (attendance) => [
        { name: 'Subject', value: attendance?.Subject?.name, icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: 'Type', value: attendance.attendanceType, icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
        { name: 'Day/Date', value: formattedDate(attendance?.attendanceDate, 'EEE dd/MM/yyyy'), icon: <BookIcon color={Color.primary} name='book' size={FontSizes.lg} /> },
        { name: 'Time', value: attendance?.Schedule?.LessonTiming?.time, icon: <TimeIcon color={Color.primary} name='timelapse' size={FontSizes.lg} /> },
        { name: 'Status', value: attendance.attendanceType === 'absent' ? "No Further Compensation" : '-', icon: <GridIcon color={Color.primary} name='grid' size={FontSizes.lg} /> },
    ]

    // ------------------------------
    // SUMMARY DATA LIST
    // ------------------------------
    const result = [
        { id: 1, "key": "Lessons Agreed New", "value": `${summaryData?.totalSchedule} (${summaryData?.totalHours} hours)` },
        { id: 2, "key": "Total Lessons Attended", "value": `${summaryData?.totalattendLesson} (${summaryData?.totalattendLessonHours} hours)` },
        { id: 3, "key": "Absent Lesson", "value": summaryData?.totalAbsentLesson },
        { id: 4, "key": "Leave Lesson", "value": summaryData?.totalLeaveLesson },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingScreen loading={isLoading} />

            {/* MODAL FOR FEE NOT PAID */}
            <MyModal modalVisible={showFeeModal} setModalVisible={setShowFeeModal}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Fee Not Paid!</Text>

                    <Text style={styles.modalText}>
                        Last paid fee date: {formattedDate(student?.dueFeeDate, 'dd/MM/yyyy')}
                    </Text>

                    <Text style={[styles.modalText, { fontSize: FontSizes.md }]}>
                        Since the fee has not been paid, attendance data will be shown
                        only from the last paid fee date up to the previous 13 weeks.
                    </Text>

                    <Text style={[styles.modalText, { fontSize: FontSizes.md }]}>
                        Please complete your fee payment to unlock the full attendance record.
                    </Text>

                    <View style={{ flexDirection: 'column-reverse', gap: 5, marginTop: 20, width: '100%' }}>
                        <CustomButton
                            title="Cancel"
                            onPress={() => {
                                setShowFeeModal(false)
                                navigation.goBack()
                            }}
                            btnstyle={{ backgroundColor: Color.disable }}
                        />

                        <CustomButton
                            title="Show Previous Records"
                            onPress={handleRestrictedAccess}
                            btnstyle={{ backgroundColor: Color.primary }}
                            variant='fill'
                        />
                    </View>
                </View>
            </MyModal>


            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
                }
            >
                {
                    attendanceData.length === 0
                        ? renderEmpty()
                        : (
                            <View style={styles.viewChildrenContainer}>
                                <TopbarWithGraph student={student} />
                                {/*  Summary Data */}
                                <View style={GlobalStyles.p_10}>
                                    {result?.map((elem) => (

                                        <Text key={elem.id} style={styles.CompText}><Text style={{ fontFamily: FontFamily.interBold }}>{elem?.key}</Text> {elem?.value}{'\n'}</Text>
                                    ))}

                                    <Text style={styles.CompText}><Text style={{ fontFamily: FontFamily.interBold }}>Note for parent/carer:</Text> Only 1 compensation is allowed during a month of reported absence only. No compensation Hours will be transferred to the next term.{'\n'}</Text>
                                </View>

                                {/* Header */}
                                <View style={[GlobalStyles.headerStyles]}>
                                    <Text style={GlobalStyles.headerTextStyle}>Attendance Details</Text>
                                    {/* SHOW DATE FILTER ONLY IF NOT RESTRICTED */}
                                    {!restrictedMode && (
                                        <TouchableOpacity
                                            onPress={() => setOpenDatePicker(true)}
                                            style={[styles.container]}
                                        >
                                            <View style={styles.iconView}>
                                                <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                                            </View>
                                            <Text style={[styles.CompText]}>Select Date</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View>
                                    {attendanceData.map((elem, i) => (
                                        <Table key={i} list={list(elem)} />
                                    ))}
                                </View>
                            </View>
                        )
                }

                <CustomDatePicker
                    isVisible={openDatePicker}
                    onToggle={() => setOpenDatePicker(false)}
                    onDone={(date) => filterByDateRange(date.startDate, date.endDate)}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewAttendance


const styles = StyleSheet.create({
    viewChildrenContainer: {
        backgroundColor: Color.white,
        paddingVertical: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    iconView: {
        backgroundColor: Color.primary,
        padding: 5,
        borderRadius: 4
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
        fontFamily: FontFamily.interRegular
    },
    modal: {
        padding: 20,
        backgroundColor: Color.white,
        borderRadius: 10,
        width: screenDimensions.width * 0.8,
        alignItems: 'center'
    },
    modalText: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.interMedium,
        textAlign: 'center',
        marginVertical: 8
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})
