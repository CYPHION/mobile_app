import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const Otp = ({ handleTextChange }) => {
    let otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    return (
        <View style={styles.otpContainer}>
            {/* <OTPTextView
                keyboardType='numeric'
                ref={e => (otpInput = e)}
                inputCount={5}
                autoFocus={true}
                textInputStyle={styles.otpBox}
                handleTextChange={(text) => handleTextChange(text)}
                tintColor={Color.primary}
            /> */}
        </View>
    );
};

export default Otp;

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otpBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 18,
    },
});
