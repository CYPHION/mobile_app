import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { API } from '../../../network/API'
import { Color } from '../../../utils/color'
import { customToast, formattedDate, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import CustomButton from '../../base/CustomButton'
import GridTable from '../../base/GridTable'



const ProceedCompensation = (props) => {


    const { setActiveStudent, setProcess, data } = props
    const [isLoading, setIsLoading] = useState(false)
    const globalData = useSelector(state => state?.global?.data)


    const items = (item) => [
        {
            name: "Student Name",
            value: globalData?.students?.find(elem => elem.id === item?.studentId)?.fullName,
        },
        {
            name: "Missed Attendance",
            value: `${item.attendanceDate} ${'\n'} ${item?.SubjectName} Subject`,
        },
        {
            name: "New Schedule",
            value: item?.date ? formattedDate(item.date, 'yyyy-MM-dd') : '',
        },
        {
            name: "Available Schedule",
            value: `${item.availableattendanceDate ? formattedDate(item.availableattendanceDate, 'yyyy-MM-dd') : ''} ${'\n'} ${item?.availableScheduleLessonTime} ${'\n'} ${item.availableSubjectName}`,
        },
        {
            name: "Total Available Seats",
            value: item?.availableSeats,
        },
        {
            name: "Remarks",
            value: item?.remarks ? item?.remarks : '',
        },
    ]

    const handleSubmit = async () => {
        setIsLoading(true)
        let payload = []

        data?.filter(elem => {
            return payload.push({
                studentId: elem.studentId,
                missedSchedule: elem.missedSchedule,
                availableSchedule: elem.availableSchedule,
                newDate: elem.date ? formattedDate(elem?.date, 'yyyy-MM-dd') : '',
                missedDate: elem.attendanceDate,
                remarks: elem.remarks
            })
        })

        await API.createCompensation({
            data: payload
        }).then(res => {
            customToast("success", res?.message)
            setProcess(false)
            setActiveStudent(true);
        }).catch(err => {
            customToast("error", err?.message)
        })
            .finally(() => setIsLoading(false))

    }


    return (
        <View style={{ height: screenDimensions.height }}>
            <ScrollView>
                <View style={[GlobalStyles.p_10, { minHeight: data?.length > 1 ? screenDimensions.height : null }]}>
                    {data?.map((elem, index) => (
                        <GridTable
                            data={items(elem)}
                            key={index}

                        />
                    ))}
                </View>

            </ScrollView>
            <View style={{
                height: screenDimensions.height * 0.4
            }}>

                <View style={{ width: screenDimensions.width, alignItems: 'center' }}>
                    <CustomButton
                        title='Processed'
                        variant='fill'
                        btnstyle={{ width: '90%' }}
                        onPress={handleSubmit}
                        isLoading={isLoading}
                    />
                </View>
                <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                    <CustomButton
                        title='Go Back'
                        btnstyle={{ width: '90%', borderWidth: 1, borderColor: Color.primary }}
                        onPress={() => {
                            setProcess(false)
                            setActiveStudent(true);
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default ProceedCompensation

const styles = StyleSheet.create({})