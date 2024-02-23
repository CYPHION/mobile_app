import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import PTLogo from '../../components/SVGS/PT-Logo'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const SpashScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>
                <View >
                    {/* <Image source={require('../../images/PrimeTuitionLogo.png')} /> */}
                    <PTLogo />
                    {/* <Text style={styles.textStyle}>Prime Tuition</Text> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SpashScreen

const styles = StyleSheet.create({
    main: {
        width: screenDimensions.width,
        height: screenDimensions.height,
        backgroundColor: Color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: FontSizes.xxl,
        color: Color.text,
        fontFamily: FontFamily.interMedium
    }
})