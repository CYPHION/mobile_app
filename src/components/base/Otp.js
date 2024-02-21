import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Otp = ({ handleTextChange }) => {
    const [otpValue, setOtpValue] = useState('');
    const inputRefs = useRef(Array(5).fill(null));

    const handleInputChange = (index, txt) => {
        // Update OTP value
        const newValue = otpValue.substring(0, index) + txt + otpValue.substring(index + 1);
        setOtpValue(newValue);

        // Handle navigation and focus based on input and index
        if (txt.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus(); // Move to next field
        } else if (txt.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus(); // Move to previous field
        }
    };

    // const nextRefIndexes = [1, 2, 3, 4, 4];

    useEffect(() => {
        handleTextChange(otpValue);
    }, [otpValue]);

    return (
        <View style={styles.otpContainer}>
            {inputRefs.current.map((_, index) => (
                <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={styles.inputView}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(txt) => handleInputChange(index, txt)}
                    // Handle Backspace key press for proper navigation
                    onKeyDown={({ nativeEvent: { key } }) => {
                        if (key === 'Backspace' && index > 0) {
                            handleInputChange(index, ''); // Clear digit and focus previous field
                        }
                    }}
                />
            ))}
        </View>
    );
};

export default Otp

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 7,
    },
    inputView: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 18,
    },
});
