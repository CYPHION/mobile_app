// CustomButton.js
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '../../utils/colorPalette';
import { FontFamily } from '../../utils/fontFamilies';
import { FontSizes } from '../../utils/fontSizes';

const CustomButton = ({ onPress, title = '', disabled, color = Color.white, btnstyle, textStyle }) => {
    return (
        <TouchableOpacity disabled={disabled ? disabled : false} activeOpacity={0.7} style={[styles.buttonContainer, { ...btnstyle }]} onPress={onPress} >
            {disabled ? <ActivityIndicator size="small" color={color} /> : ''}
            < Text style={[styles.buttonText, { color }, { ...textStyle }]} > {title}</Text >
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        activeOpacity: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderRadius: 4,
        margin: 5,
        padding: 15,
        backgroundColor: Color.primary
    },
    buttonText: {
        fontSize: FontSizes.md,
        fontFamily: FontFamily.regular
    },
});

export default CustomButton;
