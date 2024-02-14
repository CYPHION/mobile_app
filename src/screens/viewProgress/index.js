import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import FilterIcon from "react-native-vector-icons/FontAwesome";
import GridTable from '../../components/base/GridTable';



const ViewProgress = () => {

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
            header: 'test 1',
            data: Data
        },
        {
            header: 'test 2 ',
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

            </View>

            <View style={styles.bgColor}>
                <View>
                    <Text style={styles.detailText}>Progress Report</Text>
                </View>
                <TouchableOpacity>
                    <View>
                        <FilterIcon name='filter' size={FontSizes.xl} color={Color.iconColor} />
                    </View>
                </TouchableOpacity>

            </View>

            <View>

                {items.map((elem, index) => (
                    <GridTable header={elem.header} key={index} data={elem.data} />
                ))}
            </View>

        </ScrollView>
    )
}

export default ViewProgress

const styles = StyleSheet.create({

    viewChildrenContainer: {
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailText: {
        fontSize: FontSizes.lg,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    }
})