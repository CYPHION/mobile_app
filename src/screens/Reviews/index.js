import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Rating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import LoadingScreen from '../../components/base/LoadingScreen'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, screenDimensions } from '../../utils/functions'


const initialData = {
    name: '',
    email: '',
    studentId: '',
    review: ''
}

const Reviews = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [pageLoad, setPageLoad] = useState(true)
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState(initialData)
    const reviewsPerPage = 5; // Number of reviews to display per page
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

    const getAllReview = () => {
        API.getAllReview()
            .then(res => setReviews(res?.data))
            .catch(err => console.log(err.message))
            .finally(() => setPageLoad(false))
    }

    const handleSubmit = () => {
        setIsLoading(true)
        const obj = {
            name: formData.name,
            email: formData.email,
            studentId: Number(formData.studentId),
            rating: Number(selectedRating),
            review: formData.review
        }

        API.createReview(obj)
            .then(res => {
                customToast("success", res?.message)
                getAllReview()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setFormData(initialData)
                setIsLoading(false)
            })

    }



    useEffect(() => {
        getAllReview()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <LoadingScreen loading={pageLoad} />
                <View style={{ padding: 20 }}>
                    {paginatedReviews?.length > 0 ? <>
                        {paginatedReviews?.map((elem, index) => (
                            <View key={index}>
                                <Text style={styles.name}>{elem?.name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Rating
                                        ratingCount={5}
                                        imageSize={27}
                                        readonly={true}
                                        startingValue={elem?.rating} // enter rating
                                        ratingColor={'#000000'}
                                        style={{ paddingVertical: 10 }}
                                    />
                                </View>
                                <Text style={styles.review}>
                                    {elem?.review}
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
                    </> :
                        <View>
                            <Text style={[styles.name, { fontFamily: FontFamily.bold, textAlign: 'center', color: Color.primary }]}>Reviews Not Found</Text>

                        </View>}
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
                            label={"Review"}
                            inputStyle={{
                                height: screenDimensions.height * 0.2,
                                textAlignVertical: "top",
                            }}
                        />
                        <CustomButton
                            variant={'fill'}
                            title={"Submit Review"}
                            onPress={handleSubmit}
                            disabled={isLoading}
                            isLoading={isLoading}
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