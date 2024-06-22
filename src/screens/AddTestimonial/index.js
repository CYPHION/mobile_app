import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import MyModal from '../../components/base/Modal'
import { API } from '../../network/API'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const AddTestimonial = () => {
    const [review, setReview] = useState('')
    const [open, setOpen] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const navigation = useNavigation()
    // Redux state and dispatch
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    // Function to render the modal content
    const renderItem = () => (
        <View style={styles.modal}>
            <View style={styles.iconView}>
                <Icon name='check' color={Color.white} size={screenDimensions.width * 0.1} />
            </View>
            <Text style={styles.modalText}>Review Submitted Successfully</Text>
            <CustomButton
                title='OK'
                variant='fill'
                onPress={() => {
                    navigation.navigate('tabs', { screen: 'home' })
                }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5 }}
            />
        </View>
    )
    // Function to handle form submission
    const handleSubmit = () => {
        setIsloading(true)
        // Call API to create testimonial
        API.createTestimonial({ review: review, userId: user.id })
            .then(() => {
                setOpen(true) // Open modal on successful submission
                dispatch(globalData(user?.id))  // Dispatch action to update global data
            })
            .catch((err) => {
                customToast('error', 'You have already add a review!') // Display error message if review already exists
            })
            .finally(() => setIsloading(false))  // Set loading state to false after API call
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>


            <ScrollView>
                <MyModal
                    modalVisible={open}
                    children={renderItem()}
                    setModalVisible={setOpen}
                />
                <View style={styles.main}>
                    <View style={[GlobalStyles.headerStyles, GlobalStyles.p_10]}>
                        <Text style={GlobalStyles.headerTextStyle}>Review - {user?.firstName} {user?.lastName}</Text>
                    </View>
                    <View style={GlobalStyles.p_10}>
                        <InputField
                            label={""}
                            multiline
                            value={review}
                            onChangeText={(text) => setReview(text)}
                        />
                        <CustomButton
                            title='Submit review'
                            variant='fill'
                            disabled={!(review.length > 0)}
                            // onPress={() => setOpen(true)}
                            onPress={handleSubmit}
                            isloading={isloading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddTestimonial

const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    bgColor: {
        backgroundColor: Color.grayBackground,

    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium
    },
    iconView: {
        backgroundColor: Color.primary,
        width: screenDimensions.width * 0.15,
        height: screenDimensions.width * 0.15,
        borderRadius: screenDimensions.width * (0.15 * 0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        alignItems: 'center',
        gap: 10
    },
    modalText: {
        fontFamily: FontFamily.interBold,
        color: Color.text,
        fontSize: FontSizes.lg
    }
})