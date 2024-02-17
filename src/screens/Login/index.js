import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import FlaotingTextInput from '../../components/base/FlaotingTextInput'
import { handleLogin } from '../../store/slice/user'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'


const LoginScreen = (prop) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState({
        username: '',
        password: '',
    })

    const dipatch = useDispatch()

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

        setError(prev => ({
            ...prev,
            [name]: ''
        }))

    };

    const handleSubmit = () => {
        setIsLoading(true)
        if (formData.username.toLowerCase().trim() !== '' && formData.username.toLowerCase() === 'admin@gmail.com') {
            if (formData.password.trim() == '123456') {
                const userData = {
                    email: formData.username,
                }
                dipatch(handleLogin(userData))
                setIsLoading(false)
            } else {
                setError(prev => ({ ...prev, password: "Incorrect Password" }))
                setIsLoading(false)

            }
        } else {
            setError(prev => ({ ...prev, username: "Incorrect username" }))
            setError(prev => ({ ...prev, password: "Enter Password" }))
            setIsLoading(false)

        }
    }



    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Image
                        style={[styles.picture]}
                        resizeMode="cover"
                        source={require("../../images/Image-17.png")}
                    />
                    <View style={[styles.absoluteImage, styles.picture]} />
                    <View style={[styles.logoView]}>
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
                            { gap: 20, alignItems: "center", height: screenDimensions.height * 0.65 },
                        ]}
                    >
                        <Text
                            style={{
                                marginTop: 20,
                                color: Color.white,
                                width: screenDimensions.width * 0.9,
                                fontFamily: FontFamily.interRegular,
                                fontSize: FontSizes.xl,
                            }}
                        >
                            Login
                        </Text>
                        <View
                            style={{
                                position: "relative",
                                gap: 10,
                                width: screenDimensions.width * 0.9,
                                height: screenDimensions.height * 0.3,
                            }}
                        >
                            <FlaotingTextInput
                                value={formData.username}
                                onChangeText={(text) => onChangeHandler("username", text)}
                                label={"username/email"}
                                errorMcg={error.username}
                            />
                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.password}
                                onChangeText={(text) => onChangeHandler("password", text)}
                                label={"Password"}
                            />
                            <Text
                                style={{
                                    color: Color.white,
                                    width: screenDimensions.width * 0.9,
                                    fontFamily: FontFamily.interRegular,
                                    fontSize: FontSizes.md,
                                    textAlign: "right",
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </View>
                        <View style={{ gap: 15 }}>
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                variant={"fill"}
                                disabled={isLoading}
                                title={"Login"}
                                onPress={() => handleSubmit()}
                            />
                            <Text
                                style={{
                                    color: Color.white,
                                    width: screenDimensions.width * 0.8,
                                    fontFamily: FontFamily.interRegular,
                                    fontSize: FontSizes.md,
                                    textAlign: "center",
                                }}
                            >
                                Dont have an account? Register
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default LoginScreen

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
        gap: 20,
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