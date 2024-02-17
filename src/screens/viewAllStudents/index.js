import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const ViewAllStudents = ({ navigation }) => {
    const Data = [
        {
            name: "Abdullah Khan",
            year: 'Year 2',
            duration: 'Weekly',
            status: 'Active',
            image: require('../../images/hamza.png'),
            navigateTo: 'viewStudent'
        },
        {
            name: "Abdullah Khan",
            year: 'Year 3',
            duration: 'Monthly',
            status: 'Active',
            image: require("../../images/hamza.png"),
            navigateTo: 'viewStudent'
        },
        {
            name: "Hassan Khan",
            year: 'Year 4',
            duration: 'Weekly',
            status: 'Inactive',
            image: require("../../images/hamza.png"),
            navigateTo: 'viewStudent'
        },

    ]

    const bgColor = {
        Active: Color.primary,
        Inactive: Color.btnDisable
    }

    return (

        <ScrollView>
            <View style={styles.profileContainer}>
                <View style={[styles.profileRowContainer]}>
                    <View>
                        <Text style={[styles.NameText, styles.textFontFamily]}>Hi, Hamza</Text>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Welcome to Prime Tuition</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                        <View style={styles.badge}></View>

                    </TouchableOpacity>
                </View>
                <View style={[styles.profileRowContainer]}>
                    <View>
                        <Text style={[styles.CompText]}>Enrolled Children (3)</Text>
                    </View>
                </View>


                {
                    Data.map((elem, index) => (
                        <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => navigation.navigate(elem.navigateTo)}>
                            <View style={styles.allStudentContainer}>
                                <View style={styles.allStudentContainers}>
                                    <View >
                                        <Image resizeMode='contain' source={elem.image} style={styles.image} />
                                    </View>
                                    <View>
                                        <Text style={styles.nameFont}>{elem.name}</Text>
                                        <Text style={styles.yearFont}> {elem.year}</Text>
                                        <View style={[styles.activeStatus, { backgroundColor: bgColor[elem.status] }]}>
                                            <Text style={styles.activeStatusText}>{elem.status}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View >
                                    <Text style={styles.weeklyText}> {elem.duration}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }



            </View>
        </ScrollView>
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
    },
    yearFont: {
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
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.text,
    },
    image: {
        width: screenDimensions.width * 0.18,
        height: screenDimensions.width * 0.18,
        borderRadius: screenDimensions.width * 0.18 * 0.5
    }
})