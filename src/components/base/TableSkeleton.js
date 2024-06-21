import React from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)





const TableSkeleton = (prop) => {

    let list = [
        1, 2, 3, 4, 5, 6, 7
    ]
    // const { list, status } = prop

    return (
        <>

            <View style={styles.container}>
                <View style={styles.innerView}>
                    <View style={[GlobalStyles.p_10]}>
                        {list.map((elem, index) => (
                            <View key={index} style={[styles.rowStyle, styles.header]}>
                                <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                                    <ShimmerPlaceholder style={styles.textStyle} />
                                </View>
                                <ShimmerPlaceholder style={[styles.textStyle, { color: Color.textThree }]} />
                            </View>
                        ))}
                    </View>

                </View>
            </View>
        </>
    )
}

export default TableSkeleton

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
        width: screenDimensions.width * .25,
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
    SklbgIconColor: {
        width: 30,
        marginRight: 10,
    }

})