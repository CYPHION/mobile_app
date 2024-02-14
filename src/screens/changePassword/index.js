import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'

const ChangePasswordScreen = () => {
    const [formData, setFormData] = useState({
        newPass: '',
        confPass: ''
    })


    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
    };

    return (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
            <View style={{ paddingVertical: 15, paddingHorizontal: 10, gap: 20 }}>
                <View style={{ gap: 10 }}>
                    <InputField
                        secureTextEntry={true} // if you password Field pass secureTextEntry=true
                        value={formData.newPass}
                        label={"New Password"}
                        onChangeText={(text) => onChangeHandler('newPass', text)}
                    />
                    <InputField
                        secureTextEntry={true} // if you password Field pass secureTextEntry=true
                        value={formData.confPass}
                        label={"Confirm Password"}
                        onChangeText={(text) => onChangeHandler('confPass', text)}
                    />
                </View>
                <CustomButton
                    title='Confirm'
                    variant='fill'
                />
            </View>
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})