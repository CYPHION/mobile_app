import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { screenDimensions } from '../../../utils/functions'
import AccordionItem from '../../base/Accordion'
import MyCheckBox from '../../base/CheckBox'
import CustomButton from '../../base/CustomButton'
import GridTable from '../../base/GridTable'


const StudentsAccordion = (props) => {

    const { open, setOpen, setNextScreen } = props
    const [activeItem, setActiveItem] = useState(null);
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };
    const items = [
        {
            date: "18 Jan - 20 Jan ",
            studentName: "Abdullah Khan (Weekly)",
            title: "£120",
        },
        {
            date: "28 Mar - 30 Apr ",
            studentName: "Hammad  (Weekly)",
            title: "£1000",
        }
    ];


    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
        {
            name: "agblsuyuil syufy sfap",
            value: "jfksafh.ajkkflas;jk",
        },
        {
            name: "hfsgksabjhfuklagklsakfa",
            value: "10/8/2024",
        },
        {
            name: "date",
            value: "10/8/2024",
        },
        {
            name: "name",
            value: "M.Owais",
        },
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
    ]


    const tableData = [
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
    ]



    const InnerTables = (index) => {
        const [checkedItems, setCheckedItems] = useState(Array(tableData.length).fill(false));
        const [selectedData, setSelectedData] = useState([]);

        const handleCheckbox = (index) => {
            const newCheckedItems = [...checkedItems];
            newCheckedItems[index] = !newCheckedItems[index];
            setCheckedItems(newCheckedItems);

            // Update selectedData based on the checked status
            const newData = tableData[index].item
            setSelectedData((prev) => [...prev, { ...newData }]);
        };

        return (
            <>
                <CustomButton
                    variant='fill'
                    title='Done'
                    onPress={() => { setNextScreen(true); toggleItem(index) }}
                />
                {tableData.map((elem, index) => (
                    <GridTable
                        data={elem.item}
                        key={index}
                        CheckboxChild={<MyCheckBox isChecked={checkedItems[index]} onToggle={() => handleCheckbox(index)} />}
                    />
                ))}
            </>
        )
    }




    const rednderComponent = () => (
        <>
            <ScrollView>
                <View style={{ width: screenDimensions.width * 0.90 }}>


                    {items.map((item, index) => (
                        <AccordionItem
                            children={InnerTables(index)}
                            key={index}
                            date={item.date}
                            studentName={item.studentName}
                            total={item.title}
                            data={item.data}
                            expanded={activeItem === index}
                            onToggle={() => toggleItem(index)} // Pass toggle function to each item
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )

    const toggleModal = () => {
        setOpen(!open);
    };

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
                            {rednderComponent()}
                        </View>
                        {/* Backdrop */}
                        <TouchableOpacity style={styles.backdrop} onPress={toggleModal} />
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