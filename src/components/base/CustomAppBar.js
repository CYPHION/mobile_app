import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Entypo';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';

// Custom AppBar component used as a header for all screens
const CustomAppBar = ({ back = true, title, color }) => {
    // State to manage active state for back button
    const [active, setActive] = useState(false);
    const navigation = useNavigation(); // Access navigation methods

    // Function to handle navigation go back
    const handleGoBack = () => {
        navigation.goBack(); // Navigate back to previous screen
    };

    // Render the AppBar component
    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Back button */}
            <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', }}>
                {/* Render back button if enabled */}
                {back && (
                    <TouchableOpacity
                        onPressIn={() => setActive(!active)} // Handle press in event
                        onPressOut={() => setActive(!active)} // Handle press out event
                        onPress={handleGoBack} // Handle go back press
                        style={[{ padding: 10, borderRadius: 50 }, active && { backgroundColor: '#ffffff50' }]} // Apply active style if active state is true
                    >
                        {/* Back button icon */}
                        <Icon name="arrowleft" size={22} color={color ? color : Color.text} />
                    </TouchableOpacity>
                )}
                {/* Screen title */}
                <Text style={{ color: Color.text, fontSize: FontSizes.xl, fontFamily: FontFamily.interMedium, paddingLeft: 18 }}>{title}</Text>
            </View>
            {/* Menu button */}
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={[{ padding: 10, borderRadius: 50, marginEnd: 10 }]}>
                {/* Menu icon */}
                <MenuIcon name='menu' size={FontSizes.xxxl} color={color ? color : Color.text} />
            </TouchableOpacity>
        </View>
    );
};

export default CustomAppBar;
