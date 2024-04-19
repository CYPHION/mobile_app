import React from 'react'
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const Childcare = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Childcare Safety</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.line}>
                            Checkout Our Childcare Safety Plan
                        </Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            Linking.openURL('http://prime-childcare.co.uk/index.html')
                        }}>
                            <Text style={[styles.line, styles.link]}>http://prime-childcare.co.uk/index.html</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Childcare

const styles = StyleSheet.create({
    body: {
        padding: 20
    },
    line: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.interRegular,
        color: Color.text,
        paddingVertical: 5,
        marginVertical: 5
    },
    link: {
        color: Color.primary
    }
})