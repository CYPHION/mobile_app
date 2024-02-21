import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useSelector } from 'react-redux';
import { API } from '../../network/API';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const ViewAllStudentsSkeleton = ({ navigation }) => {
    const user = useSelector(state => state?.user?.data)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const bgColor = {
        active: Color.primary,
        inactive: Color.btnDisable
    }

    const getStudents = () => {
        API.getStudentByParentId(user?.id)
            .then(res => {
                setData(res?.data);  // Assuming `setData` is a state updating function
            })
            .catch(err => {
                customToast('error', err);
            })
            .finally(() => {
                setLoading(false)
                // Any code you want to run after the promise is settled (either resolved or rejected)
            });

    }

    useEffect(() => {
        getStudents();
    }, []);


    return (

        <>
            {/* <LoadingScreen loading={loading} /> */}
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.NameText, styles.textFontFamily]} />
                            <ShimmerPlaceholder style={[styles.CompText, styles.textFontFamily]} />
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                            <View style={styles.badge}></View>

                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileRowContainer]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.CompText]} />
                        </View>
                    </View>


                    {
                        data.map((elem, index) => (
                            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => navigation.navigate('viewStudent')}>
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
                            </TouchableOpacity>
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
        marginTop: 10,
        marginBottom: 5
    },
    nameFont: {
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg,
        color: Color.text,
        width: 100
    },
    yearFont: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.md,
        color: Color.textThree,
        width: 100,
        marginTop: 5
    },
    activeStatus: {
        paddingVertical: 2,
        borderRadius: 12,
        width: 90
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