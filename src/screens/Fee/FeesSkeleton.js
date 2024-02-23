import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import AccordionSkeleton from '../../components/base/AccordianSkeleton';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const List = [1, 2, 3, 4, 5, 6, 7]

const FeeSkeleton = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>


                <View style={styles.feesContainers}>
                    <View style={styles.feesReceiptContainer}>
                        <View>
                            <ShimmerPlaceholder style={styles.fessYears} />
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
        </SafeAreaView >
    )
}

export default FeeSkeleton

const styles = StyleSheet.create({

    feesReceiptContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3
    },
    feesContainers: {
        paddingHorizontal: 10,
        borderRadius: 3,
        paddingVertical: 20

    },
    fessYears: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        width: screenDimensions.width * 0.95,
        height: 35,
        borderRadius: 3
    }
})