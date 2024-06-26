import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'


const Table = (prop) => {
    const { list, status } = prop

    let bgColor;
    let textColor;

    switch (status) {
        case 'Accepted':
            bgColor = Color.success
            textColor = Color.text
            break;

        case 'Rejected':
            bgColor = Color.error
            textColor = Color.white
            break;


        default:
            bgColor = Color.grayBackground
            textColor = Color.text
            break;
    }

    return (
        <>

            <View style={styles.container}>
                <View style={styles.innerView}>
                    <View style={[GlobalStyles.p_10]}>
                        {list.map((elem, index) => (
                            <View key={index} style={[styles.rowStyle, styles.header]}>
                                <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    {elem.icon &&
                                        <View style={[styles.bgIconColor]}>
                                            {elem.icon}
                                        </View>
                                    }
                                    <Text style={styles.textStyle}>{elem.name}</Text>
                                </View>
                                <Text numberOfLines={8} style={[styles.textStyle, { maxWidth: '50%', color: Color.textThree }]}>{elem.value}</Text>
                            </View>
                        ))}
                    </View>
                    {status && <Text style={[{ backgroundColor: bgColor, textAlign: 'center', color: textColor }, GlobalStyles.p_10]}>
                        {status}
                    </Text>}
                </View>
            </View>
        </>
    )
}

export default Table

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    innerView: {
        overflow: 'hidden',
        backgroundColor: Color.white,
        width: '95%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 10,
        shadowOffset: 10,
        elevation: 4,
    },
    rowStyle: {
        paddingVertical: 10,
    },
    textStyle: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.text,
        textAlign: 'right',
    },
    headingText: {
        fontSize: FontSizes.xl,
        color: Color.black,
        fontFamily: FontFamily.interMedium
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headingText: {
        color: Color.text,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.xl
    },
    bgIconColor: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 8,
        padding: 6,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // Set a lower opacity for a subtle shadow
        shadowRadius: 2, // Set a lower radius for a less spread shadow
    },

})