import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Download from 'react-native-vector-icons/Feather'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)



const HomeWorkSkeleton = () => {

    const Data = [
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024'
        },
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024',
            url: 'jdhakjaskjf'
        },
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024'
        },



    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ paddingBottom: 10, backgroundColor: Color.white }}>
                    <View style={[styles.viewChildrenContainer, GlobalStyles.p_10]}>
                        <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                        <Text style={[styles.CompText, styles.textFontFamily]}>(3)</Text>
                    </View>
                    <View style={{ paddingHorizontal: 10, gap: 10, marginTop: 10 }}>
                        {
                            Data.map((elem, index) => (
                                <View key={index} style={styles.allStudentContainer}>
                                    <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                        <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                            <ShimmerPlaceholder style={[styles.bgIconColor]}>
                                                {/* <Idcard name="idcard" size={FontSizes.xl} color={Color.iconColor} /> */}
                                            </ShimmerPlaceholder>
                                            <ShimmerPlaceholder style={styles.nameFont} />
                                        </View>
                                        <ShimmerPlaceholder style={styles.nameFont} />
                                    </View>
                                    <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                        <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                            <ShimmerPlaceholder style={[styles.bgIconColor]}>
                                                {/* <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} /> */}
                                            </ShimmerPlaceholder>
                                            <ShimmerPlaceholder style={styles.nameFont} />
                                        </View>
                                        <ShimmerPlaceholder style={styles.nameFont} />
                                    </View>
                                    <View style={styles.btnStyle}>
                                        {elem.url ?
                                            <ShimmerPlaceholder style={{ height: screenDimensions.width * 0.1, width: screenDimensions.width * 0.85 }}
                                                title="Open Link"
                                                variant='fill'
                                                rightIcon={<Download name='link' size={FontSizes.lg} color={Color.white} />}
                                            />
                                            :
                                            <ShimmerPlaceholder style={{ height: screenDimensions.width * 0.1, width: screenDimensions.width * 0.85 }}
                                                title="Download"
                                                rightIcon={<Download name='download' size={FontSizes.lg} color={Color.white} />}
                                                variant='fill'
                                            />
                                        }
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}

export default HomeWorkSkeleton

const styles = StyleSheet.create({

    viewChildrenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.grayBackground
    },
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
    allStudentContainer: {
        padding: 15,
        paddingVertical: 15,
        elevation: 3,  // off set dena hai yahan 
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: Color.grayBackground,
        // marginTop: 10,
    },
    allStudentContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20
    },
    nameFont: {
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg,
        color: Color.text,
        width: 80
    },
    yearFont: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.md,
        color: Color.textThree
    },
    btnStyle: {
        paddingTop: 15,
        alignItems: 'center'
    },

    bgIconColor: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'

    },


})