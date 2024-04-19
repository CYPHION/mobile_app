import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const OurServices = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Preparations</Text>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>GCSE & A Level Exams</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>11+ and 13+ Exams</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>KS3 & 13+ TUITION</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>KEY STAGE 1 & 2</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>SATS Preprations</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>11+ Exam Tuition</Text>
                        </View>
                    </View>

                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Programs Offered</Text>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Weekdays After school</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Summer School</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Early Summer Offer</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Adult Learning</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Child Care</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Exam Entry Form</Text>
                        </View>
                    </View>

                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Awarding Bodies</Text>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>OFSTED Registered</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>EDEXCEL</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>AQA</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>OCR</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>A-Levels Result</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>GCSE Result</Text>
                        </View>
                    </View>

                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Elements</Text>
                    </View>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Apply online</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Report an Absence</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Fee</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Summer Package</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>COVID-19 Policy</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Terms and Conditions</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Lesson Timings</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Financial Support</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Dyslexia Student</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>FAQ</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OurServices

const styles = StyleSheet.create({
    list: {
        padding: 20
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
        fontFamily: FontFamily.interBold,
        fontSize: FontSizes.lg
    },
})