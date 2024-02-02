import React from 'react'
import { Text, View } from 'react-native'
import { Color } from '../utils/colorPalette'
import { FontFamily } from '../utils/fontFamilies'
import { FontSizes } from '../utils/fontSizes'

const FontScreen = () => {
    return (
        <View>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.bold,
                }}
            >
                BOLD
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.light,
                }}
            >
                light
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.medium,
                }}
            >
                medium
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.regular,
                }}
            >
                regular
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.semiBold,
                }}
            >
                semiBold
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.interBold,
                }}
            >
                interB
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.interLight,
                }}
            >
                interLight
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.interMedium,
                }}
            >
                interMedium
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.interRegular,
                }}
            >
                interRegular
            </Text>
            <Text
                style={{
                    fontSize: FontSizes.lg,
                    color: Color.text,
                    fontFamily: FontFamily.interSemiBold,
                }}
            >
                interSemiBold
            </Text>
        </View>
    )
}

export default FontScreen