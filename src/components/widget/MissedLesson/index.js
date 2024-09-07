import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { API } from '../../../network/API'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { formattedDate, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import CustomButton from '../../base/CustomButton'
import InputField from '../../base/InputField'
import MyModal from '../../base/Modal'
import MultiSelectComponent from '../../base/MultiSelect'
import SelectedStudents from '../SelectedStudents'

const MissedLesson = () => {

    const [open, setOpen] = useState(false)
    const [activeScreen, setActiveScreen] = useState(true)
    const [formData, setFormData] = useState({
        mainId: '',
        dateRange: '-',
        Student: []
    })
    const [selectedValues, setSelectedValues] = useState([])
    const [paidUpto, setPaidUpto] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [disable, setDisable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [res, setRes] = useState([])
    const [rows, setRows] = useState([])
    const [studentData, setStudentData] = useState(null);
    const globalData = useSelector(state => state?.global?.data)
    // Function to handle change events of form inputs
    const onChangeHandler = (name, text) => {
        // Update formData state with the new value
        setFormData(prevFormData => ({
            ...prevFormData,// Maintain the previous state
            [name]: text// Update the specific field with the new value
        }));

    };
    // ModalContent component to render modal content
    const ModalContent = () => (
        <View style={styles.modal}>
            <Text style={styles.modalText}>Compensation Not Available!</Text>
            <Text style={[styles.modalText, { fontFamily: FontFamily.medium, fontSize: FontSizes.md }]}>Fee not paid to avail Compensation</Text>
            <CustomButton
                title='OK'
                onPress={() => {
                    setOpen(false)

                }}
                textStyle={{ color: Color.textThree }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5, backgroundColor: Color.disable }}
            />
        </View>
    )
    // Function to get student data of a parent
    const getStudentOfParent = async () => {
        // Retrieve student data array from globalData
        const dataArray = globalData?.students
        // Variable to store the maximum due fee date
        let maxDueFeeDate = null;
        if (dataArray?.length > 0) {  // Check if dataArray contains data
            // Loop through each student in dataArray to find the maximum due fee date
            dataArray?.forEach((element) => {
                const dueFeeDate = element.dueFeeDate;
                // Update maxDueFeeDate if the dueFeeDate is greater than the current maxDueFeeDate or maxDueFeeDate is null
                if (dueFeeDate && (maxDueFeeDate === null || dueFeeDate > maxDueFeeDate)) {
                    maxDueFeeDate = dueFeeDate;
                }
            });
            // Check if maxDueFeeDate is not null
            if (maxDueFeeDate !== null) {
                // Convert maxDueFeeDate to a Date object               
                const maxDueFeeDateObject = new Date(maxDueFeeDate);
                // Calculate the start date for the date range (8 weeks before maxDueFeeDate)
                const startDateSet = new Date(maxDueFeeDateObject.getTime() - (8 * 7 * 24 * 60 * 60 * 1000));
                // Get today's date
                const today = new Date()
                // Check if maxDueFeeDate is greater than or equal to today's date
                if (maxDueFeeDateObject.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)) {
                    // Set start date, end date, and other related states
                    setStartDate(startDateSet)
                    setEndDate(new Date(maxDueFeeDate))
                    getTotalAttendance(startDateSet, maxDueFeeDate)
                    setFormData(prev => ({
                        ...prev,
                        dateRange: `${formattedDate(startDateSet, 'dd/MM/yyyy')} - ${formattedDate(maxDueFeeDate, 'dd/MM/yyyy')} `
                    }))
                    setPaidUpto(formattedDate(maxDueFeeDate, 'dd/MM/yyyy'))
                    setDisable(false) // Enable form elements
                } else {

                    setOpen(true)// Open the modal indicating that compensation is not available
                }


            }
            else {
                setOpen(true)// Open the modal indicating that compensation is not available
            }
        } else {
            setOpen(true)// Open the modal indicating that compensation is not available
        }
    }
    // Function to retrieve attendance data within a specified date range
    const getTotalAttendance = async (startDate, endDate) => {
        // Construct query string with formatted start and end dates
        let data = `startDate=${formattedDate(startDate, 'yyyy-MM-dd')}&endDate=${formattedDate(endDate, 'yyyy-MM-dd')}`
        // Call API to get attendance data by date range
        API.getAttendanceByDateRange(data).then((res) => {
            // Set the attendance data received from the API response
            setRes(res?.data)
        }).catch((err => console.log(err))) // Log any errors that occur during the API call
    }
    // Function to retrieve all compensation data
    const getAllCompensation = async () => {
        // Call the API to get all compensation data
        await API.compensationAll().then(
            res => {
                // Set the rows state with the compensation data received from the API response
                setRows(res?.data)
            }
        ).catch(err => toast.error(err?.message))// Display error message if API call fails
    }
    // Function to handle form submission
    const handleSubmit = () => {
        setIsLoading(false);// Set loading state to false

        // Extract student names from selectedValues
        const stds = (selectedValues || []).map(elem => elem.split("Missed")[0].trim());

        // Filter the attendance data based on student names, attendanceType, and attendanceCategory
        const filteredData = res.filter(item => {
            const studentName = (item?.Student?.fullName || '').trim();
            const attendanceType = item?.attendanceType || '';
            const attendanceCategory = item?.attendanceCategory || '';
            return stds.includes(studentName) && (attendanceType === "absent" || attendanceType === "leave") && attendanceCategory === 'regular';
        });

        // Exclude rows with missedScheduleAttendanceId
        const ids = (rows || []).map(elem => elem.missedScheduleAttendanceId);
        const excludeComp = res.filter(elem => !ids.includes(elem.id));

        // Filter excluded data based on student names, attendanceType, and attendanceCategory
        const getexcludedBySelect = excludeComp.filter(item => {
            const studentName = (item?.Student?.fullName || '').trim();
            const attendanceType = item?.attendanceType || '';
            const attendanceCategory = item?.attendanceCategory || '';
            return stds.includes(studentName) && (attendanceType === "absent" || attendanceType === "leave") && attendanceCategory === 'regular';
        });

        // Choose data based on whether excluded data is present
        const dataToProcess = getexcludedBySelect.length > 0 ? getexcludedBySelect : filteredData;

        // Process the filtered data into studentAttendance object
        const studentAttendance = dataToProcess.reduce((acc, item) => {
            const studentId = item?.studentId || '';
            const attendanceType = item?.attendanceType || '';

            if (attendanceType === 'absent' || attendanceType === "leave") {
                acc[studentId] = acc[studentId] || { attendanceData: [] };
                acc[studentId].attendanceData.push(item);
            }

            return acc;
        }, {});

        // Convert the object values to an array
        const processedData = Object.values(studentAttendance);

        setIsLoading(false); // Set loading state to false

        // Set student data state
        setStudentData({
            attendance: processedData,
            startDate,
            endDate
        });
        setActiveScreen(false) // Set active screen state to false to navigate away from the form
    }

    useEffect(() => {
        getStudentOfParent()
        getAllCompensation()
    }, [globalData?.students])


    useEffect(() => {
        // Retrieve student data from globalData
        const parentStdnt = globalData?.students


        // Map to store the attendance count for each student
        const absenceCountMap = new Map();

        const ids = rows?.map(elem => elem.missedScheduleAttendanceId) // Extract missedScheduleAttendanceIds from rows

        const excludeComp = res?.filter(elem => !ids.includes(elem.id))  // Exclude rows with missedScheduleAttendanceIds from res
        // Initialize absence count for each student
        parentStdnt?.forEach(studentObj => {
            const studentName = studentObj.fullName;
            absenceCountMap.set(studentName, 0);
        });
        // Choose data to process based on whether excluded data is present
        const dataToProcess = excludeComp && excludeComp.length > 0 ? excludeComp : res;


        // Iterate through the response data to calculate absences
        dataToProcess?.forEach(item => {
            const studentId = item.studentId;
            const studentName = item.Student?.fullName;
            const attendanceType = item.attendanceType;
            // Check if the student is absent or on leave
            const isStudentAbsent = parentStdnt.some(studentObj => studentObj.id === studentId) && (attendanceType === "absent" || attendanceType === "leave");

            if (isStudentAbsent) {
                // If the student is absent, update the count
                if (absenceCountMap.has(studentName)) {
                    absenceCountMap.set(studentName, absenceCountMap.get(studentName) + 1);
                } else {
                    // This case should not occur, but handle it just in case
                    absenceCountMap.set(studentName, 1);
                }
            }
        });
        // Construct the strings for each student
        const absenceStrings = Array.from(absenceCountMap.entries()).map(([student, count]) => {
            const obj = {
                value: `${student} Missed(${count}) (Paid Upto: ${paidUpto})`,
                name: `${student} Missed(${count}) (Paid Upto: ${paidUpto})`,
                disabled: count === 0 ? true : false // Disable the option if absence count is 0
            }
            return obj
        });
        // Set options state with absence strings
        setOptions(absenceStrings);

    }, [res])


    return (
        <View>
            <MyModal
                modalVisible={open}
                setModalVisible={setOpen}
                children={ModalContent()}
            />
            {activeScreen ?
                <View style={GlobalStyles.p_10}>
                    {/* <InputField
                        label={"Main Id"}
                        inputMode={"numeric"}
                        value={formData.mainId}
                        onChangeText={(text) => onChangeHandler('numeric', text)}
                    /> */}
                    <InputField
                        label={"Date Range"}
                        value={formData.dateRange}
                        editable={false}
                        onChangeText={(text) => onChangeHandler('numeric', text)}
                    />
                    <MultiSelectComponent
                        list={options?.filter(elem => !elem.disabled)}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        label={'Select Student'}
                        placeHolderText={`Selected Student ${selectedValues?.length ? selectedValues?.length : ''}`}
                        disable={disable}

                    />
                    <View style={styles.btnContainer}>
                        <CustomButton
                            title={'Submit'}
                            variant='fill'
                            btnstyle={{ width: screenDimensions.width * 0.25 }}
                            onPress={handleSubmit}
                            disabled={selectedValues?.length === 0 ? true : false}
                            isLoading={isLoading}
                        />
                        <CustomButton
                            title={'Reset'}
                            btnstyle={styles.btnStyle}
                            onPress={() => {
                                setSelectedValues([])
                            }}
                            disabled={disable}
                        />
                    </View>
                </View> :
                <SelectedStudents setActiveScreen={setActiveScreen} selectedValues={selectedValues} studentData={studentData} />
            }
        </View>
    )
}

export default MissedLesson

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    btnStyle: {
        width: screenDimensions.width * 0.25,
        borderColor: Color.primary,
        borderWidth: 1
    },
    iconView: {
        backgroundColor: Color.primary,
        width: screenDimensions.width * 0.15,
        height: screenDimensions.width * 0.15,
        borderRadius: screenDimensions.width * (0.15 * 0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {

        alignItems: 'center',
        gap: 10
    },
    modalText: {
        textAlign: 'center',
        fontFamily: FontFamily.interBold,
        color: Color.text,
        fontSize: FontSizes.lg
    }

})