// CustomButton.js
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '../../utils/colorPalette';
import { FontFamily } from '../../utils/fontFamilies';

const CustomButton = ({ onPress, title, disabled, variant, width, padding }) => {
    return (
        <TouchableOpacity disabled={disabled ? disabled : false} activeOpacity={10} style={[styles.buttonContainer, { backgroundColor: variant === 'filled' ? Color.primary : Color.white, width: width ? width : 'full', padding: padding ? padding : 15 }]} onPress={onPress}>
            {disabled ? <ActivityIndicator size="small" color={variant === 'filled' ? Color.white : Color.primary} /> : ''}
            <Text style={[styles.buttonText, { color: variant === 'filled' ? Color.white : Color.primary }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderRadius: 4,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: FontFamily.regular
    },
});

export default CustomButton;
