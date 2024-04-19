import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const LessonTiming = () => {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={styles.heading}>
                        We are open 7 Days week and 362 Days a year
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Lesson Timings for Brixton</Text>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.subheading}>WEEKDAYS (Monday To Friday)</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>04:30 PM to 06:30 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>06:40 PM to 08:40 PM</Text>
                        </View>
                        <Text style={styles.subheading}>WEEKENDS (Saturday & Sunday)</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>09:00 AM to 11:00 AM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>11:15 AM to 01:15 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>02:00 PM to 04:00 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>04:15 PM to 06:15 PM</Text>
                        </View>
                    </View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Lesson Timings for Hounslow</Text>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.subheading}>WEEKDAYS EVENINGS</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>04:30 PM to 06:30 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>06:35 PM to 08:15 PM</Text>
                        </View>
                        <Text style={styles.subheading}>SATURDAY TIMINGS</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>09:00 AM to 06:00 PM</Text>
                        </View>
                        <Text style={styles.subheading}>SUNDAY TIMINGS</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>09:00 AM to 04:00 PM</Text>
                        </View>

                    </View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Lesson Timings for Woolwich</Text>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.subheading}>WEEKDAYS AFTER SCHOOL</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>04:30 PM to 06:30 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>06:40 PM to 08:20 PM</Text>
                        </View>
                        <Text style={styles.subheading}>SATURDAY / SUNDAY TIMINGS</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>09:00 AM to 11:00 AM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>11:15 AM to 01:15 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>02:00 PM to 04:00 PM</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>04:15 PM to 06:15 PM</Text>
                        </View>

                    </View>
                    <Text style={styles.heading}>
                        CHRISTMAS, EASTER, SUMMER
                        HOLIDAYS
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Time Table</Text>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.subheading}>Monday To Thursday</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>10:00 AM to 02:15 PM</Text>
                        </View>
                        <Text style={styles.subheading}>Friday</Text>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>09:00 AM to 01:15 PM</Text>
                        </View>
                    </View>
                    <Text style={styles.note}>Note: Weekends timetable remains same throughout the year.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LessonTiming

const styles = StyleSheet.create({
    heading: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.semiBold,
        padding: 25,
        textAlign: 'center'
    },
    list: {
        padding: 20
    },
    subheading: {
        fontSize: FontSizes.md,
        color: Color.text,
        fontFamily: FontFamily.bold,
        marginVertical: 10
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Adjust as needed
    },
    bullet: {
        width: 6, // Size of the bullet
        height: 6, // Size of the bullet
        borderRadius: 3, // Make it round
        backgroundColor: 'black', // Color of the bullet
        marginRight: 8, // Spacing between bullet and text
    },
    time: {
        color: Color.textThree,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md
    },
    note: {
        color: Color.text,
        fontSize: FontSizes.md,
        fontFamily: FontFamily.bold,
        padding: 20
    }
})