import React, { useState } from 'react';
import { View } from 'react-native';
import AccordionItem from '../components/base/Accordion';

const AccordionScreen = () => {

    const [activeItem, setActiveItem] = useState(null); // Track the currently open item

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
            date: "17 feb - 23 Mar ",
            studentName: "Asad (Monthly)",
            title: "£250",
            data: [
                { name: "Previous Dues", value: "£8" },
                { name: "Book dues", value: "£158" },
                { name: "Discount", value: "£152" },
                { name: "Paid Amount", value: "£158" },
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
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };

    return (
        <View >
            {items.map((item, index) => (
                <AccordionItem
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
    )
}

export default AccordionScreen