import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import GridTable from '../../components/base/GridTable'
import { Color } from '../../utils/color'
import { GlobalStyles } from '../../utils/globalStyles'

const ViewFeeReceipt = () => {

    const items = [
        { name: 'Receipt No.', value: 55 },
        { name: 'Main ID', value: 3 },
        { name: 'Transaction Date', value: 'Mon Jan 08 2024 7:32 PM ' },



    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10, backgroundColor: Color.white }}>
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
        </SafeAreaView>
    )
}

export default ViewFeeReceipt

const styles = StyleSheet.create({

})