import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import MyModal from '../../components/base/Modal'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const AddTestimonial = () => {

    const [review, setReview] = useState('')
    const [open, setOpen] = useState(false)

    const renderItem = () => (
        <View style={styles.modal}>
            <View style={styles.iconView}>
                <Icon name='check' color={Color.white} size={screenDimensions.width * 0.1} />
            </View>
            <Text style={styles.modalText}>Review Submitted Successfully</Text>
            <CustomButton
                title='OK'
                variant='fill'
                onPress={() => setOpen(false)}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5 }}
            />
        </View>
    )



    return (
        <ScrollView>
            <MyModal
                modalVisible={open}
                children={renderItem()}
                setModalVisible={setOpen}
            />
            <View style={styles.main}>
                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Review - Abdullah Khan</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <InputField
                        label={""}
                        multiline
                        value={review}
                        onChangeText={(text) => setReview(text)}
                    />
                    <CustomButton
                        title='Submit review'
                        variant='fill'
                        onPress={() => setOpen(true)}
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
        padding: 10,

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