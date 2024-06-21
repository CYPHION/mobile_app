import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';

const RadioButton = ({ options, onToggle }) => {
    const [radioSelected, setRadioSelected] = useState(options[0].value);
    const radioClick = (value) => {
        setRadioSelected(value);
        onToggle(value); // Trigger the onChange callback with the selected id
    };

    return (
        <View style={{ flexDirection: 'row', gap: 15, marginVertical: 10 }}>
            {options.map((val, ind) => (
                <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', gap: 5 }} key={ind} onPress={() => radioClick(val?.value)}>
                    <View style={[styles.container, val?.value === radioSelected && { borderColor: Color.primary }]}>
                        {
                            val?.value === radioSelected ?
                                <View style={styles.radio} />
                                : null
                        }
                    </View>
                    <Text style={styles.label}>{val?.name}</Text>
                </TouchableOpacity>
            )
            )}
        </View>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    container: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Color.text,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Color.primary,
    },
    label: {
        color: Color.text,
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.lg
    }
})
