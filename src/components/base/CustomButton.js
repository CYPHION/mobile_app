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
// Custom button component
const CustomButton = (props) => {
    const {
        onPress, // Function to handle button press
        title = "", // Button title, default empty string
        disabled, // Flag to disable button
        variant, // Button variant (e.g., 'fill' or 'outline')
        btnstyle, // Additional button styles
        textStyle, // Additional text styles
        leftIcon,// Icon to be displayed on the left side of the button text
        isLoading, // Flag indicating loading state
        rightIcon // Icon to be displayed on the right side of the button text
    } = props;

    return (
        <TouchableOpacity
            {...props}
            disabled={disabled ? disabled : false}  // Disable button if 'disabled' flag is true
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
