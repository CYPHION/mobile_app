import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../utils/colorPalette';
import { FontSizes } from '../../utils/fontSizes';
import { screenDimensions } from '../../utils/helperFunctions';


const { fontScale } = screenDimensions
export default function InputField({ label = '', labelStyle, inputStyle, inputMode, value = '', onChangeText, secureTextEntry, multiline, editable, error, required }) {
    const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
    const [isFocus, setIsFocus] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text
                style={[styles.label, { ...labelStyle }]}
            >
                {`${label} ${required ? '(Rquired)' : ''}`}
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
                    onFocus={() => setIsFocus(!isFocus)}
                    onBlur={() => setIsFocus(!isFocus)}
                    style={[
                        styles.inputField,
                        error ? { borderColor: Color.error } : ((isFocus || value) ? { borderColor: Color.primary } : { borderColor: Color.borderColor }),
                        { ...inputStyle }
                    ]}
                />
                {secureTextEntry ?
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            color={Color.black} size={18}
                        />
                    </TouchableOpacity> : ''}
            </View>
            {error && <Text
                style={[styles.error]}
            >
                {error}
            </Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        // gap: 10,
    },
    inputField: {
        marginTop: 10,
        color: Color.text,
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
        height: fontScale * 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 0,
        padding: 5,
        borderRadius: 4,
    },
    error: {
        marginTop: 4,
        color: Color.error
    }
});