import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import { screenDimensions } from '../../utils/functions'

const HomeWork = () => {

    const Data = [
        {
            name: "Homework Title ",
            duration: 'Maths',
            status: 'Active',

        },
        {
            name: "Expiry Date",
            duration: '06-02-2024',
            status: 'Active',

        },
        {
            name: "Hassan Khan",
            duration: 'Weekly',
            status: 'Inactive',

        },

    ]

    return (

        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                </View>

                <View>
                    <Text style={[styles.CompText, styles.textFontFamily]}>(3)</Text>
                </View>


            </View>

            {
                Data.map((elem, index) => (
                    <TouchableOpacity activeOpacity={0.9} key={index}>
                        <View style={styles.allStudentContainer}>
                            <View style={styles.allStudentContainers}>
                                <View >
                                    {/* <Image resizeMode='contain' source={require('../../images/hamza.png')} style={styles.image} /> */}
                                    <Image resizeMode='contain' source={elem.image} />
                                </View>
                                <View>
                                    <Text style={styles.nameFont}>{elem.name}</Text>
                                    <Text style={styles.yearFont}> {elem.year}</Text>
                                </View>
                            </View>

                            <View >
                                <Text style={styles.weeklyText}> {elem.duration}</Text>
                            </View>

                            <View style={{ width: 130 }}>
                                <Button title='Send' />
                            </View>

                        </View>


                    </TouchableOpacity>
                ))
            }



        </ScrollView >
    )
}

export default HomeWork

const styles = StyleSheet.create({

    viewChildrenContainer: {
        padding: 10,
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
        fontSize: FontSizes.md,
        color: Color.text,
    },
    allStudentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
        elevation: 2,  // off set dena hai yahan 
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: Color.pureWhite,
        marginTop: 10,
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