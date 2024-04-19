import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import image1 from '../../images/aboutus1.png'
import image2 from '../../images/aboutus2.png'
import image3 from '../../images/bullets.png'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Students are Welcome to Prime Tuition
                </Text>
                <Text style={[styles.content, { textAlign: 'justify' }]}>
                    Prime Tuition has been offering the highest quality tuition services to students of Primary, Secondary, Higher and A-Level Courses. The number of students has increased significantly as most of our students excel in their examinations. At Prime Tuition, we constantly update ourselves with the latest requirements of school syllabus and examinations. We understand and have also analysed the needs of our students and thus provide appropriate resources and tailor-made notes to supplement what the students are learning in school.{'\n'}{'\n'}
                    Indeed, living in a world that is rapidly changing, we realise that students nowadays are heavily influenced by technology. Therefore, we provide state-of-the-art facilities and teaching tools to assist our students. Our tuition centre goes through a strict process in hiring our tutors. We make sure that our friendly tutors are CRB checked qualified individuals, have a burning passion, and are dedicated in educating our students. We also provide spacious and comfortable study area for our students, making it as their second home for living.{'\n'}{'\n'}
                    We believe that each student has unique potential. Prime Tuition strives to bring out the best in your child academically. We believe that by employing appropriate and effective teaching method, we can help your child to enjoy learning and develop his or her potential.
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
                            The company mission is to assist and provide cooperation’s with academic schools to improve self-developments and educations to ensure excellent future.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            Present employment opportunities to the graduates and high-achieving undergraduates.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            Utilizing the expertise of experience teachers/ officers including retirees to contribute to educational benefits to the institution.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            Exercising the proper definition of ‘Tuition School’ which is to help those students who need better understanding on their limitations of certain subjects.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            Provide varieties of teaching and learning tools incorporated with relevant theories applies to the academic purposes.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            Prioritizing on the accomplishment of our duty to ensure the success of the students with high level of integrity, discipline, and honesty rather than profit maximization. Ensuring their parents expenses are valued.
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
                            Our vision is to be a “Tuition and Learning Centre” with excellent level of pedigree and known for good integrity and reliability in nurturing students to achieve excellence and success.
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.time}>
                            We are an institution run by experienced teachers, graduates, high-achieving undergraduates who are eager to pass on their experiences and expertise. Our schools have a quality control program to provide you the professional, prepared tutors who know the school modules inside out. It is Prime Tuition’s dream to instil students with the fundamental skills and core knowledge that will reward them their best possible Results in their exams.
                        </Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <Image resizeMode='contain' style={[styles.pictures, { height: 500 }]} source={image2} />
                </View>
                <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                    Message from Principle
                </Text>
                <Text style={[styles.content, { textAlign: 'justify' }]}>
                    Prime Tuition is an outstanding place for your son/ daughter to study and I am delighted to welcome you to our evening for parents of all students from KS1 to A-level. I am proud and excited to be the principal and my priority is to build upon Prime Tuition’s legacy of success. It is after all our consistent record of outstanding achievement that sets us apart. As one of the largest education organisations locally, we believe we offer a unique learning environment and a tuition experience that is unrivalled for over many years. We have a reputation for being creative, innovative, and providing our students with pathways to new and exciting opportunities that they never imagined. Our pledge is to help students work with our staff and their parents and carers to achieve the highest standards possible. You should be reassured as parents that your son/daughter is studying at a school where students continue to succeed at levels well above the national rates and students completing their 7+, 11+, 13+, SATS, GCSE & A-Levels are performing higher than the national rates for all education centres based in South London which is a fantastic achievement. Our SATS, GCSE & A-level students achieve excellence too and the progress our students make from KS1 to the time they leave Prime Tuition puts our organisation in the top for value added in the country. Our ambition for your child and all our students is very simple. We want them to thrive at Prime Tuition and achieve their full potential so that they can progress to the next exciting stage of their career, whether that is university, employment, apprenticeship, or other training course.{'\n'}{'\n'}
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                        Mr Ahmed
                    </Text>
                    {'\n'}
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        Principal
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