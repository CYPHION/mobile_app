// CustomButton.js
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Color } from "../../utils/colorPalette";
import { FontFamily } from "../../utils/fontFamilies";
import { FontSizes } from "../../utils/fontSizes";

const CustomButton = (props) => {
    const {
        onPress,
        title = "",
        disabled,
        variant,
        btnstyle,
        textStyle,
    } = props;

    return (
        <TouchableOpacity
            {...props}
            disabled={disabled ? disabled : false}
            activeOpacity={0.7}
            style={[styles.buttonContainer, variant === 'fill' ? { backgroundColor: Color.primary } : { backgroundColor: Color.white }, { ...btnstyle }]}
            onPress={onPress}
        >
            {disabled ? <ActivityIndicator size="small" color={variant === 'fill' ? Color.white : Color.primary} /> : ""}
            <Text style={[styles.buttonText, variant === 'fill' ? { color: Color.white } : { color: Color.primary }, { ...textStyle }]}>
                {" "}
                {title}
            </Text>
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
        padding: 15,
    },
    buttonText: {
        fontSize: FontSizes.md,
        fontFamily: FontFamily.regular,
    },
});

export default CustomButton;
