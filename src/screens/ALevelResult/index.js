import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const grades = [
    { name: "A+", value: 'a+' },
    { name: "A", value: 'a' },
    { name: "B", value: 'b' },
    { name: "C", value: 'c' },
    { name: "D", value: 'd' },
    { name: "E", value: 'e' },
    { name: "U", value: 'u' },
]



const ALevel = () => {
    const [formData, setFormData] = useState({
        stdId: '',
        studentname: '',
        maths: '',
        physics: '',
        chemistry: '',
        biology: '',
        economics: '',
        furthermaths: '',
        englishlanguage: '',
        englishliterature: '',
    })

    const subjects = [
        { name: 'Maths', value: 'maths' },
        { name: 'Physics', value: 'physics' },
        { name: 'Chemistry', value: 'chemistry' },
        { name: 'Biology', value: 'biology' },
        { name: 'Economics', value: 'economics' },
        { name: 'Further Maths', value: 'furthermaths' },
        { name: 'English Language', value: 'englishlanguage' },
        { name: 'English Literature', value: 'englishliterature' },
    ]

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };


    const handleSubmit = () => {
        console.log(formData)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>

                    <Text style={[styles.name, { marginBottom: 5 }]}>
                        Good Luck to everyone{'\n'}receiving their A-Level{'\n'}Results
                    </Text>
                    <Text style={[styles.name, { color: Color.text, marginTop: 5 }]}>
                        Please fill the form below and{'\n'}share your relevant your subjects’{'\n'}results.
                    </Text>
                    <Text style={[styles.name, { marginBottom: 5 }]}>
                        A-Level Result
                    </Text>

                    <InputField
                        label={"Student ID"}
                        inputMode={"text"}
                        value={formData.stdId}
                        onChangeText={(text) => onChangeHandler('stdId', text)}
                    />
                    <InputField
                        label={"Student Name"}
                        inputMode={"text"}
                        value={formData.studentname}
                        onChangeText={(text) => onChangeHandler('studentname', text)}
                    />
                    <Text style={[styles.name, { marginBottom: 5, color: Color.text, textAlign: 'left' }]}>
                        Subjects:
                    </Text>
                    {subjects.map((elem, index) => (
                        <DropdownComponent
                            key={index}
                            label={elem.name}
                            disable={false}
                            data={grades}
                            placeHolderText={"Select"}
                            value={formData[elem.value]}
                            setValue={(text) => onChangeHandler(elem.value, text)}
                        />
                    ))}
                    <CustomButton
                        variant={'fill'}
                        title={"Submit"}
                        onPress={() => handleSubmit()}
                        btnstyle={{ width: 120 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ALevel

const styles = StyleSheet.create({

    name: {
        fontSize: FontSizes.xl,
        color: Color.primary,
        marginVertical: 25,
        fontFamily: FontFamily.bold,
        textAlign: 'center'
    },
    content: {
        padding: 20,
        fontFamily: FontFamily.medium,
        fontSize: FontSizes.md,
        color: Color.text
    },

})