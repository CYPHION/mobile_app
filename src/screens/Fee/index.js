import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AccordionItem from '../../components/base/Accordion';
import GridTable from '../../components/base/GridTable';

const Fee = ({ navigation }) => {
    const [activeItem, setActiveItem] = useState(null);
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };
    const items = [
        {
            date: "18 Jan - 20 Jan ",
            studentName: "Abdullah Khan (Weekly)",
            title: "£120",
            data: [
                { name: "Previous Dues", value: "£0" },
                { name: "Book dues", value: "£78" },
                { name: "Discount", value: "£10" },
                { name: "Paid Amount", value: "£89" },
            ],
        },
        {
            date: "28 Mar - 30 Apr ",
            studentName: "Hammad  (Weekly)",
            title: "£1000",
            data: [
                { name: "Previous Dues", value: "£19" },
                { name: "Book dues", value: "£952" },
                { name: "Discount", value: "£185" },
                { name: "Paid Amount", value: "£78" },
            ],
        },
    ];


    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
            isChecked: false,
        },
        {
            name: "agblsuyuil syufy sfap",
            value: "jfksafh.ajkkflas;jk",
            isChecked: false,
        },
        {
            name: "hfsgksabjhfuklagklsakfa",
            value: "10/8/2024",
            isChecked: false,
        },
        {
            name: "date",
            value: "10/8/2024",
            isChecked: false,
        },
        {
            name: "name",
            value: "M.Owais",
            isChecked: false,
        },
        {
            name: "Enrollment date",
            value: "10/8/2024",
            isChecked: false,
        },
    ]


    const [tableData, setTableData] = useState([
        {
            // heading: "hahah",
            data: item,
            showCheckBox: false,
            isChecked: true,
            header: 'hello'

        },
        {
            heading: "hahah",
            data: item,
            showCheckBox: true,
            isChecked: false
        },
        {
            heading: "hahah",
            data: item,
            showCheckBox: true,
            isChecked: true
        },
        {
            // heading: "hahah",
            data: item,
            showCheckBox: true,
            isChecked: false
        },
    ]);


    const handleCheckbox = (index) => {
        const updatedTableData = [...tableData];  // Create a copy of the array
        updatedTableData[index].isChecked = !updatedTableData[index].isChecked;  // Toggle the isChecked value
        setTableData(updatedTableData);  // Update the state with the new array
    }

    return (
        <ScrollView>
            <View>
                <Text>Fee tab</Text>
                {items.map((item, index) => (
                    <AccordionItem
                        children={tableData.map((elem, index) => (
                            <GridTable header={elem.header} key={index} showCheckBox={elem.showCheckBox} isChecked={elem.isChecked} heading={elem.heading} onToggle={() => handleCheckbox(index)} data={elem.data} />
                        ))}
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
    )
}

export default Fee