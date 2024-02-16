import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const GridTable = (props) => {
    const { data, heading, CheckboxChild, header, onDownloadClick } = props



    return (
        <>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    {!!header && <View style={[styles.header, styles.headerStyle]}>
                        <Text style={[styles.headingText, { color: Color.white }]}>{header}</Text>
                        <Icon name='download' onPress={onDownloadClick} color={Color.white} size={FontSizes.xxl} />
                    </View>}
                    <View style={{ padding: 10 }}>

                        {/* {showCheckBox && <MyCheckBox isChecked={isChecked} onToggle={onToggle} />} */}
                        {CheckboxChild && CheckboxChild}
                        {heading && <Text style={styles.headingText}>{heading}</Text>}
                        {data && data.map((elem, index) => (
                            <View key={index} style={[styles.rowStyle, styles.header,
                            { borderBottomWidth: index === data.length - 1 ? 0 : 1 }]}>
                                <Text style={styles.textStyle}>{elem.name}</Text>
                                <Text style={styles.textStyle}>{elem.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </>
    )
}

export default GridTable

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
        borderBottomColor: Color.borderDivider,
        borderBottomWidth: 1
    },
    textStyle: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.text
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
    headerStyle: {
        backgroundColor: Color.primary,
        width: '100%',
        padding: 10
    },
    headingText: {
        color: Color.text,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.xl
    }

})