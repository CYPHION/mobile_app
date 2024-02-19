import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import GridTable from '../../components/base/GridTable'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'



const StudentDetails = () => {

    const Data = [
        {
            name: 'Year',
            value: 'Year 2'
        },
        {
            name: 'Fee Plan',
            value: '4 weeks'
        },
        {
            name: 'Fee Per Week',
            value: '£264'
        },
        {
            name: 'Enrollment Date',
            value: '30-12-2023'
        },
        {
            name: 'Start Date',
            value: '12/5/2023'
        },
        {
            name: 'Mobile No.',
            value: '03113266711'
        }, {
            name: 'Home Number',
            value: '03113266711'
        },
        {
            name: 'Category',
            value: 'Not Child Care'
        },
        {
            name: 'Contract Type',
            value: '52 weeks (Full Term)'
        },
        {
            name: 'Book Dues',
            value: 'No Dues'
        },
    ]


    const items = [
        {
            data: Data
        },
        {
            data: Data
        },

    ]


    return (
        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <TopbarWithGraph />

                <View style={[styles.bgColor, GlobalStyles.p_10]}>
                    <Text style={styles.detailText}>Student Details</Text>
                </View>

                <View>

                    {items.map((elem, index) => (
                        <GridTable header={elem.header} key={index} data={elem.data} />
                    ))}
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