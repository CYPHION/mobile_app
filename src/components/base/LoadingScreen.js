import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Color } from '../../utils/color'
import { screenDimensions } from '../../utils/functions'

const LoadingScreen = ({ loading }) => {
    return (

        loading && <View style={styles.main}>
            <ActivityIndicator size={'large'} color={Color.primary} />
        </View>

    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        width: screenDimensions.width,
        height: screenDimensions.height,
        // backgroundColor: "rgba(0, 0, 0, 0.9)",
        backgroundColor: Color.white,
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center'
    }
})