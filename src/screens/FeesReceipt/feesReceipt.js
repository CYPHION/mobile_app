import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import GridTable from '../../components/base/GridTable'
import { GlobalStyles } from '../../utils/globalStyles'

const FeesReceipt = () => {

    const items = [
        { name: 'Receipt No.', value: 55 },
        { name: 'Main ID', value: 3 },
        { name: 'Transaction Date', value: 'Mon Jan 08 2024 7:32 PM ' },



    ]

    return (
        <ScrollView>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>Student Fee Receipt </Text>

                </View>
                <View>
                    <GridTable data={items}
                    />
                </View>

                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}> Abdullah Khan (Weekly)  </Text>

                </View>
                <View>
                    <GridTable data={items} />
                </View>

                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}> Sami Khan (Weekly)  </Text>

                </View>
                <View>
                    <GridTable data={items} />
                </View>

                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}> Sami Khan (Weekly)  </Text>

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

})