import React, { useRef, useState } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Color } from "../../utils/color";
import { FontSizes } from "../../utils/font";

const FloatingTextInput = (props) => {
    const {
        label = '',
        password,
        inputMode,
        value = '',
        onChangeText,
        // color,
        editable,
        errorMcg
    } = props;
    const [isPasswordVisible, setPasswordVisible] = useState(password);
    const animatedValue = useRef(new Animated.Value(0));

    const color = errorMcg ? Color.error : Color.white

    const returnAnimatedTitleStyles = {
        transform: [
            {
                translateY: animatedValue?.current?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [22, -4],
                    extrapolate: "clamp",
                }),
            },
        ],
        fontSize: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [FontSizes.lg, FontSizes.md],
            extrapolate: "clamp",
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
        borderBottomWidth: 1,
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
                <Animated.Text style={[returnAnimatedTitleStyles]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    editable={editable}
                    inputMode={inputMode ? inputMode : "text"}
                    onChangeText={onChangeText}
                    secureTextEntry={isPasswordVisible}
                    value={value ? value : ""}
                    style={[styles.textStyle, { color: color }]}
                    onBlur={onBlur}
                    onFocus={onFocus}

                />
                {password ? (
                    <TouchableOpacity
                        style={styles.iconView}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={isPasswordVisible ? "eye-off" : "eye"}
                            color={color}
                            size={18}
                        />
                    </TouchableOpacity>
                ) : (
                    ""
                )}
            </Animated.View>
            {errorMcg ? <Text style={{ color: Color.error, marginTop: 5 }}>{errorMcg}</Text> : ''}
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        paddingTop: 10,
        marginHorizontal: 5,
    },
    textStyle: {
        paddingBottom: 10,
        paddingRight: 35,
        fontSize: FontSizes.md,
    },
    iconView: {
        padding: 5,
        position: "absolute",
        right: 5,
        top: "60%",
    },
    mainView: {
        position: "relative",
    },
});

export default FloatingTextInput;
