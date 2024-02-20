import { useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import GridTable from '../../components/base/GridTable'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'



const StudentDetails = ({ navigation }) => {
    const router = useRoute()
    const { student } = router.params
    const userData = useSelector(state => state?.user?.data)
    const globalData = useSelector(state => state?.global?.data)

    const isMonthly = student?.feeChargedBy === "Monthly" ? true : false

    const Data = [
        {
            name: 'Year',
            value: student?.StudentYear?.name
        },
        {
            name: 'Fee Plan',
            value: `${student?.feePlan} weeks`
        },
        {
            name: `${isMonthly ? 'Fee Per Month' : 'Fee Per Week'}`,
            value: `£${isMonthly ? student?.monthlyFee : student?.weeklyFee}`
        },
        {
            name: 'Enrollment Date',
            value: `${student?.enrollmentDate ? formattedDate(student?.enrollmentDate, 'dd-MM-yyyy') : ''}`
        },
        {
            name: 'Start Date',
            value: `${student?.startDate ? formattedDate(student?.startDate, 'dd-MM-yyyy') : ''}`
        },
        {
            name: 'Mobile No.',
            value: userData?.mobileNo || 'N/A'
        }, {
            name: 'Home Number',
            value: userData?.phoneNo || 'N/A'
        },
        {
            name: 'Category',
            value: student?.isChildcareStd ? 'Child Care' : 'Not Child Care'
        },
        {
            name: 'Contract Type',
            value: globalData?.contractType?.find(elem => elem.id === student?.contractType)?.name
        },
        {
            name: 'Book Dues',
            value: student?.bookDues ? `£${student?.bookDues}` : 'No Dues'
        },
    ]


    return (
        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <TopbarWithGraph student={student} />

                <View style={[styles.bgColor, GlobalStyles.p_10]}>
                    <Text style={styles.detailText}>Student Details</Text>
                </View>

                <View>
                    <GridTable data={Data} />
                </View>

            </View>
        </ScrollView>
    )
}

export default StudentDetails

const styles = StyleSheet.create({
    viewChildrenContainer: {
        // paddingHorizontal: 10,
        paddingVertical: 10,
    },
    bgColor: {
        backgroundColor: Color.grayBackground,

    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    }
})