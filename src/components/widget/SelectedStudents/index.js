import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackIcon from 'react-native-vector-icons/AntDesign'
import CrossIcon from 'react-native-vector-icons/MaterialIcons'
import { API } from '../../../network/API'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { customToast, formattedDate, removeError, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import MyCheckBox from '../../base/CheckBox'
import CustomButton from '../../base/CustomButton'
import DropdownComponent from '../../base/CustomDropDown'
import DatePickerSingle from '../../base/DatePicker'
import GridTable from '../../base/GridTable'
import InputField from '../../base/InputField'
import ProceedCompensation from '../ProceedCompensation'


const initialData = {}
const { fontScale } = screenDimensions;

const items = (item) => [
    {
        name: "Missed Attendance",
        value: `${item.attendanceDate} ${'\n'} ${item?.SubjectName} Subject`,
    },
    {
        name: "New Schedule",
        value: item?.date ? formattedDate(item.date, 'yyyy-MM-dd') : '',
    },
    {
        name: "Available Schedule",
        value: `${item.availableattendanceDate ? formattedDate(item.availableattendanceDate, 'yyyy-MM-dd') : ''} ${'\n'} ${item?.availableScheduleLessonTime} ${'\n'} ${item.availableSubjectName}`,
    },
    {
        name: "Total Available Seats",
        value: item?.availableSeats,
    },
    {
        name: "Remarks",
        value: item?.remarks ? item?.remarks : '',
    },

]

const SelectedStudents = (props) => {
    const { setActiveScreen, studentData } = props
    const [activeStudent, setActiveStudent] = useState(true)
    const [process, setProcess] = useState(false)
    const [student, setStudent] = useState([])
    const [formValues, setFormValues] = useState(initialData)
    const [error, setError] = useState({})
    const [openDateIndex, setOpenDateIndex] = useState(null);
    const [rows, setrows] = useState([])
    const [activeStudentId, setActiveStudentId] = useState('')
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedDates, setSelectedDates] = useState({});
    const [selectedData, setSelectedData] = useState([])

    // Function to handle input change
    const handleInputChange = (field, value, stdIndex) => {
        // Make a copy of the current form values
        const updatedFormValues = { ...formValues };

        // Check if the index exists in the formValues object
        if (updatedFormValues.hasOwnProperty(stdIndex)) {
            // Update the nested object at the specified index
            updatedFormValues[stdIndex] = {
                ...updatedFormValues[stdIndex],
                [field]: value,
            };
            // Set the updated state
            setFormValues(updatedFormValues);

            // Remove error for the specific field
            setError(prev => ({
                ...prev,
                [stdIndex]: removeError(error[stdIndex], field)
            }));
        } else {
            // If the index doesn't exist, create a new entry for it
            updatedFormValues[stdIndex] = {
                ...updatedFormValues[stdIndex],
                [field]: value,
            };
            // Set the updated state
            setFormValues(updatedFormValues);

            // Remove error for the specific field
            setError(prev => ({
                ...prev,
                [stdIndex]: removeError(error[stdIndex], field)
            }));
        }
    };

    // Function to get available schedule
    const getAvailable = async (date, studentIndex, stdYear) => {
        // Get the year name
        const getYearName = stdYear;

        // Call the API to get available schedule
        const res = await API.getAvailableSchedule({
            date: formattedDate(date, 'yyyy-MM-dd'),
            yearName: getYearName,
        });

        // Update selected dates based on whether student index exists or not
        if (!selectedDates.hasOwnProperty(studentIndex)) {
            // If student index does not exist, add new entry
            setSelectedDates(prevSelectedDates => ({
                ...prevSelectedDates,
                [studentIndex]: res?.data,
            }));
        } else {
            // If student index exists, update existing entry
            setSelectedDates(prevSelectedDates => ({
                ...prevSelectedDates,
                [studentIndex]: res?.data,
            }));
        }
    };


    // Function to handle checkbox toggle
    const handleCheckbox = (rowId) => {
        // Find the index of the schedule item with the given ID
        const index = rows?.findIndex(item => item.id === Number(rowId));

        // If the schedule item is not found, handle error or return
        if (index === -1) {
            return;
        }

        // Create a new object to hold the checked items
        const newCheckedItems = { ...checkedItems };

        // Toggle the checkbox for the specific schedule ID
        newCheckedItems[rowId] = !newCheckedItems[rowId];

        // Update the state with the new checked items
        setCheckedItems(newCheckedItems);

        // Get the data associated with the clicked schedule
        const newData = rows[index];

        // Update the selected data based on checkbox state
        setSelectedData(prev => {
            // If the checkbox is checked, add the schedule data to the selected data
            if (newCheckedItems[rowId]) {
                return [...prev, { ...newData }];
            } else {
                // If the checkbox is unchecked, remove the schedule data from the selected data
                return prev.filter(item => item.id !== rowId);
            }
        });
    };

    // Function to handle deletion
    const handleDelete = (rowId, type) => {
        // Check if the deletion type is 'single' or 'all'
        type === "single" ? Alert.alert(
            // If 'single', show confirmation for deleting a single item
            'Delete',
            'Are you sure you want to delete?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        // If confirmed, filter out the row with the given ID and update state
                        setrows(rows?.filter(elem => elem?.id !== rowId))
                    }
                }
            ],
            { cancelable: false }
        ) : Alert.alert(
            // If 'all', show confirmation for deleting all items associated with a student
            'Delete',
            'Are you sure you want to delete all?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        // If confirmed, filter out all rows associated with the student ID and update state
                        setrows(rows?.filter(elem => elem?.studentId !== rowId))
                        // Clear the selected data since all associated items are deleted
                        setSelectedData([])
                    }
                }
            ],
            { cancelable: false }
        )
    }


    // Function to render checkbox and delete icon for a row
    const CheckBoxRender = (rowId) => {
        return (
            <View style={{ zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                <MyCheckBox isChecked={checkedItems[rowId]} onToggle={() => handleCheckbox(rowId)} />
                <CrossIcon onPress={() => handleDelete(rowId, 'single')} name='close' color={Color.text} size={FontSizes.xl} />
            </View>
        )
    }

    // Function to handle form submission for a student
    const studentformHandler = (studentIndex, studentId) => {
        // Check if any required field is empty
        if (!formValues[studentIndex]?.newDate || !formValues[studentIndex]?.missedSchedule || !formValues[studentIndex]?.availableSchedule) {
            // If any required field is empty
            if (!error.hasOwnProperty(studentIndex)) {
                // If error object doesn't have entry for this student index
                setError(prevErrors => ({
                    ...prevErrors,
                    [studentIndex]: {
                        missedSchedule: !formValues[studentIndex]?.missedSchedule ? 'Missed Attendance field is required' : '',
                        newDate: !formValues[studentIndex]?.newDate ? 'Start Date field is required' : '',
                        availableSchedule: !formValues[studentIndex]?.availableSchedule ? 'Available Schedule field is required' : ''
                    },
                }));
                customToast("error", "Please fill all details"); // Show error message
            } else {
                // If error object already has entry for this student index
                setError(prevErrors => ({
                    ...prevErrors,
                    [studentIndex]: {
                        missedSchedule: !formValues[studentIndex]?.missedSchedule ? 'Missed Attendance field is required' : '',
                        newDate: !formValues[studentIndex]?.newDate ? 'Start Date field is required' : '',
                        availableSchedule: !formValues[studentIndex]?.availableSchedule ? 'Available Schedule field is required' : ''
                    },
                }));
                customToast("error", "Please fill all details"); // Show error message
            }
        } else {
            // If all required fields are filled
            const randomNumber = Math.floor(Math.random() * 1000000) + 1; // Generate a random ID for the new data

            // Create data object with form values and other necessary details
            const data = {
                id: randomNumber,
                studentId: studentId,
                SubjectName: student[studentIndex]?.attendanceData?.find(elem => elem.id === formValues[studentIndex]?.missedSchedule)?.Subject?.name,
                date: formValues[studentIndex]?.newDate,
                missedSchedule: formValues[studentIndex]?.missedSchedule,
                attendanceDate: student[studentIndex]?.attendanceData?.find(elem => elem.id === formValues[studentIndex]?.missedSchedule)?.attendanceDate,
                availableSubjectName: selectedDates[studentIndex]?.find(elem => elem.id === formValues[studentIndex]?.availableSchedule)?.Schedule?.Subject?.name,
                availableattendanceDate: selectedDates[studentIndex]?.find(elem => elem.id === formValues[studentIndex]?.availableSchedule)?.date,
                availableSchedule: formValues[studentIndex]?.availableSchedule,
                availableScheduleLessonTime: selectedDates[studentIndex]?.find(elem => elem.id === formValues[studentIndex]?.availableSchedule)?.Schedule?.LessonTiming?.time,
                availableSeats: selectedDates[studentIndex]?.find(elem => elem.id === formValues[studentIndex]?.availableSchedule)?.availableSeats,
                remarks: formValues[studentIndex]?.remarks
            };

            // Add the new data to the rows state
            setrows((prevRows) => [...prevRows, data]);

            // Clear the form values for the current student
            setFormValues((prevFormValues) => {
                const updatedFormValues = { ...prevFormValues };
                updatedFormValues[studentIndex] = {
                    remarks: '',
                    newDate: '',
                    missedSchedule: '',
                    availableSchedule: ''
                };
                return updatedFormValues;
            });

            // Clear the selected dates for the current student
            if (!selectedDates.hasOwnProperty(studentIndex)) {
                setSelectedDates(prevSelectedDates => ({
                    ...prevSelectedDates,
                    [studentIndex]: [],
                }));
            } else {
                setSelectedDates(prevSelectedDates => ({
                    ...prevSelectedDates,
                    [studentIndex]: [],
                }));
            }
        }
    };

    // Effect to run when studentData changes
    useEffect(() => {
        // Check if studentData is not null
        if (studentData !== null) {
            // Set the student state with attendance data from studentData
            setStudent(studentData?.attendance);

            // Create a copy of initialData
            const updatedInitialData = { ...initialData };

            // Loop through each student in studentData
            studentData?.attendance.forEach((student, index) => {
                // Only update if the index is not already in updatedInitialData
                if (!updatedInitialData.hasOwnProperty(index)) {
                    // Initialize form values for the student at the index
                    updatedInitialData[index] = {
                        missedSchedule: '',
                        newDate: '',
                        availableSchedule: '',
                        remarks: '',
                    };
                }
            });

            // Set the formValues state with updatedInitialData
            setFormValues(updatedInitialData);
        }
    }, [studentData]);




    return (
        <>
            {process ?
                <>
                    <ProceedCompensation setProcess={setProcess} setActiveStudent={setActiveStudent} data={rows} />
                </> :
                <ScrollView>
                    {activeStudent ?
                        <>
                            <View style={{ height: screenDimensions.height }}>
                                <ScrollView>
                                    {student?.length > 0 && student?.map((elem, index) => {
                                        const attenaceDatamap = student[index]?.attendanceData[0]
                                        const eachStudentAttendanceData = student[index]?.attendanceData
                                        let studentId = attenaceDatamap?.studentId
                                        let studentYear = attenaceDatamap?.Student?.StudentYear?.name

                                        const rowIdforAttendance = (rows || []).map(elem => elem.missedSchedule);
                                        const excludedIds = eachStudentAttendanceData?.filter(elem => !rowIdforAttendance.includes(elem.id))


                                        return <View key={index} >
                                            <View style={[styles.bgColor, styles.container]}>
                                                <Text style={styles.detailText}>{attenaceDatamap?.Student?.fullName} </Text>
                                            </View>
                                            <View style={GlobalStyles.p_10}>
                                                <DropdownComponent
                                                    dropdownStyle={{ height: 50 }}
                                                    disable={false}
                                                    data={excludedIds?.length > 0 ? excludedIds?.map(data => ({
                                                        name: `${data?.Student?.mainId} - ${data?.Student?.StudentYear?.name} - ${data?.Subject?.name} - ${data?.Department?.name}, ${data?.Schedule?.days} ${data?.Schedule?.LessonTiming?.time} ${formattedDate(data?.attendanceDate, "dd-MM-yyyy")} - ${data?.attendanceType} `,
                                                        value: data.id
                                                    })) : eachStudentAttendanceData?.map(data => ({
                                                        name: `${data?.Student?.mainId} - ${data?.Student?.StudentYear?.name} - ${data?.Subject?.name} - ${data?.Department?.name}, ${data?.Schedule?.days} ${data?.Schedule?.LessonTiming?.time} ${formattedDate(data?.attendanceDate, "dd-MM-yyyy")} - ${data?.attendanceType} `,
                                                        value: data.id
                                                    }))}
                                                    placeHolderText={"Missed Attendance"}
                                                    value={formValues[index]?.missedSchedule}
                                                    setValue={text => {
                                                        handleInputChange('missedSchedule', text, index)
                                                    }}
                                                />
                                                <DatePickerSingle
                                                    isVisible={openDateIndex === index}
                                                    onToggle={() => setOpenDateIndex(null)}
                                                    onDone={async (date) => {
                                                        handleInputChange('newDate', date, index)
                                                        await getAvailable(date, index, studentYear)
                                                    }}
                                                />
                                                <View style={{ padding: 5 }}>
                                                    <Text style={{ color: Color.text, marginBottom: 5 }}>Select Date (Required)</Text>
                                                    <TouchableOpacity onPress={() => setOpenDateIndex(index)} activeOpacity={0.7} style={{
                                                        borderWidth: 1,
                                                        borderRadius: 4, height: fontScale * 40,
                                                        justifyContent: 'center',
                                                        padding: 5
                                                    }}>
                                                        <View>
                                                            <Text style={{ color: Color.textThree }}>{formValues[index]?.newDate ? formattedDate(formValues[index]?.newDate, 'dd-MM-yyyy') : 'Select Date'}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <DropdownComponent
                                                    dropdownStyle={{ height: 50 }}
                                                    disable={false}
                                                    data={(selectedDates[index] || [])?.map(elem => ({
                                                        name: `${elem?.Schedule?.Subject?.name} -  ${elem?.Schedule?.Department?.name} of ${elem?.Schedule?.LessonTiming?.time}, ${elem?.Schedule?.days}, Year-${elem.yearName}, ${elem?.availableSeats} Places Available`,
                                                        value: elem.id,
                                                    }))}
                                                    placeHolderText={"Availible Schedule"}
                                                    value={formValues[index]?.availableSchedule}
                                                    setValue={text => {
                                                        handleInputChange('availableSchedule', text, index)
                                                    }}
                                                />
                                                <InputField
                                                    label={"Remarks"}
                                                    value={formValues[index]?.remarks}
                                                    onChangeText={(text) => handleInputChange('remarks', text, index)}
                                                />
                                                <View style={styles.btnContainer}>
                                                    <CustomButton
                                                        title={'Add'}
                                                        variant='fill'
                                                        btnstyle={styles.btnStyle}
                                                        onPress={() => studentformHandler(index, studentId)}
                                                    />
                                                    <CustomButton
                                                        variant='fill'
                                                        title={'View'}
                                                        onPress={() => {
                                                            setActiveStudent(false)
                                                            setActiveStudentId({ id: studentId, name: attenaceDatamap?.Student?.fullName })
                                                            setSelectedData([])
                                                            setCheckedItems([])
                                                        }}
                                                        btnstyle={styles.btnStyle}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    })}
                                    <View style={{
                                        height: screenDimensions.height * 0.4
                                    }}>
                                        <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                                            <CustomButton
                                                title='Create All'
                                                variant='fill'
                                                btnstyle={{ width: '90%' }}
                                                onPress={() => setProcess(true)}
                                                disabled={rows?.length === 0 ? true : false}
                                            />
                                        </View>
                                        <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                                            <CustomButton
                                                title='Go Back'
                                                btnstyle={{ width: '90%', borderWidth: 1, borderColor: Color.primary }}
                                                onPress={() => setActiveScreen(true)}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>


                            </View>
                        </>
                        :

                        <View >
                            <View style={[styles.bgColor, styles.container, GlobalStyles.p_10]}>
                                <TouchableOpacity onPress={() => setActiveStudent(true)} activeOpacity={0.7} style={[styles.iconButton]}>
                                    <BackIcon name='left' color={Color.text} size={FontSizes.xl} />
                                    <Text style={styles.detailText}>{activeStudentId?.name}</Text>
                                </TouchableOpacity>
                            </View>
                            {rows.filter(elem => elem?.studentId === activeStudentId?.id)?.length > 0 ? <>
                                <View style={[GlobalStyles.p_10, { height: rows.filter(elem => elem?.studentId === activeStudentId?.id)?.length === 1 ? screenDimensions.height : screenDimensions.height * 1.85 }]}>
                                    <ScrollView>
                                        {rows.filter(elem => elem?.studentId === activeStudentId?.id)?.map((elem, index) => (
                                            <GridTable
                                                data={items(elem)}
                                                key={index}
                                                CheckboxChild={CheckBoxRender(elem?.id)}
                                            />
                                        ))}
                                        {selectedData?.length > 1 ? <View style={{ width: '100%', alignItems: 'center' }}>
                                            <CustomButton
                                                title='Delete All'
                                                variant='fill'
                                                btnstyle={{ width: '95%', backgroundColor: Color.error }}
                                                onPress={() => handleDelete(activeStudentId?.id)}
                                            />
                                        </View> : null}
                                    </ScrollView>
                                </View>

                            </> : <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.5 }}><Text style={{ color: Color.textThree, fontSize: FontSizes.xl }}>Please Add Some Record</Text></View>}
                        </View>

                    }
                </ScrollView>
            }
        </>
    )
}

export default SelectedStudents

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium,
        paddingLeft: 5
    },
    bgColor: {
        backgroundColor: Color.grayBackground,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    btnStyle: {
        width: screenDimensions.width * 0.25
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    }
})