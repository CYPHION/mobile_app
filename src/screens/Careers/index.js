import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import RightIcon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../../components/base/CustomButton'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const Careers = ({ navigation }) => {
    const handleToNavigate = () => {
        navigation.navigate('joblisting')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Careers at Prime Tuition</Text>
                    </View>
                    <Text style={[styles.content, { fontFamily: FontFamily.bold }]}>
                        At Prime Tuition, our mission is to change children’s lives by nurturing the skills providing confidence boosting and attainment raising tuition lessons.
                    </Text>
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        So, if you’re looking for a tutoring role in Math’s, English, Science & Modern Languages we will ensure you’ll be joining a team of incredible people, working together to ensure our students thrive in their education and beyond.
                    </Text>
                    <View style={{ padding: 20 }}>

                        <CustomButton
                            variant={'fill'}
                            title={"Click here to apply for Job Application"}
                            onPress={handleToNavigate}
                            btnstyle={{ borderRadius: 50 }}
                        />
                    </View>
                    <Text style={[styles.name]}>
                        WE’RE ALL IN IT TOGETHER!
                    </Text>
                    <View style={styles.design}>
                        <Text style={styles.qoute}>
                            ❛❛
                        </Text>
                        <Text style={styles.innerQoute}>
                            We each play a part in bringing our Mission to life
                        </Text>
                    </View>
                    <View style={styles.design}>
                        <Text style={styles.qoute}>
                            ❛❛
                        </Text>
                        <Text style={styles.innerQoute}>
                            We inspire each other to be the best we can be
                        </Text>
                    </View>
                    <View style={styles.design}>
                        <Text style={styles.qoute}>
                            ❛❛
                        </Text>
                        <Text style={styles.innerQoute}>
                            We create a welcoming environment where each individual feels part of the Prime family.
                        </Text>
                    </View>
                    <Text style={[styles.name]}>
                        Centre Staff opportunities
                    </Text>
                    <View>
                        <View style={styles.boxView}>
                            <Icon size={25} name="leaf" style={styles.boxIcon} />
                            <Text style={styles.box}>
                                Dynamic Environment
                            </Text>
                        </View>
                        <View style={styles.boxView}>
                            <Icon size={25} name="star" style={styles.boxIcon} />
                            <Text style={styles.box}>
                                Training Opportunities
                            </Text>
                        </View>
                        <View style={styles.boxView}>
                            <Icon size={25} name="briefcase" style={styles.boxIcon} />
                            <Text style={styles.box}>
                                Career Progression
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                        WE DO THE PLANNING, SO YOU CAN FOCUS ON DELIVERING LESSONS FOR OUR STUDENTS.
                    </Text>
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        We’ve created a tailor-made programme of educational resources and teaching tools to help you develop your approach and bringing education to life for every child

                        What’s more, as an employee with Prime Tuition, you’ll be provided with opportunities to progress. If you’ve shown promise, passion, and leadership potential, we can plan your pathway to progressing with us.
                    </Text>
                    <View>
                        <View style={styles.boxViewTwo}>
                            <RightIcon size={50} name="check-square-o" style={[styles.boxIcon, { color: Color.active }]} />
                            <Text style={[styles.box, { textAlign: 'center', fontSize: FontSizes.xl, color: Color.text }]}>
                                Rewarding {'\n'} Environment
                            </Text>
                        </View>
                        <View style={styles.boxViewTwo}>
                            <RightIcon size={50} name="check-square-o" style={[styles.boxIcon, { color: Color.active }]} />
                            <Text style={[styles.box, { textAlign: 'center', fontSize: FontSizes.xl, color: Color.text }]}>
                                Flexible hours
                            </Text>
                        </View>
                        <View style={styles.boxViewTwo}>
                            <RightIcon size={50} name="check-square-o" style={[styles.boxIcon, { color: Color.active }]} />
                            <Text style={[styles.box, { textAlign: 'center', fontSize: FontSizes.xl, color: Color.text }]}>
                                Performance {'\n'} related pay
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                        YOUR WORKING PATTERNS
                    </Text>
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        Our staff are ready to support our Students after school, at the weekends and during school holidays, allowing families to benefit from Prime Tuition all education services. {'\n'}{'\n'}
                        As a centre based tutor, you’ll work regular shifts each week. Most of our Tutors work a mixture of weekday evening and weekend shifts.
                    </Text>
                    <View style={styles.leftBorder}>
                        <Text style={[styles.leftBorderText, { marginLeft: 10 }]}>
                            START YOUR {'\n'}APPLICATION {'\n'}
                            <View>
                                <TouchableOpacity activeOpacity={0.9} onPress={handleToNavigate}>
                                    <Text style={[styles.leftBorderText, { fontSize: FontSizes.lg }]}>
                                        APPLY NOW {' '}
                                        <RightIcon name='external-link' size={16} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Text>
                    </View>
                    <Text style={[styles.name]}>
                        Tutor job Role
                    </Text>
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text, textAlign: 'left' }]}>
                        WHO WE’RE LOOKING FOR
                    </Text>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Great role models that are ambitious and driven.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>People with a passion for education who is ambitious and enthusiastic to deliver exceptional service.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Incredible people who will inspire and motivate children.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Exciting people who will throw themselves into our unique culture.</Text>
                        </View>

                    </View>
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text, textAlign: 'left' }]}>
                        ROLES AND RESPONSIBILITIES
                    </Text>
                    <Text style={[styles.content]}>
                        As a Tutor you will form part of a close-knit team dedicated to boost children’s learning and confidence. As a Tutor you will unlock those light bulb moments every single day and inspire children to by recognizing their potentials. {'\n'}{'\n'}
                        You’ll be working with groups of 4-5 children with different ability and backgrounds. You’ll be helping them to work out tricky tasks, encouraging our students to ask for help, identifying their hard work and effort in their progress. You’ll be trained to have a source of different teaching methods at your finger’s tips. We’ll support you with training in the school curriculum and teaching methods, but you should be confident in your subject knowledge, abilities and understanding of subject.
                    </Text>
                    <View style={styles.leftBorder}>
                        <Text style={[styles.leftBorderText, { marginLeft: 10 }]}>
                            APPLY TODAY {'\n'}
                            <View>
                                <TouchableOpacity activeOpacity={0.9} onPress={handleToNavigate}>
                                    <Text style={[styles.leftBorderText, { fontSize: FontSizes.lg }]}>
                                        CLICK HERE  {' '}
                                        <RightIcon name='external-link' size={16} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Text>
                    </View>
                    <Text style={[styles.name]}>
                        What to expect after applying?
                    </Text>
                    <Text style={[styles.name, { paddingHorizontal: 20, color: Color.text }]}>
                        OUR TUTORS ARE PASSIONATE {'\n'}ABOUT EDUCATION, MOTIVATED {'\n'}AND READY FOR A CHALLENGE. {'\n'}SOUND LIKE YOU?{'\n'}
                        APPLY NOW!
                    </Text>
                    <View style={styles.list}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Applying to become a Tutor with us should be nice and straight forward, you can upload your CV online and select which centres would suit you best to work in.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>Next the centre team will receive your application. They do receive quite a lot of interest so they will usually then compile a short list and let you know the outcome of your application within a week.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>If you’re shortlisted then you will be invited to attend a short interview and an assessment relevant to your choice of subject/age Group, you are interested to teach at our centre. you’ll also be given the opportunity to spend some time for trail tutoring to see what it’s all about and to showcase your skills in this area.</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>After that you’ll hear back from the centre within three to five working days with the outcome of your application process.</Text>
                        </View>

                    </View>
                    <Text style={[styles.name]}>
                        Tutors we are looking for!
                    </Text>
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        The applicant will be a motivated individual with a keen interest in encouraging and inspiring students to love learning and excel in the subject areas of Mathematics, English and Science.
                    </Text>
                    <View style={[styles.list, { marginHorizontal: 25 }]}>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Primary Students Tutors
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Secondary Students Tutors
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                A-Level Tutors
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                KS & KS2 English
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                KS1 & KS2 Maths
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                KS3 Maths, English & Science
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                11+ Maths & English
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                GCSE Maths
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                GCSE English
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                GCSE Science
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Modern Languages
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Maths
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Physics
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Biology
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Chemistry
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                English
                            </Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.time}>
                                Verbal & Non-Verbal Tutors
                            </Text>
                        </View>


                    </View>
                    <Text style={[styles.content, { textAlign: 'justify' }]}>
                        Please click on the link below to find out current jobs at Prime Tuition
                    </Text>
                    <View style={[styles.boxView, { flexDirection: 'column', backgroundColor: Color.white, borderWidth: 2, borderColor: Color.primary, }]}>
                        <Text style={[styles.box, { textAlign: 'center', fontSize: FontSizes.xl, color: Color.text }]}>
                            To apply for jobs at {'\n'}Prime Tuition
                        </Text>
                        <CustomButton
                            variant={'fill'}
                            title={"Click here "}
                            onPress={handleToNavigate}
                            btnstyle={{ borderRadius: 50, paddingHorizontal: 25, alignSelf: 'flex-start' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Careers

const styles = StyleSheet.create({
    content: {
        padding: 20,
        fontFamily: FontFamily.medium,
        fontSize: FontSizes.md,
        color: Color.text
    },
    name: {
        fontSize: FontSizes.xl,
        color: Color.primary,
        marginVertical: 25,
        fontFamily: FontFamily.bold,
        textAlign: 'center'
    },
    leftBorderText: {
        fontSize: FontSizes.xxl,
        color: Color.primary,
        fontFamily: FontFamily.bold,
        // marginLeft: 10
    },
    qoute: {
        fontSize: 50,
        color: Color.primary,
        // backgroundColor: 'pink',
    },
    design: {
        padding: 20
    },
    innerQoute: {
        color: Color.text,
        fontSize: FontSizes.xl,
        fontFamily: FontFamily.bold,
    },
    box: {
        color: Color.white,
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.bold,
    },
    boxView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Color.primary,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 55,
    },
    boxViewTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Color.white,
        borderWidth: 2,
        borderColor: Color.primary,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 50,
        height: 110
    },
    boxIcon: {
        color: Color.white
    },
    leftBorder: {
        margin: 20,
        borderLeftWidth: 4,
        borderLeftColor: Color.primary
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