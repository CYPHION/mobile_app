import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import Graph from '../../base/GraphComponent'
const TopbarWithGraph = () => {
    const navigation = useNavigation()

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    return (
        <>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                </View>
                {/* <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                    <View style={styles.badge}></View>
                    <Icon name="notifications" color={Color.textTwo} size={FontSizes.xxxl} />
                </TouchableOpacity> */}
            </View>
            <Graph labels={labels} dataOne={[12, 48, 56, 86, 98, 26, 89, 7, 36, 48, 10, 9]} dataTwo={[12, 48, 56, 86, 98, 26, 89, 7, 36, 48, 10, 9].reverse()} />
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
    },
})