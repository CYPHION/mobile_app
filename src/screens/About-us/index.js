import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import image1 from '../../images/aboutus1.png'
import image2 from '../../images/aboutus2.png'
import { Color } from '../../utils/color'
import { screenDimensions } from '../../utils/functions'
const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.main}>
                    <Image resizeMode='contain' style={styles.pictures} source={image1} />
                    <Image resizeMode='contain' style={[styles.pictures, { height: 500 }]} source={image2} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        gap: 30
    },
    pictures: {
        backgroundColor: Color.white,
        width: screenDimensions.width * 0.8,
        height: 300
    }
})