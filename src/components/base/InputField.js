import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontSizes } from '../../utils/fontSizes';
import { screenDimensions } from '../../utils/helperFunctions';


const { fontScale } = screenDimensions
export default function InputField({ label = '', labelStyle, inputStyle, inputMode, value = '', onChangeText, secureTextEntry, multiline, editable }) {
    const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    return (
        <View style={styles.container}>
            <Text
                style={[styles.label, { ...labelStyle }]}
            >
                {label}
            </Text>
            <View
                style={styles.iconView}
            >
                <TextInput
                    editable={editable}
                    secureTextEntry={isPasswordVisible}
                    multiline={multiline}
                    value={value}
                    onChangeText={onChangeText}
                    inputMode={inputMode}
                    style={[styles.inputField, { ...inputStyle }]}
                />
                {secureTextEntry ?
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            color={'white'} size={18}
                        />
                    </TouchableOpacity> : ''}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        gap: 10,
    },
    inputField: {
        height: fontScale * 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: fontScale * 8,
        paddingHorizontal: fontScale * 15,
        fontSize: FontSizes.md,
        lineHeight: fontScale * 20,
    },
    label: {
        fontSize: FontSizes.md,
        color: 'white',
    },
    iconView: {
        position: 'relative',
    },
    icon: {
        justifyContent: 'center',
        height: '100%',
        position: 'absolute',
        right: 10,
        padding: 5,
        borderRadius: 4,
    },
});