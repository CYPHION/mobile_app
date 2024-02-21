import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Filter from "../../components/SVGS/Filter.svg";
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const ViewAllStudentsSkeleton = () => {


    let list = [1, 2, 3, 4]

    return (

        <>
            <ScrollView>

                <Filter width={60} height={20} fill={"red"} />

                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.NameText, styles.textFontFamily]} />
                            <ShimmerPlaceholder style={[styles.CompText, styles.textFontFamily]} />
                        </View>
                        {/* <TouchableOpacity  >
                            <View style={styles.badge}></View>

                        </TouchableOpacity> */}
                    </View>
                    <View style={[styles.profileRowContainer]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.CompTextt]} />
                        </View>
                    </View>


                    {
                        list.map((elem, index) => (
                            <View key={index} >
                                <View style={styles.allStudentContainer}>
                                    <View style={styles.allStudentContainers}>
                                        <View >
                                            <ShimmerPlaceholder style={styles.image} />
                                        </View>
                                        <View>
                                            <ShimmerPlaceholder style={styles.nameFont} />
                                            <ShimmerPlaceholder style={styles.yearFont} />
                                            <View style={[styles.activeStatus,]}>
                                                <ShimmerPlaceholder style={styles.activeStatusText} />
                                            </View>
                                        </View>
                                    </View>

                                    <View >
                                        <ShimmerPlaceholder style={styles.weeklyText} />
                                    </View>
                                </View>
                            </View>
                        ))
                    }



                </View>
            </ScrollView>
        </>
    )
}

export default ViewAllStudentsSkeleton

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 10,
        backgroundColor: Color.white
    },
    profileRowContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
        marginBottom: 3
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.lg,
        color: Color.textThree,
        fontFamily: FontFamily.interRegular,
    },
    CompTextt: {
        width: screenDimensions.width * .3
    },
    allStudentContainers: {
        flexDirection: 'row',
        gap: 20,
    },
    allStudentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // padding: 10,
        elevation: 2,  // off set dena hai yahan 
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: Color.pureWhite,
        marginTop: 15,
        marginBottom: 5
    },
    nameFont: {
        width: screenDimensions.width * 0.25
    },
    yearFont: {
        width: screenDimensions.width * 0.25,
        marginTop: 5
    },
    activeStatus: {
        width: screenDimensions.width * 0.18,
        marginTop: 3
    },
    activeStatusText: {
        textAlign: 'center',
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.pureWhite,
        width: 90
    },
    weeklyText: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.text,
        width: 100
    },
    image: {
        width: screenDimensions.width * 0.18,
        height: screenDimensions.width * 0.18,
        borderRadius: screenDimensions.width * 0.18 * 0.5,
    }
})