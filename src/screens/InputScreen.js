import React, { useState } from 'react'
import { View } from 'react-native'
import CustomButton from '../components/base/CustomButton'
import FlaotingTextInput from '../components/base/FlaotingTextInput'
import InputField from '../components/base/InputField'
import { Color } from '../utils/colorPalette'
import { screenDimensions } from '../utils/helperFunctions'
const InputScreen = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        remarks: '',
        remarksTwo: '',
        numeric: '',
        text: '',
        passwordThree: '',
        passwordTwo: '',
    })
    const [error, setError] = useState('')

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
        if (name === 'passwordTwo')
            setError('')
    };

    return (
        <View>
            <FlaotingTextInput
                color={Color.black}
                onChangeText={(text) => onChangeHandler('userName', text)}
                value={formData.userName}
                password={true}
                label={"Password"}
            />
            <FlaotingTextInput
                color={Color.black}
                value={formData.password}
                onChangeText={(text) => onChangeHandler('password', text)}
                type={"User name"}
                label={"username/email"}
            />
            <InputField
                label={"Numaric Input Mode"}
                inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                value={formData.numeric}
                onChangeText={(text) => onChangeHandler('numeric', text)}
            />
            <InputField
                label={"Text"}
                // inputMode={"numeric"} // by default type is text
                value={formData.text}
                onChangeText={(text) => onChangeHandler('text', text)}
            />
            <InputField
                secureTextEntry={true} // if you password Field pass secureTextEntry=true
                value={formData.passwordThree}
                label={"Password"}
                onChangeText={(text) => onChangeHandler('passwordThree', text)}
            />
            <InputField
                secureTextEntry={true} // if you password Field pass secureTextEntry=true
                value={formData.passwordTwo}
                label={"Password"}
                onChangeText={(text) => onChangeHandler('passwordTwo', text)}
                error={error}
            />
            <View>
                <CustomButton title='Show Error' onPress={() => setError('Password is required')} />
            </View>
            <InputField
                required // if you pass required true ,in label (Required will concat) 
                onChangeText={(text) => onChangeHandler('remarks', text)}
                value={formData.remarks}
                label={"Remarks"}
                multiline // if you want to use as a textArea, you can pass multiline=true
                inputStyle={{ // here you can define styles of input field
                    height: screenDimensions.height * 0.2, // its compulsory to give height and textAlignVertical : 'top' when you pass multiline true
                    textAlignVertical: "top",
                }}
                error={"Password is Required"} // is you pass error msg it change its color to red
            />
            <InputField
                multiline
                required
                onChangeText={(text) => onChangeHandler('remarksTwo', text)}
                value={formData.remarksTwo}
                label={"Remarks"}
                inputStyle={{
                    height: screenDimensions.height * 0.2,
                    textAlignVertical: "top",
                }}
            />
        </View>
    )
}

export default InputScreen