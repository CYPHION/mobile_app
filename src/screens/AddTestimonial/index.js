import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
    const user = useSelector(state => state?.user?.data)
    const [review, setReview] = useState('')
    const [open, setOpen] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
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
                    navigation.navigate('testimonials', { added: true })
                }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5 }}
            />
        </View>
    )

    const handleSubmit = () => {
        setIsloading(true)
        API.createTestimonial({ review: review, userId: user.id })
            .then(() => {
                setOpen(true)
                dispatch(globalData(user?.id))
            })
            .catch((err) => {
                customToast('error', 'You have already add a review!')
            })
            .finally(() => setIsloading(false))
    }

    return (
        <ScrollView>
            <MyModal
                modalVisible={open}
                children={renderItem()}
                setModalVisible={setOpen}
            />
            <View style={styles.main}>
                <View style={[styles.bgColor, styles.container, GlobalStyles.p_10]}>
                    <Text style={styles.detailText}>Review - {user?.firstName} {user?.lastName}</Text>
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