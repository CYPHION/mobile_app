import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import LoadingScreen from '../../components/base/LoadingScreen'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { getImage, screenDimensions } from '../../utils/functions'

const ViewAllStudents = ({ navigation }) => {
    const user = useSelector(state => state?.user?.data)
    const globalData = useSelector(state => state?.global?.data)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const bgColor = {
        active: Color.primary,
        inactive: Color.error,
        pending: Color.btnDisable,
        freeze: Color.warning
    }

    useEffect(() => {
        setLoading(false)
    }, [globalData])

    return (

        <>
            <SafeAreaView style={{ flex: 1 }}>
                <LoadingScreen loading={loading} />
                <ScrollView>
                    <View style={styles.profileContainer}>
                        {/* <View style={[styles.profileRowContainer]}>
                        <View>
                            <Text style={[styles.NameText, styles.textFontFamily]}>Hi, {user?.firstName} {user?.lastName}</Text>
                            <Text style={[styles.CompText, styles.textFontFamily]}>Welcome to Prime Tuition</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                            <View style={styles.badge}></View>

                        </TouchableOpacity>
                    </View> */}
                        <View style={[styles.profileRowContainer]}>
                            <View>
                                <Text style={[styles.CompText]}>Enrolled Children ({globalData?.students ? globalData?.students?.length : 0})</Text>
                            </View>
                        </View>


                        {
                            globalData?.students?.map((elem, index) => (
                                <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => navigation.navigate('viewStudent', { id: elem.id })}>
                                    <View style={styles.allStudentContainer}>
                                        <View style={styles.allStudentContainers}>
                                            <View>
                                                <Image resizeMode='contain' source={elem?.picture ? { uri: getImage(elem?.picture) } : require("../../images/profileAvatar.png")} style={styles.image} />
                                            </View>
                                            <View>
                                                <Text style={[styles.nameFont]}>{elem?.fullName}</Text>
                                                <Text style={[styles.yearFont]}>{elem?.StudentYear?.name}</Text>
                                                <View style={[styles.activeStatus, { backgroundColor: bgColor[elem?.status] }]}>
                                                    <Text style={styles.activeStatusText}>{elem?.status}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View >
                                            <Text style={styles.weeklyText}> {elem?.feeChargedBy}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }



                    </View>
                </ScrollView >
            </SafeAreaView>
        </>
    )
}

export default ViewAllStudents

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
        gap: 15,
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
    },
    yearFont: {
        textAlign: 'left',
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.md,
        color: Color.textThree
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
        color: Color.pureWhite
    },
    weeklyText: {
        fontFamily: FontFamily.interBold,
        fontSize: FontSizes.md,
        color: Color.text,
    },
    image: {
        width: screenDimensions.width * 0.18,
        height: screenDimensions.width * 0.18,
        borderRadius: screenDimensions.width * 0.18 * 0.5,
        backgroundColor: Color.disable,
        borderColor: Color.borderColor,
        borderWidth: 0.3,
    }
})