import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import { API } from '../../../network/API'
import { Color } from '../../../utils/color'
import { FontSizes } from '../../../utils/font'
import { customToast, formattedDate, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import GridTable from '../../base/GridTable'

const items = (row) => [
    {
        name: "Student Name",
        value: row.Student?.fullName,
    },
    {
        name: "Student Year",
        value: row?.Student?.StudentYear?.name,
    },
    {
        name: "Subject",
        value: `${row?.Attendance?.Subject?.name} -${'\n'} ${row?.Attendance?.Department?.name} `,
    },
    {
        name: "Class Missed On",
        value: `${formattedDate(row.missedScheduleDate, "dd-MM-yyyy")} - ${'\n'} ${formattedDate(row.missedScheduleDate, "EEEE")} ${'\n'}(${row.Attendance?.Schedule?.LessonTiming?.time
            })`,
    },
    {
        name: "For Subject",
        value: `${row?.Schedule?.Subject?.name} -${'\n'} ${row?.Schedule?.Department?.name}`,
    },
    {
        name: "Authorized By",
        value: row.User?.fullName,
    },
    {
        name: "Date",
        value: formattedDate(row.createdAt, "dd-MM-yyyy hh:mm:ss a"),
    },
    {
        name: "Remarks",
        value: row.remarks,
    },
    {
        name: "Status",
        value: <Text style={{ color: row?.count > 0 ? 'green' : 'red' }}>{row?.count > 0 ? "Attended" : "Unattended"}</Text>,
    },
]

const ViewCompensation = () => {

    const globalData = useSelector(state => state?.global?.data)
    const [rows, setRows] = useState([])


    const getALLCompensation = async () => {
        const studentIds = globalData?.students?.map(elem => elem?.id)
        await API.compensationByParent(JSON.stringify(studentIds)).then(res => {
            const data = res?.data
            setRows(data)
        }).catch(err => customToast("error", err?.message))
    }

    useEffect(() => {
        getALLCompensation()
    }, [globalData?.students])


    return (
        <View style={{ height: screenDimensions.height }}>
            {rows?.length === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                <View>
                    <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                    <Text style={styles.inactivetext}>No Progress Report found</Text>
                </View>
            </View> : <ScrollView>
                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>View Compensations</Text>
                </View>
                <View style={[GlobalStyles.p_10, { minHeight: rows?.length > 1 ? screenDimensions.height * 1.8 : null, }]}>
                    {rows?.map((elem, index) => (
                        <GridTable
                            data={items(elem)}
                            key={index}
                        />
                    ))}
                </View>
            </ScrollView >}

        </View >

    )
}

export default ViewCompensation

const styles = StyleSheet.create({
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})