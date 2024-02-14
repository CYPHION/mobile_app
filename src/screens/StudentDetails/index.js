import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import { screenDimensions } from '../../utils/functions'
import GridTable from '../../components/base/GridTable'



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
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                </View>

                <View style={{ backgroundColor: Color.primary, marginTop: 20, width: screenDimensions.width, height: 180, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: "black", fontSize: 20, }}>Map Area</Text>
                </View>

                <View style={styles.bgColor}>
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
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    }
})