import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../utils/colorPalette';
import { FontSizes } from '../../utils/fontSizes';

const FloatingTextInput = ({ label, password, inputMode, value, onChangeText, color = Color.white, editable }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(password);
    const animatedValue = useRef(new Animated.Value(0));

    const returnAnimatedTitleStyles = {
        transform: [
            {
                translateY: animatedValue?.current?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [22, -4],
                    extrapolate: 'clamp',
                }),
            },
        ],
        fontSize: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [FontSizes.md, FontSizes.sm],
            extrapolate: 'clamp',
        }),
        color: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [color, color],
        }),
    };

    const viewStyles = {
        borderBottomColor: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [color, color],
        }),
        borderBottomWidth: 0.8,
    };

    const onFocus = () => {
        Animated.timing(animatedValue?.current, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    };

    const onBlur = () => {
        if (!value) {
            Animated.timing(animatedValue?.current, {
                toValue: 0,
                duration: 500,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.mainView}>
            <Animated.View style={[styles.subContainer, viewStyles, styles.mainView]}>
                <Animated.Text style={[returnAnimatedTitleStyles]}>{label}</Animated.Text>
                <TextInput
                    editable={editable}
                    inputMode={inputMode ? inputMode : 'text'}
                    onChangeText={onChangeText}
                    secureTextEntry={isPasswordVisible}
                    value={value ? value : ''}
                    style={[styles.textStyle, { color: color }]}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                {password ? <TouchableOpacity style={styles.iconView} onPress={togglePasswordVisibility}>
                    <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} color={color} size={18} />
                </TouchableOpacity> : ''}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        paddingTop: 15,
        marginHorizontal: 24,
    },
    textStyle: {
        paddingBottom: 10,
        paddingRight: 35,
        fontSize: FontSizes.md,
    },
    iconView: {
        padding: 5,
        position: 'absolute',
        right: 5,
        top: '60%',
    },
    mainView: {
        position: 'relative',
    },
});

export default FloatingTextInput;
