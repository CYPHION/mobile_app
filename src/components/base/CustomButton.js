// CustomButton.js
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Color } from "../../utils/color";
import { FontFamily, FontSizes } from "../../utils/font";
import { GlobalStyles } from "../../utils/globalStyles";

const CustomButton = (props) => {
    const {
        onPress,
        title = "",
        disabled,
        variant,
        btnstyle,
        textStyle,
        leftIcon,
        isLoading,
        rightIcon
    } = props;

    return (
        <TouchableOpacity
            {...props}
            disabled={disabled ? disabled : false}
            activeOpacity={0.7}
            style={[styles.buttonContainer, GlobalStyles.p_10, variant === 'fill' ? { backgroundColor: disabled ? Color.primaryLight : Color.primary } : { backgroundColor: Color.white }, { ...btnstyle }]}
            onPress={onPress}
        >
            {isLoading ? <ActivityIndicator size="small" color={variant === 'fill' ? Color.white : Color.primary} /> : ""}
            {leftIcon}
            <Text style={[styles.buttonText, variant === 'fill' ? { color: Color.white } : { color: Color.primary }, { ...textStyle }]}>
                {" "}
                {title}
            </Text>
            {rightIcon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        activeOpacity: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderRadius: 4,
        margin: 5,
    },
    buttonText: {
        fontSize: FontSizes.md,
        fontFamily: FontFamily.regular,
    },
});

export default CustomButton;
