import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const Fees = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Tuition Classes</Text>
                    <Text style={styles.description}>
                        Our fee payments are from £7.00 per hour to £15.00 per hour for Year 1 to A-levels.{'\n'}{'\n'}
                        Special offers for students who attend 14 or more hours a week (please contact in office). Special Discount offers on Weekdays(Monday To Thursday) for 06:40pm to 08:40pm Lessons.
                    </Text>
                    <Text style={styles.heading}>Summer School</Text>
                    <Text style={styles.description}>
                        Half price for Summer School. Contact in office to get more detail about price plan.
                    </Text>
                    <Text style={styles.heading}>Childcare After School Club</Text>
                    <Text style={styles.description}>
                        Fee plan start from £8.50 per hour to £15:00 per hour*.
                    </Text>
                    <Text style={styles.heading}>Discounted Fee</Text>
                    <Text style={styles.description}>
                        You might be entitled for a discount of 70% to 85% if you are working part time (16 hours to 30 hours per week) or you are a full time student to claim this amount for your child/children.{'\n'}{'\n'}
                        Terms & Conditions Apply
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Fees

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    heading: {
        fontSize: FontSizes.xxl,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginVertical: 10
    },
    description: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.regular,
        color: Color.text
    }
})