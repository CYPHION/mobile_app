import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Color } from '../../../utils/color'
import { FontSizes } from '../../../utils/font'
import { formattedDate, screenDimensions } from '../../../utils/functions'
import AccordionItem from '../../base/Accordion'
import MyCheckBox from '../../base/CheckBox'
import GridTable from '../../base/GridTable'


const item = (item) => [
    {
        name: "Subject",
        value: item?.Subject?.name,
    },
    {
        name: "Hours Per Week",
        value: item?.LessonTiming?.hours,
    },
    {
        name: "Day",
        value: item?.days,
    },
    {
        name: "Time",
        value: item?.LessonTiming?.time,
    },
]

/*
this component is use in create compensation as a student accordion 
*/



const StudentsAccordion = (props) => {

    const { open, setOpen, date, selectedStudent, setselectData } = props
    const [activeItem, setActiveItem] = useState(null);
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const globalData = useSelector(state => state?.global?.data)

    // its function to checked items in an array
    const handleCheckbox = (scheduleId) => {
        const index = globalData?.schedules.findIndex(item => item.id === Number(scheduleId));
        if (index === -1) {
            return; // Schedule item not found, handle error or return
        }

        // Create a new array of checked items to toggle the checkbox for the specific schedule
        const newCheckedItems = { ...checkedItems };

        // Toggle the checkbox for the specific schedule ID
        newCheckedItems[scheduleId] = !newCheckedItems[scheduleId];

        // Update the state with the new checked items
        setCheckedItems(newCheckedItems);

        // Get the data associated with the clicked schedule
        const newData = globalData?.schedules[index];

        setSelectedData(prev => {
            // If the checkbox is checked, add the schedule data to the selected data
            if (newCheckedItems[scheduleId]) {
                return [...prev, { ...newData }];
            } else {
                // If the checkbox is unchecked, remove the schedule data from the selected data
                return prev.filter(item => item.id !== scheduleId);
            }
        });
    };


    // its for modal toggle 
    const toggleModal = () => {
        setOpen(!open);
    };

    // this function take student id and return table of student schedule
    const getSelectedStudentSchedule = (studentId) => {

        const day = formattedDate(date, 'EEEE')
        const getStudentSchedules = globalData?.schedules?.filter(elem => elem?.studentId === studentId && elem.days === day && !elem.isComp && !elem.isBooster)

        return (

            getStudentSchedules?.length > 0 ? <>
                {getStudentSchedules?.map((elem, index) => (
                    <GridTable
                        data={item(elem)}
                        key={index}
                        CheckboxChild={<MyCheckBox isChecked={checkedItems[elem.id]} onToggle={() => handleCheckbox(elem.id)} />}
                    />
                ))}
            </> : <View><Text style={{ color: Color.text }}>No Schedule found Please Select Another Date</Text></View>


        )

    }

    const handleClose = () => {
        setselectData(selectedData)
        toggleModal()
    }


    return (

        <View>
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={open}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent]}>
                            {selectedStudent?.length > 0 && date ? <>
                                <ScrollView>
                                    <View style={{ width: screenDimensions.width * 0.95 }}>
                                        {globalData?.students?.map((item, index) => {
                                            if (selectedStudent?.includes(item?.id)) {
                                                return <AccordionItem
                                                    children={getSelectedStudentSchedule(item?.id, index)}
                                                    key={index}
                                                    date={`Main ID : ${item?.mainId}`}
                                                    studentName={`Year in School- ${item?.StudentYear?.name}`}
                                                    total={item?.fullName}
                                                    // data={item.data}
                                                    expanded={activeItem === index}
                                                    onToggle={() => toggleItem(index)} // Pass toggle function to each item
                                                />
                                            }
                                        }
                                        )}
                                    </View>
                                </ScrollView>
                            </> : <View style={{ width: screenDimensions.width * 0.95, height: screenDimensions.height * 0.3, backgroundColor: Color.white, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: Color.black, fontSize: FontSizes.xl }}>Please Select Date </Text>
                            </View>}
                        </View>
                        <TouchableOpacity style={styles.backdrop} onPress={handleClose} />
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default StudentsAccordion

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        paddingVertical: 25,
        width: screenDimensions.width * 0.95,
        alignItems: "center",
        // backgroundColor: Color.pureWhite,
        borderRadius: 10,
        zIndex: 1000,
    },
    backdrop: {
        position: "absolute",
        flex: 1,
        height: screenDimensions.height,
        width: screenDimensions.width,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
    },
})