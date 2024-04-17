
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import DatePickerSingle from '../../components/base/DatePicker'
import InputField from '../../components/base/InputField'
import RadioButton from '../../components/base/RadioButton'
import { countries } from '../../utils/Constants'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'

const genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' }
];

const educationLevels = [
    { name: "A-level or equivalent", value: "ALevelOrEquivalent" },
    { name: "BA with QTS", value: "BAWithQTS" },
    { name: "BSc with QTS", value: "BScWithQTS" },
    { name: "Degree", value: "Degree" },
    { name: "GCSE or equivalent", value: "GCSEOrEquivalent" },
    { name: "Graduate", value: "Graduate" },
    { name: "Post Graduate", value: "PostGraduate" },
    { name: "Phd", value: "Phd" },
    { name: "MA", value: "MA" },
    { name: "Mbbs", value: "Mbbs" },
    { name: "MSc", value: "MSc" },
    { name: "Overseas QTS (OTT)", value: "OverseasQTSOTT" },
    { name: "PGDE (Further Education)", value: "PGDEFurtherEducation" },
    { name: "Other", value: "Other" },
];

const agegroup = [
    { name: 'Higher Education', value: 'higherEdu' },
    { name: 'A-Level (Year 12 & Year 13)', value: 'alevel' },
    { name: 'GCSE (Year 10 & Year 11)', value: 'gcse' },
    { name: 'KS3 (Year 7 to & Year 9)', value: 'ks3' },
    { name: 'KS2 (Year 3 to & Year 6)', value: 'ks2' },
    { name: 'KS1 (Year 1 & Year 2)', value: 'ks1' },
    { name: 'Other', value: 'other' },
]

const candidateType = [
    { value: "UKTrainedTeacher", name: "UK Trained Teacher" },
    { value: "NewlyQualifiedTeacher", name: "Newly Qualified Teacher" },
    { value: "OverseasTrainedTeacher", name: "Overseas Trained Teacher" },
    { value: "FinalYearStudent", name: "Final Year Student" },
    { value: "TeachingAssistant", name: "Teaching Assistant" },
    { value: "NurseryNurse", name: "Nursery Nurse" },
    { value: "FurtherEducation Teacher", name: "Further Education Teacher" },
    { value: "Instructor", name: "Instructor" },
    { value: "CoverSupervisor", name: "Cover Supervisor" },
    { value: "Student", name: "Student" },
    { value: "Other", name: "Other" }
];


const data = [
    { name: "BRIXTON", value: "1" },
    { name: "HOUNSLOW", value: "2" },
    { name: "WOOLWICH", value: "3" },
    { name: "FINSBURY", value: "4" },

];

const radios = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },

];


