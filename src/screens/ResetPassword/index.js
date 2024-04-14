import { useNavigation } from '@react-navigation/native'
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


const ResetPassword = (prop) => {
    // Imports
    const navigation = useNavigation(); // Navigation hook from React Navigation
    const [formData, setFormData] = useState({ email: '' }); // Form data state
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState({}); // Error state
    const dispatch = useDispatch(); // Redux dispatch function

    // Function to save data to Redux store
    const saveDataToredux = (data) => {
        dispatch(handleLogin(data));
    };

    // Function to handle changes in form fields
    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
        setError(removeError(name, error)); // Clear error for the field
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        setIsLoading(true); // Set loading state to true
        if (!formData?.email) { // If email is not provided
            !formData.email && customToast("error", "Email is required"); // Show error message
            setIsLoading(false); // Set loading state to false
        } else { // If email is provided
            await API.generateOtp({ email: formData.email }) // Call API to generate OTP
                .then(res => {
                    navigation.navigate('confirmPassword', { email: formData.email }); // Navigate to confirm password screen
                })
                .catch(err => customToast("error", err?.message)) // Show error message if API call fails
                .finally(() => setIsLoading(false)); // Set loading state to false
        }
    };



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
                        <Text
                            style={{
                                marginTop: 20,
                                color: Color.white,
                                fontFamily: FontFamily.interRegular,
                                fontSize: FontSizes.xl,
                            }}
                        >
                            Reset Password
                        </Text>
                        <View
                            style={{
                                gap: 10,
                            }}
                        >
                            <FlaotingTextInput
                                value={formData.email}
                                onChangeText={(text) => onChangeHandler("email", text)}
                                label={"Enter Email"}
                                errorMcg={error.email}
                            />

                        </View>
                        <View style={{ gap: 15, alignItems: 'center', marginTop: 20 }}>
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                variant={"fill"}
                                disabled={isLoading}
                                isLoading={isLoading}
                                title={"Continue"}
                                onPress={handleSubmit}

                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

export default ResetPassword

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