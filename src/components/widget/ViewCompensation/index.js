import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GlobalStyles } from '../../../utils/globalStyles'
import GridTable from '../../base/GridTable'


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
            <View style={[GlobalStyles.headerStyles]}>
                <Text style={GlobalStyles.headerTextStyle}>Abdullah Khan </Text>
            </View>
            <View style={GlobalStyles.p_10}>
                {tableData.map((elem, index) => (
                    <GridTable
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

})