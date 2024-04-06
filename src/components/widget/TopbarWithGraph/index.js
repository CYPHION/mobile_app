import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
const TopbarWithGraph = ({ student, isGraph = true }) => {
    const navigation = useNavigation()

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const isBooster = student?.BoosterStudents?.length > 0 ? true : false

    return (
        <>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: 7 }}>
                    <Text style={[styles.NameText, styles.textFontFamily]}>{student?.fullName} </Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>{student?.StudentYear?.name} - {student?.feeChargedBy} {isBooster ? '(Booster Student)' : ''}</Text>
                </View>
                {/* <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                    <View style={styles.badge}></View>
                    <Icon name="notifications" size={FontSizes.xxxl} />
                </TouchableOpacity> */}
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
    },
})