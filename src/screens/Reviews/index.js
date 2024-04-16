import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Rating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const Reviews = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        review: ''
    })
    const reviewsPerPage = 5; // Number of reviews to display per page
    const [page, setPage] = useState(1);

    const reviews = [
        {
            name: 'Faizan Ahmed Khan',
            review: 'Being a maternal uncle of Muhammad Shahzeb and an Ex-employee of this organization, this is a pride moment for me to see the name of my child at the top of the success stories. Despite of his inherent intelligence and passion to explore new things, his immediate teacher under the superb supervision of Mr. Usman & Mr. Z Ahmed, played vital role for shahzeb\'s success in his early GCSE exam in the very first attempt, where students with standard age scores out from the race. In fact, teachers of this institute are not only polishing bright brains but also actually creating genius leaders for UK.',
            rating: 4
        },
        {
            name: 'Sarah Smith',
            review: 'I can\'t thank the teachers at this institute enough. My child was struggling in school, but after enrolling here, they have shown tremendous improvement in both academics and confidence. The personalized attention and care they receive here are unparalleled.',
            rating: 5
        },
        {
            name: 'John Doe',
            review: 'My experience with this organization has been nothing short of excellent. The staff is knowledgeable, friendly, and truly care about the students\' success. I highly recommend this institute to anyone looking to excel academically.',
            rating: 4
        },
        {
            name: 'Emily Johnson',
            review: 'As a parent, I am extremely satisfied with the quality of education provided by this institute. The teachers go above and beyond to ensure that each student reaches their full potential. I have seen a remarkable improvement in my child\'s academic performance since joining.',
            rating: 5
        },
        {
            name: 'Michael Williams',
            review: 'I am amazed by the dedication of the teachers here. They are always available to answer questions and provide additional support whenever needed. My child enjoys coming to class and has developed a genuine love for learning.',
            rating: 4
        },
        {
            name: 'Jessica Brown',
            review: 'My child has had a fantastic experience at this institute. The teachers are knowledgeable and supportive, and the curriculum is well-structured. I have seen a significant improvement in my child\'s confidence and academic performance since enrolling here.',
            rating: 5
        },
        {
            name: 'David Wilson',
            review: 'I highly recommend this institute to any parent looking for quality education for their child. The teachers are dedicated, and the learning environment is conducive to academic success. My child has flourished academically since joining this institute.',
            rating: 4
        },
        {
            name: 'Sophia Garcia',
            review: 'My child loves going to classes at this institute. The teachers are engaging and make learning enjoyable. I appreciate the individualized attention my child receives, which has helped them overcome their academic challenges.',
            rating: 5
        },
        {
            name: 'Daniel Martinez',
            review: 'I am impressed by the professionalism and dedication of the staff at this institute. They are committed to providing a high-quality education to all students. My child has thrived academically and socially since joining this institute.',
            rating: 4
        },
        {
            name: 'Olivia Rodriguez',
            review: 'This institute has exceeded my expectations in every way. The teachers are passionate about teaching, and the curriculum is rigorous. My child has developed a strong foundation in all subjects and is well-prepared for future academic challenges.',
            rating: 5
        },
        {
            name: 'Olivia Rodriguez',
            review: 'This institute has exceeded my expectations in every way. The teachers are passionate about teaching, and the curriculum is rigorous. My child has developed a strong foundation in all subjects and is well-prepared for future academic challenges.',
            rating: 5
        },
        {
            name: 'Olivia Rodriguez',
            review: 'This institute has exceeded my expectations in every way. The teachers are passionate about teaching, and the curriculum is rigorous. My child has developed a strong foundation in all subjects and is well-prepared for future academic challenges.',
            rating: 5
        },
    ];
    const startIndex = (page - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const onRatingFinish = (rating) => {
        setSelectedRating(rating);
    };

    const handleSubmit = () => {
        console.log({ ...formData, rating: selectedRating })

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {paginatedReviews.map((elem, index) => (
                        <View key={index}>
                            <Text style={styles.name}>{elem.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Rating
                                    ratingCount={5}
                                    imageSize={27}
                                    readonly={true}
                                    startingValue={elem.rating} // enter rating
                                    ratingColor={'#000000'}
                                    style={{ paddingVertical: 10 }}
                                />
                            </View>
                            <Text style={styles.review}>
                                {elem.review}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.pagination}>
                        <TouchableOpacity activeOpacity={0.9} onPress={prevPage} style={{ padding: 20, }}>
                            <Icon size={15} name="doubleleft" color={Color.text} />
                        </TouchableOpacity>
                        <Text style={styles.pageText}>Page {page} of {totalPages}</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={nextPage} style={{ padding: 20, }}>
                            <Icon size={15} name="doubleright" color={Color.text} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.name, { fontFamily: FontFamily.bold }]}>Enter Review here</Text>
                        <InputField
                            label={"Name"}
                            inputMode={"text"}
                            value={formData.name}
                            onChangeText={(text) => onChangeHandler('name', text)}
                        />
                        <InputField
                            label={"Email"}
                            inputMode={"email"}
                            value={formData.email}
                            onChangeText={(text) => onChangeHandler('email', text)}
                        />
                        <InputField
                            label={"Student ID"}
                            inputMode={"numeric"}
                            value={formData.studentId}
                            onChangeText={(text) => onChangeHandler('studentId', text)}
                        />
                        <View style={styles.ratingContainer}>
                            <Rating
                                ratingCount={5}
                                imageSize={27}
                                startingValue={selectedRating} // enter rating
                                ratingColor={'#000000'}
                                style={{ paddingVertical: 10 }}
                                onFinishRating={onRatingFinish}
                            />
                        </View>
                        <InputField
                            multiline
                            onChangeText={(text) => onChangeHandler('review', text)}
                            value={formData.review}
                            label={"Remarks"}
                            inputStyle={{
                                height: screenDimensions.height * 0.2,
                                textAlignVertical: "top",
                            }}
                        />
                        <CustomButton
                            variant={'fill'}
                            title={"Submit Review"}
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Reviews

const styles = StyleSheet.create({
    name: {
        fontSize: FontSizes.xl,
        color: Color.text,
        marginVertical: 25
    },
    ratingContainer: {
        alignItems: 'flex-start',

    },
    review: {
        fontSize: FontSizes.lg,
        color: Color.text,
        lineHeight: 30
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    pageText: {
        fontSize: FontSizes.md,
        color: Color.text
    }
})