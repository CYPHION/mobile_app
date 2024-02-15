import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import Icon from "react-native-vector-icons/Ionicons"
import { screenDimensions } from '../../utils/functions'
import DownloadIcon from 'react-native-vector-icons/AntDesign';
import BookIcon from "react-native-vector-icons/FontAwesome5";
import Idcard from "react-native-vector-icons/AntDesign";
import CustomButton from '../../components/base/CustomButton'

const HomeWork = () => {

    const Data = [
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024'
        },
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024'
        },
        {
            homeworkTitle: 'Maths',
            expiryDate: '06-08-2024'
        },



    ]

    return (

        <ScrollView>
            <View style={{ paddingBottom: 10, backgroundColor: Color.white }}>
                <View style={styles.viewChildrenContainer}>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>(3)</Text>
                </View>
                <View style={{ paddingHorizontal: 10, gap: 10, marginTop: 10 }}>
                    {
                        Data.map((elem, index) => (
                            <View key={index} style={styles.allStudentContainer}>
                                <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                    <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                        <View style={[styles.bgIconColor]}>
                                            <Idcard name="idcard" size={FontSizes.xl} color={Color.iconColor} />
                                        </View>
                                        <Text style={styles.nameFont}>Homework Title</Text>
                                    </View>
                                    <Text style={styles.nameFont}>{elem.homeworkTitle}</Text>
                                </View>
                                <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                    <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                        <View style={[styles.bgIconColor]}>
                                            <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />
                                        </View>
                                        <Text style={styles.nameFont}>Expiry Date</Text>
                                    </View>
                                    <Text style={styles.nameFont}>{elem.expiryDate}</Text>
                                </View>
                                <View style={styles.btnStyle}>
                                    <CustomButton btnstyle={{ paddingVertical: 10 }} title="Download" variant='fill' />
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>
        </ScrollView >
    )
}

export default HomeWork

const styles = StyleSheet.create({

    viewChildrenContainer: {
        padding: 10,
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
        alignItems: 'center'
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
    btnStyle: {
        paddingTop: 15,

    },

    bgIconColor: {
        width: 35,
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


})