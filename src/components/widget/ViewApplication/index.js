import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { GlobalStyles } from '../../../utils/globalStyles'
import Table from '../../base/Table'
const ViewApplication = () => {
    const list = [
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },

    ]

    const items = [
        {
            list,
            status: 'Pending'
        },
        {
            list,
            status: 'Rejected'
        },
        {
            list,
            status: 'Accepted'
        },
    ]


    return (
        <ScrollView>

            <View style={[GlobalStyles.headerStyles]}>
                <Text style={GlobalStyles.headerTextStyle}>Analytics</Text>
                <TouchableOpacity activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                    <View style={[styles.iconView]}>
                        <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                    </View>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                </TouchableOpacity>
            </View>
            <View>
                {items.map((elem, index) => (
                    <Table key={index} status={elem.status} list={elem.list} />
                ))}
            </View>
        </ScrollView>
    )
}

export default ViewApplication

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
    iconView: {
        backgroundColor: Color.primary,
        padding: 5,
        borderRadius: 4
    },
})