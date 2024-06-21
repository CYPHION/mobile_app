import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast } from '../../utils/functions'

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

const initialData = {
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
}

const GCSEResult = () => {
    const [isLoading, setIsloading] = useState(false)
    const [formData, setFormData] = useState(initialData)

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
        setIsloading(true)
        const payload = {
            studentId: formData.stdId, // Example student ID
            studentName: formData.studentname, // Example student name
            mathGrade: formData.maths, // Example grades
            physicsGrade: formData.physics,
            chemistryGrade: formData.chemistry,
            biologyGrade: formData.biology,
            combinedScienceGrade: formData.combinedscience,
            englishGrade: formData.englishlanguage,
            englishLiterature: formData.englishliterature,
            economicsGrade: formData.economics,
            furtherMathGrade: formData.furthermaths,
            historyGrade: formData.history,
            frenchGrade: formData.french,
            spanishGrade: formData.spanish
        }
        if (!formData.stdId || !formData.studentname) {
            !formData.stdId ? customToast('error', "Please add Student Id") : '';
            !formData.studentname ? customToast('error', "Please add Student Name") : '';
            setIsloading(false)
        } else {
            API.CreateGCSEResult(payload)
                .then(res => customToast('success', res.message))
                .catch(err => console.log(err))
                .finally(() => {
                    setIsloading(false)
                    setFormData(initialData)
                })
        }

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
                        required
                        label={"Student ID"}
                        inputMode={"numeric"}
                        value={formData.stdId}
                        onChangeText={(text) => onChangeHandler('stdId', text)}
                    />
                    <InputField
                        required
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