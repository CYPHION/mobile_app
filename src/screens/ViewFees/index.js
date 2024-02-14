import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const ViewFess = () => {
    return (
        <ScrollView>
            <View style={{ paddingVertical: 10, backgroundColor: Color.white }}>
                <TopbarWithGraph />
                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Student Details</Text>

                </View>
            </View>
        </ScrollView>
    )
}

export default ViewFess

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgColor: {
        backgroundColor: Color.backgroundColor,
        padding: 10,

    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
})