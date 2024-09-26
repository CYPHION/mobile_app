import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { Color } from '../../../utils/color'
import { FontSizes } from '../../../utils/font'
import { formattedDate, screenDimensions } from '../../../utils/functions'
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
        value: `${row?.Attendance?.Subject?.name}${'\n'}${row?.Attendance?.Department?.name}`,
    },
    {
        name: "Class Missed On",
        value: `${formattedDate(row.missedScheduleDate, "dd/MM/yyyy")}${'\n'}${formattedDate(row.missedScheduleDate, "EEEE")}${'\n'}(${row.Attendance?.Schedule?.LessonTiming?.time
            })`,
    },
    {
        name: "For Subject",
        value: `${row?.Schedule?.Subject?.name}${'\n'}${row?.Schedule?.Department?.name}`,
    },
    {
        name: "Authorized By",
        value: row.User?.fullName,
    },
    {
        name: "Date",
        value: formattedDate(row.createdAt, "dd/MM/yyyy hh:mm:ss a"),
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

const ViewCompensation = ({ rows }) => {

    return (

        <View>
            {rows?.length === 0 ?
                <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                    <View>
                        <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                        <Text style={styles.inactivetext}>No Compensation found</Text>
                    </View>
                </View>
                :
                <ScrollView

                >
                    <View  >

                        <View style={[GlobalStyles.headerStyles]}>
                            <Text style={GlobalStyles.headerTextStyle}>View Compensations</Text>
                        </View>
                        <View style={[GlobalStyles.p_10]}>
                            {rows?.map((elem, index) => (
                                <GridTable
                                    data={items(elem)}
                                    key={index}
                                />
                            ))}
                        </View>
                    </View >
                </ScrollView>
            }
        </View >
    )
}

export default ViewCompensation

const styles = StyleSheet.create({
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})