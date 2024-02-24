import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CustomAppBar from '../../components/base/CustomAppBar'
import CustomButton from '../../components/base/CustomButton'
import FlaotingTextInput from '../../components/base/FlaotingTextInput'
import { API } from '../../network/API'
import { handleLogin } from '../../store/slice/user'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, removeError, screenDimensions } from '../../utils/functions'


const ConfirmResetPassword = (prop) => {

    const router = useRoute()
    let email = router.params.email

    const [formData, setFormData] = useState({
        code: '',
        Newpassword: '',
        Confirmpassword: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingResend, setIsLoadingResend] = useState(false)

    const [error, setError] = useState({
        // username: '',
        // password: '',
    })

    const dispatch = useDispatch()

    const saveDataToredux = (data) => {
        dispatch(handleLogin(data))
    }

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

        setError(removeError(name, error))

    };

    const handleSubmit = async () => {
        setIsLoading(true)

        if (!formData.code || !formData.Confirmpassword || !formData.Newpassword) {
            !formData.code && customToast("error", "Otp COde is required")
            !formData.Confirmpassword && customToast("error", "confirm Password is required")
            !formData.Newpassword && customToast("error", "Password is required")
            setIsLoading(false)

        } else {
            if (formData.Confirmpassword.trim() === formData.Newpassword.trim()) {

                let data = {
                    otp: formData.code, email, updateObj: {
                        password: formData.Newpassword
                    }
                }
                await API.checkOtp({
                    data: data
                }).then(res => customToast("success", res?.message)).catch(err => customToast("error", err?.message)).finally(() => setIsLoading(false))
            } else {
                customToast("error", "Password & Confirm Password is not match")
                setIsLoading(false)
            }
        }

    };

    const resendEmail = async () => {
        setIsLoadingResend(true)
        await API.generateOtp({ email: email, resend: true }).then(res => {
            customToast("success", "Resend Email Successfully")
        }).catch(err => customToast("error", err?.message)).finally(() => setIsLoadingResend(false))
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={[styles.picture]}
                        resizeMode="cover"
                        source={require("../../images/Image-17.png")}
                    />
                    <View style={[styles.absoluteImage, styles.picture]} />
                    <View style={[styles.logoView]}>
                        <View style={{ width: screenDimensions.width, position: 'absolute', top: 0 }}>
                            <CustomAppBar color={Color.white} />
                        </View>
                        <Image
                            resizeMode="contain"
                            style={[styles.logo]}
                            source={require("../../images/PT_LogoWhite.png")}
                        />
                        <View>
                            <Text
                                style={[styles.textStyle, { fontFamily: FontFamily.interRegular }]}
                            >
                                Welcome To
                            </Text>
                            <Text
                                style={[
                                    styles.textStyle,
                                    { fontFamily: FontFamily.interBold, textTransform: "uppercase" },
                                ]}
                            >
                                Prime Tuition
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            { gap: 10, height: screenDimensions.height * 0.65, width: screenDimensions.width * 0.9 },
                        ]}
                    >
                        <View
                            style={{
                                gap: 10,
                            }}
                        >
                            <FlaotingTextInput
                                value={formData.code}
                                inputMode={'numeric'}
                                onChangeText={(text) => onChangeHandler("code", text)}
                                label={"Enter Code"}
                                errorMcg={error.email}
                            />
                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.Newpassword}
                                onChangeText={(text) => onChangeHandler("Newpassword", text)}
                                label={"New Password"}
                            />

                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.Confirmpassword}
                                onChangeText={(text) => onChangeHandler("Confirmpassword", text)}
                                label={"Confirm Password"}
                            />


                        </View>
                        <View style={{ gap: 15, alignItems: 'center', marginTop: 20 }}>
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                variant={"fill"}
                                disabled={isLoading}
                                title={"Reset Password"}
                                onPress={handleSubmit}
                            />
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                disabled={isLoadingResend}
                                title={"Resend Email"}
                                onPress={resendEmail}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

export default ConfirmResetPassword

const styles = StyleSheet.create({
    picture: {
        position: 'absolute',
        height: screenDimensions.height,
        width: screenDimensions.width
    },
    absoluteImage: {
        top: 0,
        // zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    logo: {
        width: screenDimensions.width * 0.4
    },
    logoView: {
        gap: 15,
        width: screenDimensions.width,
        height: screenDimensions.height * 0.35,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: FontSizes.xxl,
        color: Color.white,
        textAlign: 'center'
    }
})