const JobApply = () => {
    const [selectedValues, setSelectedValues] = useState([])
    const [openDOB, setOpenDOB] = useState(false)
    const [openRef1StartDate, setOpenRef1StartDate] = useState(false)
    const [openRef1EndDate, setOpenRef1EndDate] = useState(false)
    const [openRef2EndDate, setOpenRef2EndDate] = useState(false)
    const [openRef2StartDate, setOpenRef2StartDate] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: '',
        gender: '',
        email: "",
        phone: '',
        address: '',
        town: '',
        postcode: '',
        country: '',
        qaulification: '',
        dob: '',
        specialism: [],
        agegroup: '',
        candidatetype: '',
        location: '',
        ref1refreename: '',
        ref1institute: '',
        ref1employeremail: '',
        ref1jobtitle: '',
        ref1startdate: '',
        ref1enddate: '',
        ref2refreename: '',
        ref2institute: '',
        ref2employeremail: '',
        ref2jobtitle: '',
        ref2startdate: '',
        ref2enddate: '',
        isEmployed: '',
        profilepic: '',
        resume: '',
        comment: ''
    })
    const router = useRoute()
    console.log(Number(router.params?.id))

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
                <DatePickerSingle
                    isVisible={openDOB}
                    onToggle={() => setOpenDOB(false)}
                    onDone={(date) => onChangeHandler('dob', date)}
                />
                <DatePickerSingle
                    isVisible={openRef1StartDate}
                    onToggle={() => setOpenRef1StartDate(false)}
                    onDone={(date) => onChangeHandler('ref1startdate', date)}
                />
                <DatePickerSingle
                    isVisible={openRef1EndDate}
                    onToggle={() => setOpenRef1EndDate(false)}
                    onDone={(date) => onChangeHandler('ref1enddate', date)}
                />
                <DatePickerSingle
                    isVisible={openRef2EndDate}
                    onToggle={() => setOpenRef2EndDate(false)}
                    onDone={(date) => onChangeHandler('ref2enddate', date)}
                />
                <DatePickerSingle
                    isVisible={openRef2StartDate}
                    onToggle={() => setOpenRef2StartDate(false)}
                    onDone={(date) => onChangeHandler('ref2startdate', date)}
                />
                <View style={{ padding: 20 }}>
                    <Text style={styles.title}>Job Title: English Tutor</Text>
                    <InputField
                        label={"First Name"}
                        inputMode={"text"}
                        value={formData.firstname}
                        onChangeText={(text) => onChangeHandler('firstname', text)}
                    />
                    <InputField
                        label={"Last Name"}
                        inputMode={"text"}
                        value={formData.lastname}
                        onChangeText={(text) => onChangeHandler('lastname', text)}
                    />
                    <DropdownComponent
                        label={'Gender'}
                        disable={false}
                        data={genders}
                        placeHolderText={""}
                        value={formData.gender}
                        setValue={(text) => onChangeHandler('gender', text)}
                    />
                    <InputField
                        label={"Email"}
                        inputMode={"email"}
                        value={formData.email}
                        onChangeText={(text) => onChangeHandler('email', text)}
                    />
                    <InputField
                        label={"Phone"}
                        inputMode={"numeric"}
                        value={formData.phone}
                        onChangeText={(text) => onChangeHandler('phone', text)}
                    />
                    <InputField
                        label={"Address"}
                        inputMode={"text"}
                        value={formData.address}
                        onChangeText={(text) => onChangeHandler('address', text)}
                    />
                    <InputField
                        label={"Town"}
                        inputMode={"text"}
                        value={formData.town}
                        onChangeText={(text) => onChangeHandler('town', text)}
                    />
                    <InputField
                        label={"Post Code"}
                        inputMode={"text"}
                        value={formData.postcode}
                        onChangeText={(text) => onChangeHandler('postcode', text)}
                    />
                    <DropdownComponent
                        label={'Country'}
                        disable={false}
                        data={countries}
                        placeHolderText={""}
                        value={formData.country}
                        setValue={(text) => onChangeHandler('country', text)}
                    />
                    <DropdownComponent
                        label={'Qaulification'}
                        disable={false}
                        data={educationLevels}
                        placeHolderText={""}
                        value={formData.qaulification}
                        setValue={(text) => onChangeHandler('qaulification', text)}
                    />
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Date Of Birth (Required)</Text>
                        <TouchableOpacity onPress={() => setOpenDOB(true)} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.dob ? formattedDate(formData?.dob, 'dd-MM-yyyy') : 'Select Date'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>Subject Specialism:</Text>
                    {/* <MultiSelectComponent
                        label='(Further subject specialisms can be provided at Interview.)'
                        list={getParentDropdown(globalData?.students)}
                        values={ }
                        setValues={setSelectedValues}
                        required
                        placeHolderText={selectedValues ? `Selected Student (${selectedValues?.length})` : 'Select Students'}
                    /> */}
                    <InputField
                        label={"(Further subject specialisms can be provided at Interview.)"}
                        inputMode={"text"}
                        value={formData.specialism}
                        onChangeText={(text) => onChangeHandler('specialism', text)}
                    />
                    <DropdownComponent
                        label={'Age Group Specialism'}
                        disable={false}
                        data={agegroup}
                        placeHolderText={""}
                        value={formData.agegroup}
                        setValue={(text) => onChangeHandler('agegroup', text)}
                    />
                    <DropdownComponent
                        label={'Candidate Type'}
                        disable={false}
                        data={candidateType}
                        placeHolderText={""}
                        value={formData.candidatetype}
                        setValue={(text) => onChangeHandler('candidatetype', text)}
                    />
                    <DropdownComponent
                        label={'Location You want to Apply'}
                        disable={false}
                        data={data}
                        placeHolderText={""}
                        value={formData.location}
                        setValue={(text) => onChangeHandler('location', text)}
                    />
                    <Text style={styles.title}>References</Text>
                    <Text style={styles.text}>(Please provide two Academic or Professional References)</Text>
                    <Text style={styles.title}>Reference I</Text>
                    <InputField
                        label={"Refree Name"}
                        inputMode={"text"}
                        value={formData.ref1refreename}
                        onChangeText={(text) => onChangeHandler('ref1refreename', text)}
                    />
                    <InputField
                        label={"Organization/Institute"}
                        inputMode={"text"}
                        value={formData.ref1institute}
                        onChangeText={(text) => onChangeHandler('ref1institute', text)}
                    />
                    <InputField
                        label={"Employer Email"}
                        inputMode={"email"}
                        value={formData.ref1employeremail}
                        onChangeText={(text) => onChangeHandler('ref1employeremail', text)}
                    />
                    <InputField
                        label={"Job Title"}
                        inputMode={"email"}
                        value={formData.ref1jobtitle}
                        onChangeText={(text) => onChangeHandler('specialism', text)}
                    />
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Period Start Date</Text>
                        <TouchableOpacity onPress={() => setOpenRef1StartDate(true)} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.ref1startdate ? formattedDate(formData?.ref1startdate, 'dd-MM-yyyy') : 'Select Date'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Period End Date</Text>
                        <TouchableOpacity onPress={() => setOpenRef1EndDate(true)} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.ref1enddate ? formattedDate(formData?.ref1enddate, 'dd-MM-yyyy') : 'Select Date'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Reference II</Text>
                    <InputField
                        label={"Refree Name"}
                        inputMode={"text"}
                        value={formData.ref2refreename}
                        onChangeText={(text) => onChangeHandler('ref2refreename', text)}
                    />
                    <InputField
                        label={"Organization/Institute"}
                        inputMode={"text"}
                        value={formData.ref2institute}
                        onChangeText={(text) => onChangeHandler('ref2institute', text)}
                    />
                    <InputField
                        label={"Employer Email"}
                        inputMode={"email"}
                        value={formData.ref2employeremail}
                        onChangeText={(text) => onChangeHandler('ref2employeremail', text)}
                    />
                    <InputField
                        label={"Job Title"}
                        inputMode={"email"}
                        value={formData.ref2jobtitle}
                        onChangeText={(text) => onChangeHandler('specialism', text)}
                    />
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Period Start Date</Text>
                        <TouchableOpacity onPress={() => setOpenRef2StartDate(true)} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.ref2startdate ? formattedDate(formData?.ref2startdate, 'dd-MM-yyyy') : 'Select Date'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Period End Date</Text>
                        <TouchableOpacity onPress={() => setOpenRef2EndDate(true)} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.ref2enddate ? formattedDate(formData?.ref2enddate, 'dd-MM-yyyy') : 'Select Date'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Addional Information</Text>
                    <Text style={styles.text}>Have you been previously Employed or have current Employment?</Text>
                    <RadioButton options={radios} onToggle={(value) => onChangeHandler('isEmployed', value)} />
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Upload your profile pic (JPEG format Only)</Text>
                        <TouchableOpacity activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.profilepic ? formData?.profilepic : 'Choose File'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Upload your Resume (Ms Word & Pdf format Only)</Text>
                        <TouchableOpacity activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{formData?.resume ? formData?.resume : 'Choose File'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <InputField
                        multiline
                        onChangeText={(text) => onChangeHandler('comment', text)}
                        value={formData.comment}
                        label={"Please use the following space for any additional comments:"}
                        inputStyle={{
                            height: screenDimensions.height * 0.2,
                            textAlignVertical: "top",
                        }}
                    />
                    <CustomButton
                        variant={'fill'}
                        title={"Apply "}
                        onPress={() => handleSubmit()}
                        btnstyle={{ width: 120 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default JobApply

const styles = StyleSheet.create({
    title: {
        fontSize: FontSizes.xxl,
        fontFamily: FontFamily.semiBold,
        color: Color.text
    },
    text: {
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.regular,
        color: Color.text,
        marginLeft: 5
    }
})