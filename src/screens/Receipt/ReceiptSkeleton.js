import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AccordionSkeleton from '../../components/base/AccordianSkeleton';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const List = [1, 2, 3, 4, 5, 6, 7]

const ReceiptSkelton = () => {

    return (
        <ScrollView>
            <View style={styles.feesContainers}>
                <View style={styles.feesReceiptContainer}>
                    <View>
                        <ShimmerPlaceholder style={styles.fessYears} />
                    </View>
                    <View>
                        <ShimmerPlaceholder
                            style={styles.fessYears}

                        />
                    </View>
                </View>
                <View>
                    {List?.map((item, index) => (
                        <AccordionSkeleton
                            key={index}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default ReceiptSkelton

const styles = StyleSheet.create({

    feesReceiptContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3
    },
    feesContainers: {
        paddingHorizontal: 10,
        borderRadius: 3
        ,

    },
    fessYears: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        width: 65,
        height: 25,
        borderRadius: 3
    }
})