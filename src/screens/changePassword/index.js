import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast } from '../../utils/functions'

const ChangePasswordScreen = () => {
    const [isLoading, setIsloading] = useState(false)
    const [error, seterror] = useState({
        newPass: '',
        confPass: ''
    })
    const user = useSelector(state => state?.user?.data)

    const [formData, setFormData] = useState({
        newPass: '',
        confPass: ''
    })


    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
    };

    const handleSubmit = () => { // Function to handle form submission
        setIsloading(true) // Set loading state to true
        if (formData.confPass.trim() === '' || formData.newPass.trim() === '') { // Check if passwords are empty
            customToast('error', 'Please enter password') // Show error message
        } else {
            if (formData.confPass === formData.newPass) { // Check if passwords match

                API.updateUser({ password: formData.newPass, id: user?.id }) // Call API to update user password
                    .then((res) => {
                        customToast('success', res.message) // Show success message
                    })
                    .catch((err) => {
                        customToast('error', err)  // Show error message
                    })
                    .finally(() => {
                        setFormData({  // Clear form data
                            newPass: '',
                            confPass: ''
                        })
                        setIsloading(false) // Set loading state to false
                    })
            } else {
                customToast('error', 'Password must be same.') // Show error message if passwords don't match
                setIsloading(false)  // Set loading state to false
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: Color.white }}>
                <View style={{ paddingVertical: 15, paddingHorizontal: 10, gap: 20 }}>
                    <View style={{ gap: 10 }}>
                        <InputField
                            secureTextEntry={true} // if you password Field pass secureTextEntry=true
                            value={formData.newPass}
                            label={"New Password"}
                            onChangeText={(text) => onChangeHandler('newPass', text)}
                            error={error.newPass}
                            labelStyle={{ color: Color.primary }}
                        />
                        <InputField
                            secureTextEntry={true} // if you password Field pass secureTextEntry=true
                            value={formData.confPass}
                            label={"Confirm Password"}
                            onChangeText={(text) => onChangeHandler('confPass', text)}
                            error={error.confPass}
                            labelStyle={{ color: Color.primary }}
                        />
                    </View>
                    <CustomButton
                        title='Confirm'
                        variant='fill'
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </View>
                {/* <MyModal
                    modalVisible={open}
                    setModalVisible={setOpen}
                    children={
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.modalTextHeading]}>Verification code</Text>

                            <View style={styles.modalOtp}>
                                <Otp handleTextChange={(text) => console.log('tesxt-->', text)} />
                            </View>
                            <Text style={styles.modalText}>
                                00:45
                            </Text>
                            <CustomButton
                                title={'Resend'}
                                btnstyle={styles.modalButton}

                            />
                            <CustomButton
                                title={'Confirm'}
                                variant='fill'
                            />
                        </View>
                    }
                /> */}
            </View>
        </SafeAreaView>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    modalTextHeading: {
        fontFamily: FontFamily.interRegular,
        color: Color.text,
        fontSize: FontSizes.xl
    },
    modalText: {
        textAlign: 'center',
        fontSize: FontSizes.md,
        fontFamily: FontFamily.interRegular,
        color: Color.textThree
    },
    otp: {
        height: 50,
        width: 40,
        borderColor: Color.borderColor,
        borderWidth: 1,
        borderRadius: 10
    },
    modalOtp: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative'
    }

})