import React from 'react'
import { SafeAreaView, View } from 'react-native'
import PTLogo from '../../components/SVGS/PT-Logo'

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