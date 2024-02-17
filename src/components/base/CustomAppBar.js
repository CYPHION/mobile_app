import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';

const CustomAppBar = ({ title }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', }}>
            <TouchableOpacity onPress={handleGoBack} style={{ paddingHorizontal: 15 }}>
                <Icon name="arrowleft" size={22} color={Color.black} />
            </TouchableOpacity>
            <Text style={{ color: Color.black, fontSize: FontSizes.xl, fontFamily: FontFamily.interMedium, paddingLeft: 18 }}>{title}</Text>
        </View>
    );
};

export default CustomAppBar