import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from '../../utils/color';
import { screenDimensions } from '../../utils/functions';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)




const ProfileSkeleton = ({ navigation }) => {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ backgroundColor: Color.white, overflow: 'scroll' }}>
                    <View style={[styles.mainContainer]}>
                        <ShimmerPlaceholder style={[styles.profileImage]} />
                        <View>
                            <ShimmerPlaceholder style={[styles.text,]} />
                            <ShimmerPlaceholder style={[styles.text,]} />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 20 }} >
                        <View style={[styles.row]}>
                            <ShimmerPlaceholder style={[styles.sideView]}>
                            </ShimmerPlaceholder>
                            <View >
                                <ShimmerPlaceholder
                                    style={styles.textt}
                                />
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <ShimmerPlaceholder style={[styles.sideView]}>
                                <View style={styles.bgIconColor}>
                                </View>
                            </ShimmerPlaceholder>
                            <View >
                                <ShimmerPlaceholder
                                    style={styles.textt}
                                />
                            </View>
                            <View style={[styles.sideView]}>
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <ShimmerPlaceholder style={[styles.sideView]}>
                            </ShimmerPlaceholder>
                            <View >
                                <ShimmerPlaceholder
                                    style={styles.textt}
                                />
                            </View>
                            <View style={[styles.sideView]}>
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <ShimmerPlaceholder style={[styles.sideView]}>
                            </ShimmerPlaceholder>
                            <View >
                                <ShimmerPlaceholder
                                    style={styles.textt}
                                />
                            </View>
                            <View style={[styles.sideView]}>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceholder
                            style={{ width: screenDimensions.width * 0.5, height: screenDimensions.width * 0.08, borderRadius: 4 }}
                            variant='fill'
                        />
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}

export default ProfileSkeleton

const styles = StyleSheet.create({
    mainContainer: {
        width: screenDimensions.width,
        height: screenDimensions.height * 0.3,
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    profileImage: {
        width: screenDimensions.width * 0.25,
        height: screenDimensions.width * 0.25,
        borderRadius: screenDimensions.width * (0.25 * 0.5)
    },
    text: {

        marginBottom: 4,
        width: screenDimensions.width * 0.32,
        height: screenDimensions.width * 0.055,
        borderRadius: 3
    },
    textt: {

        marginBottom: 4,
        width: screenDimensions.width * 0.8,
        height: screenDimensions.width * 0.08,
        borderRadius: 3
    },

    row: {
        width: screenDimensions.width,
        padding: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    sideView: {
        width: '10%',
        height: 32,
        borderRadius: 3,
        marginRight: 5
    },

})