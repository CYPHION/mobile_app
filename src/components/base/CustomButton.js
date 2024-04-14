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
    // Destructuring props to access necessary variables and functions
    const {
        onPress,         // Function to handle button press
        title = "",      // Button title, default empty string
        disabled,        // Flag to disable button
        variant,         // Button variant (e.g., 'fill' or 'outline')
        btnstyle,        // Additional button styles
        textStyle,       // Additional text styles
        leftIcon,        // Icon to be displayed on the left side of the button text
        isLoading,       // Flag indicating loading state
        rightIcon        // Icon to be displayed on the right side of the button text
    } = props;

    // Render the button component
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled ? disabled : false}    // Disable button if 'disabled' flag is true
            activeOpacity={0.7}                       // Set opacity on press
            style={[styles.buttonContainer, GlobalStyles.p_10, variant === 'fill' ? { backgroundColor: disabled ? Color.primaryLight : Color.primary } : { backgroundColor: Color.white }, { ...btnstyle }]} // Button styles based on variant and additional styles
            onPress={onPress}                         // Handle press event
        >
            {isLoading ? <ActivityIndicator size="small" color={variant === 'fill' ? Color.white : Color.primary} /> : ""}  // Display loading indicator if isLoading flag is true
            {leftIcon}                                  // Display left icon if provided
            <Text style={[styles.buttonText, variant === 'fill' ? { color: Color.white } : { color: Color.primary }, { ...textStyle }]}>
                {" "}
                {title}                                 // Button title
            </Text>
            {rightIcon}                                 // Display right icon if provided
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
