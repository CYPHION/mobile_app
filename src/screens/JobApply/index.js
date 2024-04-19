
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import DatePickerSingle from '../../components/base/DatePicker'
import InputField from '../../components/base/InputField'
import MultiSelectComponent from '../../components/base/MultiSelect'
import RadioButton from '../../components/base/RadioButton'
import { API } from '../../network/API'
import { URL } from '../../network/httpService'
import { countries } from '../../utils/Constants'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, formattedDate, screenDimensions } from '../../utils/functions'
const genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' }
];

const educationLevels = [
    { name: "A-level or equivalent", value: "A-level or equivalent" },
    { name: "BA with QTS", value: "BA with QTS" },
    { name: "BSc with QTS", value: "BSc with QTS" },
    { name: "Degree", value: "Degree" },
    { name: "GCSE or equivalent", value: "GCSE or equivalent" },
    { name: "Graduate", value: "Graduate" },
    { name: "Post Graduate", value: "Post Graduate" },
    { name: "Phd", value: "Phd" },
    { name: "MA", value: "MA" },
    { name: "Mbbs", value: "Mbbs" },
    { name: "MSc", value: "MSc" },
    { name: "Overseas QTS (OTT)", value: "Overseas QTS (OTT)" },
    { name: "PGDE (Further Education)", value: "PGDE (Further Education)" },
    { name: "Other", value: "Other" },
];

const agegroup = [
    { name: "Higher Education", value: "Higher Education" },
    { name: "A-Level (Year 12 & Year 13)", value: "A-Level (Year 12 & Year 13)" },
    { name: "GCSE (Year 10 & Year 11)", value: "GCSE (Year 10 & Year 11)" },
    { name: "KS3 (Year 7 to Year 9)", value: "KS3 (Year 7 to Year 9)" },
    { name: "KS2 (Year 3 to Year 6)", value: "KS2 (Year 3 to Year 6)" },
    { name: "KS1 (Year 1 & Year 2)", value: "KS1 (Year 1 & Year 2)" },
    { name: "Other", value: "Other" },
]

const candidateType = [
    { name: "UK Trained Teacher", value: "UK Trained Teacher" },
    { name: "Newly Qualified Teacher", value: "Newly Qualified Teacher" },
    { name: "Overseas Trained Teacher", value: "Overseas Trained Teacher" },
    { name: "Final Year Student", value: "Final Year Student" },
    { name: "Teaching Assistant", value: "Teaching Assistant" },
    { name: "Nursery Nurse", value: "Nursery Nurse" },
    { name: "Further Education Teacher", value: "Further Education Teacher" },
    { name: "Instructor", value: "Instructor" },
    { name: "Cover Supervisor", value: "Cover Supervisor" },
    { name: "Student", value: "Student" },
    { name: "Other", value: "Other" },
];


const data = [
    { name: "Brixton", value: "Brixton" },
    { name: "Hounslow", value: "Hounslow" },
    { name: "Woolwich", value: "Woolwich" },
    { name: "Finsbury", value: "Finsbury" },
];

const radios = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },

];

const options = [
    { name: "English", value: "English" },
    { name: "Mathematics", value: "Mathematics" },
    { name: "General Science", value: "GeneralScience" },
    { name: "Chemistry", value: "Chemistry" },
    { name: "Statistics", value: "Statistics" },
    { name: "Economics", value: "Economics" },
    { name: "IT", value: "IT" },
    { name: "Business Studies", value: "BusinessStudies" },
    { name: "Biology", value: "Biology" },
    { name: "Physics", value: "Physics" },
    { name: "Verbal Non-verbal Reasoning", value: "VerbalNon-verbalReasoning" },
    { name: "Phonics", value: "Phonics" },
    { name: "Other", value: "Other" },
]

const initialData = {
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
}

