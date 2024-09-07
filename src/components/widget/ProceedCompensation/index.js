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
            value: `${formattedDate(item.attendanceDate, 'dd/MM/yyyy')} ${'\n'} ${item?.SubjectName} Subject`,
        },
        {
            name: "New Schedule",
            value: item?.date ? formattedDate(item.date, 'dd/MM/yyyy') : '',
        },
        {
            name: "Available Schedule",
            value: `${item.availableattendanceDate ? formattedDate(item.availableattendanceDate, 'dd/MM/yyyy') : ''} ${'\n'} ${item?.availableScheduleLessonTime} ${'\n'} ${item.availableSubjectName}`,
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
    // Function to handle form submission
    const handleSubmit = async () => {
        setIsLoading(true)// Set loading state to true

        let payload = []// Initialize payload array
        // Loop through each item in data array and construct payload
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
        // Call API to create compensation
        await API.createCompensation({
            data: payload
        }).then(res => {
            // Show success message
            customToast("success", res?.message)
            setProcess(false)// Set process state to false
            setActiveStudent(true);// Set active student state to true
        }).catch(err => {
            customToast("error", err?.message)  // Show error message
        })
            .finally(() => setIsLoading(false)) // Set loading state to false

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