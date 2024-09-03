import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import CustomButton from '../../components/base/CustomButton'
import LoadingScreen from '../../components/base/LoadingScreen'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { decodeHtmlEntities, screenDimensions } from '../../utils/functions'

const dummyData = [
    {
        id: 1,
        title: "MATHS TUTORING",
        description: `
                    <p style="text-index:50px;">
                      </p><p>Prime Tuition is a dynamic and innovative educational institution committed to fostering excellence in education. We take pride in providing a stimulating learning environment that nurtures the intellectual and personal growth of our students. As we continue to grow, we are seeking a dedicated and experienced individual to join our team as Supervisor/Head of English.</p>
                    <p><strong>Position Overview:</strong></p>
                    <p>As the English Department Supervisor, you will play a crucial role in overseeing and enhancing the academic performance of students within the English department. You will be responsible for monitoring and guiding the work of students, ensuring adherence to curriculum standards, and fostering an environment that promotes a passion for the English language and literature.</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <p><strong>Supervise Classroom Activities:</strong></p>
                    <ul>
                    <li>Observe English classes to ensure effective teaching methodologies and engagement.</li>
                    <li>Provide constructive feedback to teachers to enhance classroom dynamics and student participation</li>
                    </ul>
                    <p><strong>Curriculum Oversight:</strong></p>
                    <ul>
                    <li>Collaborate with the curriculum development team to ensure alignment with educational standards.</li>
                    <li>Regularly review and update English curriculum materials to meet evolving educational needs.</li>
                    </ul>
                    <p><strong>Student Performance Monitoring:</strong></p>
                    <ul>
                    <li>Implement systems to monitor and assess student progress in English language skills.</li>
                    <li>Identify students who may need additional support and coordinate interventions.</li>
                    </ul>
                    <p><strong>Professional Development:</strong></p>
                    <ul>
                    <li>Conduct workshops and training sessions for English teachers to enhance their teaching skills.</li>
                    <li>Stay informed about current trends and best practices in English language education.</li>
                    </ul>
                    <p><strong>Parent and Stakeholder Communication:</strong></p>
                    <ul>
                    <li>Maintain open communication channels with parents regarding student performance and departmental initiatives.</li>
                    <li>Collaborate with other departments to ensure a holistic educational experience for students.</li>
                    </ul>
                    <p><strong>Qualifications:</strong></p>
                    <ul>
                    <li>Minimum Bachelor's degree in English, (Preferably Master's Degree).</li>
                    <li>A minimum of 3 years of teaching experience in English language and literature.</li>
                    <li>Proven experience in a supervisory or leadership role within an educational setting.</li>
                    <li>Strong knowledge of curriculum development, instructional strategies, and assessment methods.</li>
                    <li>Excellent communication and interpersonal skills.</li>
                    </ul>
                    <p><strong>Working hours: </strong></p>
                    <p>Monday to Friday: 4:30 pm to 8:40 pm</p>
                    <p>Saturday &amp; Sunday: 9:00 am to 6:15 pm</p>
                    <ul>
                    <li>
                    <p><strong>Benefits include:</strong></p>
                    <ul>
                    <li>Flexible Working hours from our working hours timings</li>
                    <li>Yearly performance-based reviews</li>
                    <li>UK Visa Sponsorship option</li>
                    <li>Pension and maternity pay</li>
                    </ul>
                    </li>
                    </ul>
                    <p><strong>How to Apply:</strong></p>
                    <p>If you are passionate about education and have the skills and experience to lead the English Department to new heights, we invite you to apply from our careers portal online or&nbsp;<strong>s</strong>ubmit your resume and cover letter by email at<strong> (<a href="mailto:Careers@primetuition.co.uk">Careers@primetuition.co.uk</a>).</strong></p>
                    <p><strong> Selective candidates would be contacted for a Tutoring Skills Assessment &amp; interview before the job offer.</strong></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
             `,
        location: "BRIXTON",
        validityDate: "2024-04-30T00:00:00.000Z",
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-03-24T10:37:20.000Z",
        updatedAt: "2024-04-17T11:59:16.000Z"
    },
    {
        id: 2,
        title: "Chemistry teacher",
        description: `
                    <p style="text-index:50px;">
                      </p><p>Prime Tuition is a dynamic and innovative educational institution committed to fostering excellence in education. We take pride in providing a stimulating learning environment that nurtures the intellectual and personal growth of our students. As we continue to grow, we are seeking a dedicated and experienced individual to join our team as Supervisor/Head of English.</p>
                    <p><strong>Position Overview:</strong></p>
                    <p>As the English Department Supervisor, you will play a crucial role in overseeing and enhancing the academic performance of students within the English department. You will be responsible for monitoring and guiding the work of students, ensuring adherence to curriculum standards, and fostering an environment that promotes a passion for the English language and literature.</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <p><strong>Supervise Classroom Activities:</strong></p>
                    <ul>
                    <li>Observe English classes to ensure effective teaching methodologies and engagement.</li>
                    <li>Provide constructive feedback to teachers to enhance classroom dynamics and student participation</li>
                    </ul>
                    <p><strong>Curriculum Oversight:</strong></p>
                    <ul>
                    <li>Collaborate with the curriculum development team to ensure alignment with educational standards.</li>
                    <li>Regularly review and update English curriculum materials to meet evolving educational needs.</li>
                    </ul>
                    <p><strong>Student Performance Monitoring:</strong></p>
                    <ul>
                    <li>Implement systems to monitor and assess student progress in English language skills.</li>
                    <li>Identify students who may need additional support and coordinate interventions.</li>
                    </ul>
                    <p><strong>Professional Development:</strong></p>
                    <ul>
                    <li>Conduct workshops and training sessions for English teachers to enhance their teaching skills.</li>
                    <li>Stay informed about current trends and best practices in English language education.</li>
                    </ul>
                    <p><strong>Parent and Stakeholder Communication:</strong></p>
                    <ul>
                    <li>Maintain open communication channels with parents regarding student performance and departmental initiatives.</li>
                    <li>Collaborate with other departments to ensure a holistic educational experience for students.</li>
                    </ul>
                    <p><strong>Qualifications:</strong></p>
                    <ul>
                    <li>Minimum Bachelor's degree in English, (Preferably Master's Degree).</li>
                    <li>A minimum of 3 years of teaching experience in English language and literature.</li>
                    <li>Proven experience in a supervisory or leadership role within an educational setting.</li>
                    <li>Strong knowledge of curriculum development, instructional strategies, and assessment methods.</li>
                    <li>Excellent communication and interpersonal skills.</li>
                    </ul>
                    <p><strong>Working hours: </strong></p>
                    <p>Monday to Friday: 4:30 pm to 8:40 pm</p>
                    <p>Saturday &amp; Sunday: 9:00 am to 6:15 pm</p>
                    <ul>
                    <li>
                    <p><strong>Benefits include:</strong></p>
                    <ul>
                    <li>Flexible Working hours from our working hours timings</li>
                    <li>Yearly performance-based reviews</li>
                    <li>UK Visa Sponsorship option</li>
                    <li>Pension and maternity pay</li>
                    </ul>
                    </li>
                    </ul>
                    <p><strong>How to Apply:</strong></p>
                    <p>If you are passionate about education and have the skills and experience to lead the English Department to new heights, we invite you to apply from our careers portal online or&nbsp;<strong>s</strong>ubmit your resume and cover letter by email at<strong> (<a href="mailto:Careers@primetuition.co.uk">Careers@primetuition.co.uk</a>).</strong></p>
                    <p><strong> Selective candidates would be contacted for a Tutoring Skills Assessment &amp; interview before the job offer.</strong></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
             `,
        location: "dsa",
        validityDate: "2024-05-27T19:00:00.000Z",
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-04-17T12:05:15.000Z",
        updatedAt: "2024-04-17T12:05:15.000Z"
    }
]

