import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Color } from '../../utils/color'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)




const AnalyticsSkeleton = () => {



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.viewChildrenContainer}>

                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                        <View>
                            <ShimmerPlaceholder style={styles.UserName} />

                        </View>

                        <ShimmerPlaceholder style={styles.UserNames} />

                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <ShimmerPlaceholder style={styles.AnalyticNames} />


                        <ShimmerPlaceholder style={styles.UserNames} />

                    </View>

                    <View style={{ alignItems: 'center', gap: 10, paddingVertical: 10 }}>


                        <ShimmerPlaceholder style={styles.analyticBox}>

                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={styles.analyticBox}>

                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={styles.analyticBox}>

                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder style={styles.analyticBox}>

                        </ShimmerPlaceholder>

                    </View>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default AnalyticsSkeleton

const styles = StyleSheet.create({
    viewChildrenContainer: {
        backgroundColor: Color.white,
    },
    UserName: {
        width: 85,
        height: 25
    },
    UserNames: {
        width: 65,
        height: 25
    },
    AnalyticNames: {
        width: 115,
        height: 25
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    analyticBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: screenDimensions.width * 0.92,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        backgroundColor: Color.white,
        borderRadius: 10,
        height: screenDimensions.fontScale * 110,
        overflow: "hidden"
    },

})