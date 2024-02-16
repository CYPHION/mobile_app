import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import GridTable from '../../components/base/GridTable'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const FeesReceipt = () => {

    const items = [
        { name: 'Receipt No.', value: 55 },
        { name: 'Main ID', value: 3 },
        { name: 'Transaction Date', value: 'Mon Jan 08 2024 7:32 PM ' },



    ]

    return (
        <ScrollView>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Student Fee Receipt </Text>

                </View>
                <View>
                    <GridTable data={items}
                    />
                </View>

                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}> Abdullah Khan (Weekly)  </Text>

                </View>
                <View>
                    <GridTable data={items} />
                </View>

                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}> Sami Khan (Weekly)  </Text>

                </View>
                <View>
                    <GridTable data={items} />
                </View>

                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}> Sami Khan (Weekly)  </Text>

                </View>
                <View>
                    <GridTable data={items} />
                </View>

            </View>

        </ScrollView>
    )
}

export default FeesReceipt

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