const JobListing = ({ navigation }) => {
    const [loaded, setLoaded] = useState(true)
    const [refresh, setRefresh] = useState(false);
    const [jobs, setJobs] = useState([])
    const handleToNavigate = (id) => {
        navigation.navigate('jobapply', { id })
    }

    jobs.sort((a, b) => a.displayOrder - b.displayOrder);

    const getAllJobs = () => {
        API.getAllJobs()
            .then(res => setJobs(res?.data))
            .catch(err => console.log(err))
            .finally(() => {
                setRefresh(false)
                setLoaded(false)
            })

    }

    // Function to handle refresh action
    const handleRefresh = () => {
        setRefresh(true);
        getAllJobs()
    };

    useEffect(() => {
        getAllJobs()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingScreen loading={loaded} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }
            >
                <View style={{ padding: 20 }}>
                    {jobs.map((elem, index) => (
                        <View style={{ marginBottom: 30 }} key={index}>
                            <Text style={styles.title}>{elem.title}</Text>
                            <RenderHTML
                                source={{ html: decodeHtmlEntities(elem?.description) }}
                                contentWidth={screenDimensions.width}
                                baseStyle={styles.notificationNameFont}
                                enableExperimentalMarginCollapsing={true}
                            />
                            <CustomButton
                                variant={'fill'}
                                title={"Apply Now"}
                                onPress={() => handleToNavigate(elem?.id)}
                                btnstyle={{ width: 120 }}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default JobListing

const styles = StyleSheet.create({
    notificationNameFont: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.lg,
        color: Color.text,
    },
    title: {
        color: Color.text,
        fontSize: FontSizes.xxl,
        fontFamily: FontFamily.interBold
    }
})