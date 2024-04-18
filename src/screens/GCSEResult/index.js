import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'

const grades = [
    { name: "2", value: '2' },
    { name: "3", value: '3' },
    { name: "4", value: '4' },
    { name: "5", value: '5' },
    { name: "6", value: '6' },
    { name: "7", value: '7' },
    { name: "8", value: '8' },
    { name: "9", value: '9' },
]



const GCSEResult = () => {
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
        history: '',
        french: '',
        spanish: '',
        combinedscience: '',
    })

    const subjects = [
        { name: 'Maths', value: 'maths' },
        { name: 'Physics', value: 'physics' },
        { name: 'Chemistry', value: 'chemistry' },
        { name: 'Biology', value: 'biology' },
        { name: 'Combined Science', value: 'combinedscience' },
        { name: 'English Language', value: 'englishlanguage' },
        { name: 'English Literature', value: 'englishliterature' },
        { name: 'Economics', value: 'economics' },
        { name: 'Further Maths', value: 'furthermaths' },
        { name: 'History', value: 'history' },
        { name: 'French', value: 'french' },
        { name: 'Spanish', value: 'spanish' },
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
                        Good Luck to everyone{'\n'}receiving their GCSE{'\n'}Results
                    </Text>
                    <Text style={[styles.name, { color: Color.text, marginTop: 5 }]}>
                        To all of our GCSE Students, Please{'\n'}fill the form below to share your’{'\n'}GCSE results. Thanks!.
                    </Text>
                    <Text style={[styles.name, { marginBottom: 5 }]}>
                        GCSE Result
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

export default GCSEResult

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