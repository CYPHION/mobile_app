// CustomIcon.js
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Default icon library

const CustomIcon = ({ name, library = 'FontAwesome', size = 30, color = '#000' }) => {
    const IconComponent = Icon; // Default to FontAwesome, can be changed based on the provided library prop

    return (
        <View>
            <IconComponent name={name} size={size} color={color} />
        </View>
    );
};

export default CustomIcon;
