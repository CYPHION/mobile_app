import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';

const CustomAppBar = ({ title, color }) => {
    const [active, setActive] = useState(false)
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };


    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', }}>
            <TouchableOpacity onPressIn={() => setActive(!active)} onPressOut={() => setActive(!active)} onPress={handleGoBack} style={[{ padding: 10, borderRadius: 50 }, active && { backgroundColor: '#ffffff50' }]}>
                <Icon name="arrowleft" size={22} color={color ? color : Color.black} />
            </TouchableOpacity>
            <Text style={{ color: Color.black, fontSize: FontSizes.xl, fontFamily: FontFamily.interMedium, paddingLeft: 18 }}>{title}</Text>
        </View>
    );
};

export default CustomAppBar