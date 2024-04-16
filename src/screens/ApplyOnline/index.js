import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'


const StudentInputForm = ({ index, formData, onChangeHandler, years, courses, onDelete }) => {
    const handleYearChange = (value) => {
        onChangeHandler(index, 'year', value);
    };

    const handleCourseChange = (value) => {
        onChangeHandler(index, 'course', value);
    };
    return (
        <View style={[{ marginBottom: 20, borderBottomColor: Color.text }, { borderBottomWidth: 1 }]}>
            {index > 0 && <CustomButton
                variant={'fill'}
                title={"Delete"}
                onPress={() => onDelete(index)}
                btnstyle={{ width: 80, alignSelf: 'flex-end' }}
            />}
            <InputField
                label={"First Name"}
                inputMode={"text"}
                value={formData.firstname}
                onChangeText={(text) => onChangeHandler(index, 'firstname', text)}
            />
            <InputField
                label={"Last Name"}
                inputMode={"text"}
                value={formData.lastname}
                onChangeText={(text) => onChangeHandler(index, 'lastname', text)}
            />
            <DropdownComponent
                label={'Year in School'}
                disable={false}
                data={years}
                placeHolderText={"Year"}
                value={formData.year}
                setValue={handleYearChange}
            />
            <InputField
                label={"Subject"}
                inputMode={"text"}
                value={formData.subject}
                onChangeText={(text) => onChangeHandler(index, 'subject', text)}
            />
            <DropdownComponent
                label={'Select Course'}
                disable={false}
                data={courses}
                placeHolderText={"Course"}
                value={formData.course}
                setValue={handleCourseChange}
            />

        </View>
    );
};




const ApplyOnline = () => {
    const [students, setStudents] = useState([
        {
            firstname: '',
            lastname: '',
            subject: '',
            year: '',
            course: ''
        }
    ]);
    const [formData, setFormData] = useState({

        parentname: '',
        email: "",
        parentrelation: '',
        mobilenumber: '',
        doornumber: '',
        street: '',
        area: '',
        postcode: '',
        campus: ''
    })


    const data = [
        { name: "BRIXTON", value: "1" },
        { name: "HOUNSLOW", value: "2" },
        { name: "WOOLWICH", value: "3" },
        { name: "FINSBURY", value: "4" },

    ];

    const courses = [
        { value: 1, name: '11+' },
        { value: 2, name: 'Summer School' },
        { value: 3, name: 'GCSE' },
        { value: 4, name: 'A Level' },
        { value: 5, name: 'KS1 Tuition' },
        { value: 6, name: 'KS2 Tuition' },
        { value: 7, name: 'KS3 Tuition' }
    ]

    const years = [
        { name: 'Reception', value: 1 },
        { name: "Year 1", value: 2 },
        { name: "Year 2", value: 3 },
        { name: "Year 3", value: 4 },
        { name: "Year 4", value: 5 },
        { name: "Year 5", value: 6 },
        { name: "Year 6", value: 7 },
        { name: "Year 7", value: 8 },
        { name: "Year 8", value: 9 },
        { name: "Year 9", value: 10 },
        { name: "Year 10", value: 11 },
        { name: "Year 11", value: 12 },
        { name: "Year 12", value: 13 },
        { name: "Year 13", value: 14 },
    ]

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const addMoreStudent = () => {
        setStudents([...students, {
            firstname: '',
            lastname: '',
            subject: '',
            year: '',
            course: ''
        }]);
    };
    const onChangeStdHandler = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
    };
    const deleteStudent = (index) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
    };

    const handlesubmit = () => {
        console.log(formData, students)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text style={[styles.name, { fontFamily: FontFamily.bold }]}>Select Campus</Text>
                    <DropdownComponent
                        label={'Select Capmus'}
                        disable={false}
                        data={data}
                        placeHolderText={"Campus"}
                        value={formData.campus}
                        setValue={(text) => onChangeHandler('campus', text)}
                    />
                    <Text style={[styles.name, { fontFamily: FontFamily.bold }]}>Student Details</Text>
                    {students.map((student, index) => (
                        <StudentInputForm
                            key={index}
                            index={index}
                            formData={student}
                            onChangeHandler={onChangeStdHandler}
                            years={years}
                            courses={courses}
                            onDelete={deleteStudent}
                        />
                    ))}
                    <CustomButton
                        variant={'fill'}
                        title={"+ ADD MORE CHILD"}
                        onPress={addMoreStudent}
                    />
                    <Text style={[styles.name, { fontFamily: FontFamily.bold }]}>Parent/Guardian Details</Text>
                    <InputField
                        label={"Parent/Guardian Name"}
                        inputMode={"text"}
                        value={formData.parentname}
                        onChangeText={(text) => onChangeHandler('parentname', text)}
                    />
                    <InputField
                        label={"Email"}
                        inputMode={"email"}
                        value={formData.email}
                        onChangeText={(text) => onChangeHandler('email', text)}
                    />
                    <InputField
                        label={"Parent/Guardian Relation"}
                        inputMode={"text"}
                        value={formData.parentrelation}
                        onChangeText={(text) => onChangeHandler('parentrelation', text)}
                    />
                    <InputField
                        label={"Mobile Number"}
                        inputMode={"numeric"}
                        value={formData.mobilenumber}
                        onChangeText={(text) => onChangeHandler('mobilenumber', text)}
                    />
                    <InputField
                        label={"Door Number"}
                        inputMode={"text"}
                        value={formData.doornumber}
                        onChangeText={(text) => onChangeHandler('doornumber', text)}
                    />
                    <InputField
                        label={"Street"}
                        inputMode={"text"}
                        value={formData.street}
                        onChangeText={(text) => onChangeHandler('street', text)}
                    />
                    <InputField
                        label={"Area/Guarded"}
                        inputMode={"text"}
                        value={formData.area}
                        onChangeText={(text) => onChangeHandler('area', text)}
                    />
                    <InputField
                        label={"Post code"}
                        inputMode={"text"}
                        value={formData.postcode}
                        onChangeText={(text) => onChangeHandler('postcode', text)}
                    />
                    <CustomButton
                        variant={'fill'}
                        title={"APPLY"}
                        onPress={handlesubmit}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ApplyOnline

const styles = StyleSheet.create({
    name: {
        fontSize: FontSizes.xl,
        color: Color.text,
        marginVertical: 25
    },
})