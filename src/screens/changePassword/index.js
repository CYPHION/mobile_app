import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import MyModal from '../../components/base/Modal'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const ChangePasswordScreen = () => {
    const [open, setOpen] = useState(false)



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

    return (
        <>

            <View style={{ flex: 1, backgroundColor: Color.white }}>
                <View style={{ paddingVertical: 15, paddingHorizontal: 10, gap: 20 }}>
                    <View style={{ gap: 10 }}>
                        <InputField
                            secureTextEntry={true} // if you password Field pass secureTextEntry=true
                            value={formData.newPass}
                            label={"New Password"}
                            onChangeText={(text) => onChangeHandler('newPass', text)}
                        />
                        <InputField
                            secureTextEntry={true} // if you password Field pass secureTextEntry=true
                            value={formData.confPass}
                            label={"Confirm Password"}
                            onChangeText={(text) => onChangeHandler('confPass', text)}
                        />
                    </View>
                    <CustomButton
                        title='Confirm'
                        variant='fill'
                        onPress={() => setOpen(true)}
                    />
                </View>
                <MyModal
                    modalVisible={open}
                    setModalVisible={setOpen}
                    children={
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.modalTextHeading]}>Verification code</Text>

                            <View style={styles.modalOtp}>
                                <Text style={{ position: 'absolute', top: 10, fontSize: 25 }} >this is custom design,</Text>
                                <View style={styles.otp} ></View>
                                <View style={styles.otp} ></View>
                                <View style={styles.otp} ></View>
                                <View style={styles.otp} ></View>
                                <View style={styles.otp} ></View>
                            </View>
                            <Text style={styles.modalText}>
                                00:45
                            </Text>
                            <CustomButton
                                title={'Resend'}
                                btnstyle={styles.modalButton}

                            />
                            <CustomButton
                                btnstyle={styles.modalButton}
                                title={'Confirm'}
                                variant='fill'
                            />
                        </View>
                    }
                />
            </View>
        </>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    modalTextHeading: {
        fontFamily: FontFamily.interRegular,
        color: Color.text,
        fontSize: FontSizes.xl
    },
    modalButton: {
        padding: 10
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