import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import image1 from '../../images/aboutus1.png'
import image2 from '../../images/aboutus2.png'
import image3 from '../../images/bullet.jpg'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Welcome to Prime Tuition
                </Text>
                <Text style={[styles.subName, { paddingHorizontal: 20, color: Color.text }]}>
                    Education is at its Prime.
                </Text>


                <Text style={[styles.content, { textAlign: 'justify' }]}>
                    Step into a learning environment built around excellence, trust, and a relentless commitment to every child’s progress. With over 16 years of experience, Prime Tuition has become one of London’s most dependable and results-driven education providers, now available at your fingertips.
                    {'\n'}{'\n'}
                </Text>
                <View style={styles.main}>
                    <Image resizeMode='contain' style={styles.pictures} source={image1} />
                </View>

                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Prime Tuition Offers
                </Text>
                <View style={styles.main}>
                    <Image resizeMode='contain' style={[styles.pictures, { height: 500, backgroundColor: Color.white }]} source={image3} />
                </View>
                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Our Mission
                </Text>
                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            To provide every student with a structured, safe, and inspiring academic environment where genuine learning takes place and measurable progress is guaranteed.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            We aim to raise educational standards by delivering a premium-level teaching experience that remains accessible to families across the UK.
                        </Text>
                    </View>

                </View>
                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Our Vision
                </Text>
                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            To become the UK’s most trusted tuition organisation — recognised for academic excellence, outstanding results, exceptional safeguarding standards, and a commitment to shaping confident, capable, future-ready students.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            We envision a world where high-quality education is not a privilege, but a foundation accessible to every child.
                        </Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <Image resizeMode='contain' style={[styles.pictures, { height: 500 }]} source={image2} />
                </View>
                <Text style={[styles.content, { textAlign: 'justify' }]}>Your child’s success story continues here — and we’re honoured to be part of the journey.</Text>
                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Message from Principle
                </Text>
                <Text style={[styles.content, { textAlign: 'justify' }]}>
                    Prime Tuition began with a simple idea — to create a learning space where students feel valued, supported, and academically empowered. Since 2009, our journey has been driven by passion, integrity, and a dedication to helping young people achieve their best.
                    Every lesson, every tutor, and every centre reflects our promise to parents: genuine progress, strong character-building, and consistent results.
                    {'\n'}{'\n'}
                    “Our vision has always been to build an organisation rooted in consistency, academic excellence, and strong operational standards. Over the years, we have strengthened our safeguarding culture, enhanced our teaching framework, and introduced structured systems that ensure every family receives the same high-quality experience across all our centres.
                    We remain committed to delivering education that truly transforms outcomes for young learners.
                    ”
                    {'\n'}{'\n'}
                    <Text style={styles.name}>Thank you for trusting us with your child’s education.</Text>
                    {'\n'}{'\n'}
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                        Mr Ahmed & Mr Usman
                    </Text>
                    {'\n'}
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        Founders & Directors
                    </Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        gap: 30
    },
    pictures: {
        backgroundColor: Color.white,
        width: screenDimensions.width * 0.8,
        height: 300
    },
    name: {
        fontSize: FontSizes.xl,
        color: Color.primary,
        marginVertical: 25,
        fontFamily: FontFamily.bold,
        textAlign: 'center'
    },
    subName: {
        fontSize: FontSizes.md,
        color: Color.textThree,
        fontFamily: FontFamily.medium,
        textAlign: 'center'
    },
    content: {
        padding: 20,
        fontFamily: FontFamily.medium,
        fontSize: FontSizes.md,
        color: Color.text
    },
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
        alignSelf: 'flex-start',
        marginTop: 7
    },
    time: {
        color: Color.text,
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.lg
    },
})