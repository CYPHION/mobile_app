import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import GridTabel from '../../base/GridTable'


const ViewCompensation = () => {

    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
        {
            name: "agblsuyuil syufy sfap",
            value: "jfksafh.ajkkflas;jk",
        },
        {
            name: "hfsgksabjhfuklagklsakfa",
            value: "10/8/2024",
        },
        {
            name: "date",
            value: "10/8/2024",
        },
        {
            name: "name",
            value: "M.Owais",
        },
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
    ]


    const tableData = [
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
    ]


    return (
        <ScrollView>
            <View style={[styles.bgColor, styles.container]}>
                <Text style={styles.detailText}>Abdullah Khan </Text>
            </View>
            <View style={{ padding: 10 }}>
                {tableData.map((elem, index) => (
                    <GridTabel
                        data={elem.item}
                        key={index}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

export default ViewCompensation

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium
    },
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
})