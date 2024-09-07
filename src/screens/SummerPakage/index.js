import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import GridTable from '../../components/base/GridTable'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const SummerPakage = () => {
    const list1 = [
        {
            name: 'First Lesson',
            value: `10:00AM – 12:00PM`
        },
        {
            name: `Second Lesson`,
            value: `12:15PM – 02:15PM`
        },
        {
            name: 'Third Lesson',
            value: `02:30PM – 04:30PM`
        },
    ]
    const list2 = [
        {
            name: 'First Lesson',
            value: `09:00AM – 11:00AM`
        },
        {
            name: `Second Lesson`,
            value: `11:15AM – 01:15PM`
        },
    ]
    const list3 = [
        { duration: "16 HOURS (GCSE)", price: "€ 152.00", subjects: "Any 2 Subjects" },
        { duration: "24 HOURS (GCSE)", price: "€ 199.00", subjects: "Any 3 Subjects" },
        { duration: "16 HOURS (KS2 & KS3)", price: "€ 120.00", subjects: "Any" },
        { duration: "16 HOURS (A-LEVEL)", price: "€ 200.00", subjects: "Any 2 Subjects" },
        { duration: "24 HOURS (A-LEVEL)", price: "€ 300.00", subjects: "Any 3 Subjects" }
    ];
    const list4 = [
        { duration: "16 HOURS (GCSE)", price: "€ 92.00", subjects: "Any 2 Subjects" },
        { duration: "24 HOURS (GCSE)", price: "€ 125.00", subjects: "Any 3 Subjects" },
        { duration: "16 HOURS (KS2 & KS3)", price: "€ 90.00", subjects: "Any" },
        { duration: "16 HOURS (A-LEVEL)", price: "€ 152.00", subjects: "Any 2 Subjects" },
        { duration: "24 HOURS (A-LEVEL)", price: "€ 225.00", subjects: "Any 3 Subjects" }
    ];


    const renderItem = (item) => (
        <View style={styles.container}>
            <View style={[styles.innerView]}>
                <View style={[styles.header, styles.headerStyle, GlobalStyles.p_10]}>
                    <Text style={[styles.headingText, { color: Color.white }]}>Minimun Hours</Text>
                    <Text style={[styles.headingText, { color: Color.white }]}>Fees To Pay</Text>
                    <Text style={[styles.headingText, { color: Color.white }]}>Remarks</Text>
                </View>
                <View style={GlobalStyles.p_10}>
                    {item && item.map((elem, index) => (
                        <View key={index} style={[styles.rowStyle, styles.header,
                        { borderBottomWidth: index === item.length - 1 ? 0 : 1 }]}>
                            <Text style={[styles.textStyle, { width: '48%', textAlign: 'left' }]}>{elem.duration}</Text>
                            <Text style={[styles.textStyle, { width: '17%', textAlign: 'center' }]}>{elem.price}</Text>
                            <Text style={[styles.textStyle, { width: '35%', textAlign: 'right' }]}>{elem.subjects}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View >
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={styles.heading}>
                        EASTER HOLIDAYS {'\n'}
                        01 April TO 14 April 2024
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Monday To Thursday</Text>
                    </View>
                    <View style={{ padding: 15 }}>
                        <GridTable data={list1} />
                    </View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Friday</Text>
                    </View>
                    <View style={{ padding: 15 }}>
                        <GridTable data={list2} />
                    </View>
                    <Text style={styles.note}>
                        PLEASE NOTE: THESE LESSONS ARE ADD-ON TO THE REGULAR LESSONS AND REGULAR LESSONS WILL GO ON AS SCHEDULED
                    </Text>

                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>For Existing Students</Text>
                    </View>

                    <View style={{ padding: 15 }}>
                        {renderItem(list3)}
                    </View>

                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>For New Students</Text>
                    </View>
                    <View style={{ padding: 15 }}>
                        {renderItem(list4)}
                    </View>
                    <Text style={styles.note}>
                        NOTE: NO COMPENSATION FOR MISSED LESSON.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SummerPakage

const styles = StyleSheet.create({
    heading: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.semiBold,
        padding: 25,
        textAlign: 'center'
    },
    note: {
        color: Color.text,
        fontSize: FontSizes.md,
        fontFamily: FontFamily.bold,
        padding: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    innerView: {
        overflow: 'hidden',
        backgroundColor: Color.white,
        width: '95%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 10,
        shadowOffset: 10,
        elevation: 4,
    },
    textStyle: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
        color: Color.text,
        textAlign: 'right'
    },
    headingText: {
        fontSize: FontSizes.xl,
        color: Color.black,
        fontFamily: FontFamily.interMedium
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerStyle: {
        backgroundColor: Color.primary,
        width: '100%',
    },
    headingText: {
        color: Color.text,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.md
    },
    rowStyle: {
        paddingVertical: 10,
        borderBottomColor: Color.textThree,
        borderBottomWidth: 1
    },
})