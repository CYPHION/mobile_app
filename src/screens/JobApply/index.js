
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import DatePickerSingle from '../../components/base/DatePicker'
import InputField from '../../components/base/InputField'
import MultiSelectComponent from '../../components/base/MultiSelect'
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

const JobApply = () => {
    const [selectedValues, setSelectedValues] = useState([])
    const [resume, setResume] = useState({})
    const [profilePic, setProfilePic] = useState({})
    const [isLoading, setIsloading] = usestate(false)
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
    // console.log(Number(router.params?.id))

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const openFile = async (selectedFile) => {
        try {
            let allowedTypes = [];
            if (selectedFile === 'profilepic') {
                // allowedTypes = [DocumentPicker.types.images, 'image/jpeg'];
                allowedTypes = [DocumentPicker.types.allFiles];
            } else if (selectedFile === 'resume') {
                allowedTypes = [DocumentPicker.types.pdf, 'application/msword'];
            }

            const [file] = await DocumentPicker.pick({
                type: allowedTypes,
            });

            const obje = {
                path: file.name,
                name: file.name,
                type: file.type,
                size: file.size
            }

            if (selectedFile === 'profilepic') {
                const formDatafirst = new FormData();
                // formDatafirst.append('file', obje);
                // console.log(formDatafirst)
                // API.uploadImage(formDatafirst)
                //     .then(res => console.log(res))
                //     .catch(err => console.log(err))


                setProfilePic(file)

            } else if (selectedFile === 'resume') {
                setResume(file)
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
        //         setIsloading(true)
        // const data = {
        //     jobId: 123,
        //     firstName: formData.firstname,
        //     lastName: formData.lastname,
        //     gender: formData.gender,
        //     email: formData.email,
        //     phone: formData.phone,
        //     address: formData.address,
        //     town: formData.town,
        //     postalCode: formData.postcode,
        //     country: formData.country,
        //     qualifications: formData.qaulification,
        //     ageGroup: formData.agegroup,
        //     specialisms: selectedValues,
        //     candidateType: formData.candidatetype,
        //     referenceOne: formData.ref1refreename,
        //     referenceOneEmail: formData.ref1employeremail,
        //     referenceOneEndDate: formData.ref1enddate,
        //     referenceOneStartDate: formData.ref1startdate,
        //     referenceOneJob: formData.ref1jobtitle,
        //     referenceTwo: formData.ref2refreename,
        //     referenceTwoEmail: formData.ref2employeremail,
        //     referenceTwoEndDate: formData.ref2enddate,
        //     referenceTwoStartDate: formData.ref2startdate,
        //     referenceTwoJob: formData.ref2jobtitle,
        //     establishmentName: formData.,
        //     establishmentType: "Tech",
        //     establishmentTypeOther: "Other Type",
        //     applicantPosition: "Software Engineer",
        //     applicantPositionType: "Type A",
        //     applicantPositionTime: "Full-time",
        //     applicantPositionTimeOther: "Other Time",
        //     photo: "url_to_photo.jpg",
        //     cv: "url_to_cv.pdf",
        //     notes: "Additional notes about the applicant.",
        //     previouslyEmployed: 1,
        //     salary: 50000,
        //     locationApplying: "Brixton",
        //     referenceOneName: "Reference One Name",
        //     referenceTwoName: "Reference Two Name",
        //     dateOfBirth: formData.dob
        // }

        //         API.createJobApplication()
        //             .then(res => console.log(res))
        //             .catch(err => console.log(err))
        //             .finally(() => setIsloading(false))
        //         console.log(formData)
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
                    <MultiSelectComponent
                        label='(Further subject specialisms can be provided at Interview.)'
                        list={options}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        placeHolderText={''}
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
                        <TouchableOpacity onPress={() => openFile('profilepic')} activeOpacity={0.7} style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 40,
                            justifyContent: 'center',
                            padding: 5
                        }}>
                            <View>
                                <Text style={{ color: Color.textThree }}>{profilePic?.name ? profilePic?.name : 'Choose File'}</Text>
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
                            <View>
                                <Text style={{ color: Color.textThree }}>{resume?.name ? resume?.name : 'Choose File'}</Text>
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
                        disable={isLoading}
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