const JobApply = () => {
    const [selectedValues, setSelectedValues] = useState([])
    const [resume, setResume] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploadRLoading, setUploadRLoading] = useState(false)
    const [openDOB, setOpenDOB] = useState(false)
    const [openRef1StartDate, setOpenRef1StartDate] = useState(false)
    const [openRef1EndDate, setOpenRef1EndDate] = useState(false)
    const [openRef2EndDate, setOpenRef2EndDate] = useState(false)
    const [openRef2StartDate, setOpenRef2StartDate] = useState(false)
    const [formData, setFormData] = useState(initialData)
    const router = useRoute()

    const jobId = Number(router?.params?.id)

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const uploadFile = async (file) => {
        try {

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                type: file.type,
                name: file.name || 'file', // Some file pickers don't provide a name
            });

            const response = await axios.post(`${URL}/upload/single`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle response
            return response?.data?.data
        } catch (error) {
            Alert.alert('Something went wrong');
        }
    };


    const openFile = async (selectedFile) => {
        try {
            let allowedTypes = [];
            if (selectedFile === 'profilepic') {
                allowedTypes = [DocumentPicker.types.images, 'image/jpeg'];
            } else if (selectedFile === 'resume') {
                allowedTypes = [DocumentPicker.types.pdf, 'application/msword'];
            }

            const [file] = await DocumentPicker.pick({
                type: allowedTypes,
            });


            if (selectedFile === 'profilepic') {
                setUploadLoading(true)
                const profile = await uploadFile(file);
                setUploadLoading(false)
                setProfilePic(profile)

            } else if (selectedFile === 'resume') {
                setUploadRLoading(true)
                const res = await uploadFile(file);
                setUploadRLoading(false)
                setResume(res)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
                console.log('User cancelled the picker');
            } else {
                console.log('Error: ' + err);
            }
        }
    };

    const handleSubmit = () => {
        setIsloading(true)
        const data = {
            jobId: jobId,//3
            firstName: formData.firstname,//
            lastName: formData.lastname,//
            gender: formData.gender,//
            email: formData.email,//33
            phone: formData.phone,//
            address: formData.address,//
            town: formData.town,//
            postalCode: formData.postcode,//
            country: formData.country,//3
            qualifications: formData.qaulification,//3
            dateOfBirth: formData.dob,//
            specialisms: selectedValues,//
            ageGroup: formData.agegroup,//
            candidateType: formData.candidatetype,//3
            locationApplying: formData.location,//3
            referenceOneName: formData.ref1refreename,//
            referenceOne: formData.ref1institute,
            referenceOneEmail: formData.ref1employeremail,//
            referenceOneEndDate: formData.ref1enddate,//
            referenceOneStartDate: formData.ref1startdate,//
            referenceOneJob: formData.ref1jobtitle,//
            referenceTwo: formData.ref2institute,
            referenceTwoEmail: formData.ref2employeremail,//
            referenceTwoEndDate: formData.ref2enddate,//
            referenceTwoStartDate: formData.ref2startdate,//
            referenceTwoJob: formData.ref2jobtitle,//
            previouslyEmployed: formData.isEmployed,//
            photo: profilePic,//
            cv: resume,//
            referenceTwoName: formData.ref2refreename,//
            // establishmentName: '',
            // establishmentType: "Tech",
            // establishmentTypeOther: "Other Type",
            // applicantPosition: "Software Engineer",
            // applicantPositionType: "Type A",
            // applicantPositionTime: "Full-time",
            // applicantPositionTimeOther: "Other Time",
            // notes: "Additional notes about the applicant.",
            // salary: '',
        }
        if (!formData.email || !formData.country || !formData.qaulification || !formData.candidatetype || !formData.location) {
            !formData.location ? customToast('error', 'Please add Location') : ""
            !formData.candidatetype ? customToast('error', 'Please add Candidate Type') : ""
            !formData.qaulification ? customToast('error', 'Please add Qaulification') : ""
            !formData.country ? customToast('error', 'Please add Country') : ""
            !formData.email ? customToast('error', 'Please add valid Email') : ""
            setIsloading(false)
        } else {
            API.createJobApplication(data)
                .then(res => customToast('success', res?.message))
                .catch(err => console.log(err))
                .finally(() => {
                    setIsloading(false)
                    setFormData(initialData)
                    setResume('')
                    setProfilePic('')
                })
        }
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
                        required
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
                        label={'Country (required)'}
                        disable={false}
                        data={countries}
                        placeHolderText={""}
                        value={formData.country}
                        setValue={(text) => onChangeHandler('country', text)}
                    />
                    <DropdownComponent
                        label={'Qaulification (required)'}
                        disable={false}
                        data={educationLevels}
                        placeHolderText={""}
                        value={formData.qaulification}
                        setValue={(text) => onChangeHandler('qaulification', text)}
                    />
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Date Of Birth</Text>
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
                    <MultiSelectComponent
                        label='(Further subject specialisms can be provided at Interview.)'
                        list={options}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        placeHolderText={''}
                    />
                    <DropdownComponent
                        label={'Age Group Specialism (required)'}
                        disable={false}
                        data={agegroup}
                        placeHolderText={""}
                        value={formData.agegroup}
                        setValue={(text) => onChangeHandler('agegroup', text)}
                    />
                    <DropdownComponent
                        label={'Candidate Type (required)'}
                        disable={false}
                        data={candidateType}
                        placeHolderText={""}
                        value={formData.candidatetype}
                        setValue={(text) => onChangeHandler('candidatetype', text)}
                    />
                    <DropdownComponent
                        label={'Location You want to Apply (required)'}
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
                        onChangeText={(text) => onChangeHandler('ref1jobtitle', text)}
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
                        onChangeText={(text) => onChangeHandler('ref2jobtitle', text)}
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
                        <TouchableOpacity onPress={() => openFile('profilepic')} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ color: Color.textThree }}>{profilePic ? profilePic : 'Choose File'}</Text>
                                {uploadLoading && <ActivityIndicator size={'small'} />}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ color: Color.text, marginBottom: 10 }}>Upload your Resume (Ms Word & Pdf format Only)</Text>
                        <TouchableOpacity onPress={() => openFile('resume')} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                                <Text style={{ color: Color.textThree }}>{resume ? resume : 'Choose File'}</Text>
                                {uploadRLoading && <ActivityIndicator size={'small'} />}
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
                        isLoading={isLoading}
                        disabled={isLoading}
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