import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import PTWhite from '../../components/SVGS/PT-Logo-White';
import CustomButton from '../../components/base/CustomButton';
import FlaotingTextInput from '../../components/base/FlaotingTextInput';
import { API } from '../../network/API';
import { handleLogin } from '../../store/slice/user';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { removeError, screenDimensions } from '../../utils/functions';

const LoginScreen = prop => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState({
        // username: '',
        // password: '',
    });

    const dispatch = useDispatch();

    const saveDataToredux = data => {
        // Function to dispatch action to save login data to Redux store
        dispatch(handleLogin(data));
        setFormData({
            email: '',
            password: '',
        });
        navigation.navigate('tabs', { screen: 'home' });
    };

    const onChangeHandler = (name, text) => {
        // Handler function to update form data when input changes
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text,
        }));

        setError(removeError(name, error)); // Remove any previous error related to the input
    };

    const handleSubmit = () => {
        // Handler function for form submission
        setIsLoading(true); // Set loading state to true
        const { email, password } = formData; // Destructure email and password from form data

        // Call the login API with email and password

        API.login(email.toLowerCase(), password)
            .then(res => saveDataToredux(res?.data)) // Dispatch action to save login data on successful login
            .catch(err => console.log('errrr', err)) // Log any errors during login
            .finally(() => setIsLoading(false)); // Set loading state to false after login attempt completes
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={[styles.picture]}
                        resizeMode="cover"
                        source={require('../../images/Image-17.png')}
                    />
                    <View style={[styles.absoluteImage, styles.picture]} />
                    <View style={[styles.logoView]}>
                        {/* <View style={{ width: screenDimensions.width, position: 'absolute', top: 0 }}>
                            <CustomAppBar customNavigation={() => navigation.navigate('aboutus')} color={Color.white} />
                        </View> */}
                        {/* <Image
                            resizeMode="contain"
                            style={[styles.logo]}
                            source={require("../../components/SVGS/PT-Logo-White.js")}
                        /> */}
                        <PTWhite />
                        <View>
                            <Text
                                style={[
                                    styles.textStyle,
                                    { fontFamily: FontFamily.interRegular },
                                ]}>
                                Welcome To
                            </Text>
                            <Text
                                style={[
                                    styles.textStyle,
                                    {
                                        fontFamily: FontFamily.interBold,
                                        textTransform: 'uppercase',
                                    },
                                ]}>
                                Prime Tuition
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            {
                                gap: 10,
                                height: screenDimensions.height * 0.65,
                                width: screenDimensions.width * 0.9,
                            },
                        ]}>
                        <Text
                            style={{
                                marginTop: 20,
                                color: Color.white,
                                fontFamily: FontFamily.interRegular,
                                fontSize: FontSizes.xl,
                            }}>
                            Login
                        </Text>
                        <View
                            style={{
                                gap: 10,
                            }}>
                            <FlaotingTextInput
                                value={formData.email}
                                inputMode={'email'}
                                onChangeText={text => onChangeHandler('email', text)}
                                label={'Email'}
                                errorMcg={error.email}
                            />
                            <FlaotingTextInput
                                errorMcg={error.password}
                                password={true}
                                value={formData.password}
                                onChangeText={text => onChangeHandler('password', text)}
                                label={'Password'}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('forgetPassword')}>
                                <Text
                                    style={{
                                        color: Color.white,
                                        width: screenDimensions.width * 0.9,
                                        fontFamily: FontFamily.interRegular,
                                        fontSize: FontSizes.md,
                                        textAlign: 'right',
                                    }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ gap: 15, alignItems: 'center' }}>
                            <CustomButton
                                btnstyle={{ width: screenDimensions.width * 0.8 }}
                                variant={'fill'}
                                disabled={isLoading}
                                title={'Login'}
                                onPress={() => handleSubmit()}
                                isLoading={isLoading}
                            />
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                            }}>
                            <Text
                                onPress={() => {
                                    navigation.navigate('aboutus');
                                }}
                                style={{
                                    color: Color.white,
                                    width: screenDimensions.width * 0.35,
                                    fontFamily: FontFamily.interRegular,
                                    paddingVertical: 5,
                                    fontSize: FontSizes.md,
                                    textAlign: 'center',
                                    textDecorationLine: 'underline',
                                }}>
                                Back to Home
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    picture: {
        position: 'absolute',
        height: screenDimensions.height,
        width: screenDimensions.width,
    },
    absoluteImage: {
        top: 0,
        // zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    logo: {
        width: screenDimensions.width * 0.4,
    },
    logoView: {
        gap: 15,
        width: screenDimensions.width,
        height: screenDimensions.height * 0.35,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: FontSizes.xxl,
        color: Color.white,
        textAlign: 'center',
    },
});
