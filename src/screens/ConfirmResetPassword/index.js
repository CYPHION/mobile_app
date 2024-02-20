import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CustomAppBar from '../../components/base/CustomAppBar'
import CustomButton from '../../components/base/CustomButton'
import FlaotingTextInput from '../../components/base/FlaotingTextInput'
import { handleLogin } from '../../store/slice/user'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { removeError, screenDimensions } from '../../utils/functions'


const ConfirmResetPassword = (prop) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        code: ''
    })

    const [isLoading, setIsLoading] = useState(false)

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

    const handleSubmit = () => {
        // setIsLoading(true)

    };


    return (
        <SafeAreaView>
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
                                inputMode={'numeric'}
                                onChangeText={(text) => onChangeHandler("email", text)}
                                label={"Enter Code"}
                                errorMcg={error.email}
                            />
                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.password}
                                onChangeText={(text) => onChangeHandler("password", text)}
                                label={"New Password"}
                            />

                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.password}
                                onChangeText={(text) => onChangeHandler("password", text)}
                                label={"Confirm Password"}
                            />


                        </View>
                        <View style={{ gap: 15, alignItems: 'center', marginTop: 20 }}>
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                variant={"fill"}
                                // disabled={isLoading}
                                title={"Reset Password"}
                                onPress={() => handleSubmit()}
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