import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { screenDimensions } from '../../../utils/functions'
import Graph from '../../base/GraphComponent'
const TopbarWithGraph = () => {
    const navigation = useNavigation()


    return (
        <>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                    <View style={styles.badge}></View>
                    <Icon name="notifications" color={Color.textTwo} size={FontSizes.xxxl} />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: Color.primary, marginTop: 20, width: screenDimensions.width, height: 180, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Graph />
            </View>
        </>
    )
}

export default TopbarWithGraph

const styles = StyleSheet.create({

    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.primary,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2,
        zIndex: 100
    }
})