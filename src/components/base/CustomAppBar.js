import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import CustomButton from './CustomButton';
// Custom AppBar component used as a header for all screens
const CustomAppBar = ({ back = true, title, color, customNavigation, isLogin }) => {
    const [active, setActive] = useState(false)
    const navigation = useNavigation();
    const user = useSelector(state => state?.user?.data)
    // Function to handle navigation go back
    const handleGoBack = () => {
        navigation.goBack();// Navigate back to previous screen
    };


    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Back button (if you pass back true the back button will appear) */}
            <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', }}>
                {back && <TouchableOpacity onPressIn={() => setActive(!active)} onPressOut={() => setActive(!active)} onPress={customNavigation ? customNavigation : handleGoBack} style={[{ padding: 10, borderRadius: 50 }, active && { backgroundColor: '#ffffff50' }]}>
                    <Icon name="arrowleft" size={22} color={color ? color : Color.text} />
                </TouchableOpacity>}
                <Text style={{ color: Color.text, fontSize: FontSizes.xl, fontFamily: FontFamily.interMedium, paddingLeft: 18 }}>{title}</Text>
            </View>
            {/* Menu button to open drawer */}
            <View style={{ flexDirection: 'row' }}>

                {(isLogin && !(!!user?.email)) && < CustomButton
                    title="Login"
                    variant="fill"
                    btnstyle={{
                        paddingVertical: 0
                    }}
                    onPress={() => {
                        navigation.navigate('login')
                    }}
                // leftIcon={<Icon name="login" color={Color.text} size={24} />}
                />}
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={[{ padding: 10, borderRadius: 50, marginEnd: 10 }]}>
                    <MenuIcon name='menu' size={FontSizes.xxxl} color={color ? color : Color.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomAppBar