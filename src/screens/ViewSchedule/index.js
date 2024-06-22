import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import BookIcon from "react-native-vector-icons/FontAwesome5"
import CalendarIcon from "react-native-vector-icons/FontAwesome6"
import { default as CalendarCheckIcon, default as NoHomework } from "react-native-vector-icons/MaterialCommunityIcons"
import TimeIcon from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../components/base/Table'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'



const list = (schedule) => [
    // {
    //     name: "Department Name",
    //     value: schedule?.Department?.name?.split(' ')[0],
    //     icon: <Idcard name="idcard" size={FontSizes.xl} color={Color.primary} />,
    // },
    {
        name: "Lesson",
        value: schedule?.Subject?.name,
        icon: <BookIcon name="book" size={FontSizes.xl} color={Color.primary} />,
    },
    {
        name: "Hours",
        value: schedule?.LessonTiming?.hours,
        icon: <CalendarCheckIcon name="calendar-multiple-check" size={FontSizes.xl} color={Color.primary} />,
    },
    {
        name: "Schedule Days",
        value: schedule?.days,
        icon: <CalendarIcon name="calendar-days" size={FontSizes.xl} color={Color.primary} />,
    },
    {
        name: "Time",
        value: schedule?.LessonTiming?.time,
        icon: <TimeIcon name="timelapse" size={FontSizes.xl} color={Color.primary} />,
    },
    // {
    //     name: "End Date",
    //     value: (schedule?.endDate && !isNaN(new Date(schedule?.endDate)) && schedule?.endDate !== '0000-00-00') ? formattedDate(schedule?.endDate, 'MMM-dd,yyyy') : '',
    //     icon: <CalendarTimeIcon name="calendar-times-o" size={FontSizes.xl} color={Color.primary} />,
    // },
    // {
    //     name: "Category",
    //     value: schedule?.isComp ? 'Compensation Schedule' : schedule?.isBooster ? "Booster Lesson" : 'Regular Lesson',
    //     icon: <GridIcon name="grid" size={FontSizes.xl} color={Color.primary} />,
    // },

]

const ViewSchedule = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([])
    const router = useRoute()
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    const Schedules = globaldata?.schedules?.filter(elem => elem.studentId === router.params?.student?.id)
    const fetchData = () => {
        setData(Schedules)
    }
    // Function to handle refresh action
    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                fetchData()
                setRefresh(false);
            })
            .catch(() => {
                fetchData()
                setRefresh(false);
            });
    };

    // Effect to fetch data when schedules change
    useEffect(() => {
        fetchData()
    }, [globaldata?.schedules])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }>
                {
                    data?.length > 0 ? <View>


                        {/* <TopbarWithGraph student={student} /> */}


                        <View>
                            {data.map((elem, index) => (
                                <Table
                                    key={index}
                                    list={list(elem)}
                                />
                            ))}
                        </View>
                    </View> : <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                        <View>
                            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                            <Text style={styles.inactivetext}>No Schedule found</Text>
                        </View>
                    </View>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewSchedule

const styles = StyleSheet.create({
    viewChildrenContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    }


})